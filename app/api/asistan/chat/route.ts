import { generateText } from "ai";
import { resolveLegalModelCandidates } from "@/lib/ai/models";
import { ASISTAN_SYSTEM } from "@/lib/asistan/prompt";
import { titleFromFirstMessage } from "@/lib/asistan/types";
import {
  RAG_ANALYSIS_OUTPUT_RULES,
  retrieveLegalGrounding,
  verifyCitations,
} from "@/lib/rag";
import { contextualizeQuery } from "@/lib/rag/conversation";
import { buildPersonalContext } from "@/lib/rag/personal-context";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { bearerFromRequest, getSupabaseAuthed } from "@/lib/supabase/authed";
import type { AsistanSource } from "@/lib/asistan/types";

export const maxDuration = 60;

const MSG_CAP = 8_000;
const HISTORY_LIMIT = 20;
const GROUNDING_CAP = 6_000;
const SOURCE_SNIPPET = 420;

export async function POST(req: Request) {
  try {
    const token = bearerFromRequest(req);
    if (!token) {
      return Response.json({ error: "Giriş gerekli" }, { status: 401 });
    }

    const supabase = getSupabaseAuthed(token);
    if (!supabase) {
      return Response.json(
        { error: "Supabase yapılandırması eksik" },
        { status: 503 },
      );
    }

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      return Response.json({ error: "Oturum geçersiz" }, { status: 401 });
    }

    const candidates = resolveLegalModelCandidates();
    if (candidates.length === 0) {
      return Response.json(
        { error: "Model yapılandırması eksik" },
        { status: 503 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const threadId = String(body.threadId || "").trim();
    const rawMessage = String(body.message || "").trim();
    if (!threadId || !rawMessage) {
      return Response.json(
        { error: "threadId ve message gerekli" },
        { status: 400 },
      );
    }

    const masked = maskSensitiveText(rawMessage.slice(0, MSG_CAP));
    const message = masked.text;

    const { data: thread, error: threadErr } = await supabase
      .from("legal_chat_threads")
      .select("id, title, user_id")
      .eq("id", threadId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (threadErr || !thread) {
      return Response.json({ error: "Sohbet bulunamadı" }, { status: 404 });
    }

    const { error: insertUserErr } = await supabase
      .from("legal_chat_messages")
      .insert({
        thread_id: threadId,
        user_id: user.id,
        role: "user",
        content: message,
      });

    if (insertUserErr) {
      console.error("[asistan/chat] insert user", insertUserErr);
      return Response.json({ error: "Mesaj kaydedilemedi" }, { status: 500 });
    }

    if (!thread.title || thread.title === "Yeni sohbet") {
      await supabase
        .from("legal_chat_threads")
        .update({
          title: titleFromFirstMessage(message),
          updated_at: new Date().toISOString(),
        })
        .eq("id", threadId);
    } else {
      await supabase
        .from("legal_chat_threads")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", threadId);
    }

    const { data: history } = await supabase
      .from("legal_chat_messages")
      .select("role, content")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true })
      .limit(HISTORY_LIMIT);

    let groundingBlock = "";
    let citations: string[] = [];
    let sources: AsistanSource[] = [];
    const priorTurns = (history || []).map((m) => ({
      role: String(m.role),
      content: String(m.content),
    }));

    const [grounding, personal] = await Promise.all([
      retrieveLegalGrounding({
        contractText: message,
        persona: "general",
        mode: "chat",
        retrievalQuery: contextualizeQuery(priorTurns, message),
      }).catch((err) => {
        console.error("[asistan/chat] rag", err);
        return null;
      }),
      buildPersonalContext(supabase, user.id).catch((err) => {
        console.error("[asistan/chat] personal", err);
        return "";
      }),
    ]);

    if (grounding?.retrieved) {
      groundingBlock = grounding.groundingBlock.slice(0, GROUNDING_CAP);
      citations = grounding.allowedCites.slice(0, 6);
      sources = grounding.hits.slice(0, 6).map((h) => ({
        label: h.citeLabel,
        kind: h.type,
        snippet: h.content.replace(/\s+/g, " ").slice(0, SOURCE_SNIPPET),
      }));
    }

    const system = [
      ASISTAN_SYSTEM,
      personal,
      groundingBlock ||
        `${RAG_ANALYSIS_OUTPUT_RULES}\n\n(Bu turda vektör DB dayanağı bulunamadı. Madde numarası uydurma.)`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const modelMessages = (history || [])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content).slice(0, 4_000),
      }));

    let text = "";
    let lastError: unknown;
    for (let i = 0; i < candidates.length; i++) {
      const model = candidates[i]!;
      try {
        const result = await generateText({
          model,
          system,
          messages: modelMessages,
          temperature: 0.25,
          maxOutputTokens: 1800,
        });
        text = (result.text || "").trim();
        if (text) break;
      } catch (err) {
        lastError = err;
        console.error(
          `[asistan/chat] model ${i + 1} failed:`,
          err instanceof Error ? err.message.slice(0, 300) : err,
        );
      }
    }

    const citationCheck = verifyCitations(text, citations);
    if (citationCheck.ungrounded.length > 0) {
      text += `\n\nDoğrulanamayan atıf (bu turda bağlama düşmedi): ${citationCheck.ungrounded.join(", ")}. Bu maddeleri kesin dayanak saymayın.`;
    }

    if (!text) {
      console.error("[asistan/chat] empty text", lastError);
      return Response.json(
        {
          error:
            "Yanıt üretilemedi. Birkaç saniye sonra tekrar deneyin.",
        },
        { status: 502 },
      );
    }

    const { data: saved, error: saveErr } = await supabase
      .from("legal_chat_messages")
      .insert({
        thread_id: threadId,
        user_id: user.id,
        role: "assistant",
        content: text,
        citations: citations.length ? citations : null,
      })
      .select("id, thread_id, role, content, citations, created_at")
      .single();

    if (saveErr) {
      console.error("[asistan/chat] save assistant", saveErr);
    }

    await supabase
      .from("legal_chat_threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", threadId);

    return Response.json({
      text,
      citations,
      sources,
      message: saved ?? {
        id: `tmp-${Date.now()}`,
        thread_id: threadId,
        role: "assistant",
        content: text,
        citations,
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[asistan/chat]", err);
    return Response.json(
      { error: "Asistan şu an yanıt veremedi. Biraz sonra tekrar deneyin." },
      { status: 500 },
    );
  }
}
