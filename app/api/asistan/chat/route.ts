import { streamText } from "ai";
import { resolveLegalModelCandidates } from "@/lib/ai/models";
import { ASISTAN_SYSTEM } from "@/lib/asistan/prompt";
import { titleFromFirstMessage } from "@/lib/asistan/types";
import {
  RAG_ANALYSIS_OUTPUT_RULES,
  retrieveLegalGrounding,
} from "@/lib/rag";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { bearerFromRequest, getSupabaseAuthed } from "@/lib/supabase/authed";

export const maxDuration = 60;

const MSG_CAP = 8_000;
const HISTORY_LIMIT = 24;

export async function POST(req: Request) {
  try {
    const token = bearerFromRequest(req);
    if (!token) {
      return Response.json({ error: "Giriş gerekli" }, { status: 401 });
    }

    const supabase = getSupabaseAuthed(token);
    if (!supabase) {
      return Response.json({ error: "Supabase yapılandırması eksik" }, { status: 503 });
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
    try {
      const g = await retrieveLegalGrounding({
        contractText: message,
        persona: "general",
        mode: "full",
      });
      if (g.retrieved) {
        groundingBlock = g.groundingBlock;
        citations = g.allowedCites;
      }
    } catch (err) {
      console.error("[asistan/chat] rag", err);
    }

    const system = groundingBlock
      ? `${ASISTAN_SYSTEM}\n\n${groundingBlock}`
      : `${ASISTAN_SYSTEM}\n\n${RAG_ANALYSIS_OUTPUT_RULES}\n\n(Bu turda vektör DB dayanağı bulunamadı. Madde numarası uydurma.)`;

    const modelMessages = (history || [])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content),
      }));

    let lastError: unknown;
    for (let i = 0; i < candidates.length; i++) {
      const model = candidates[i]!;
      try {
        const result = streamText({
          model,
          system,
          messages: modelMessages,
          temperature: 0.25,
          maxOutputTokens: 2200,
          onFinish: async ({ text }) => {
            const content = (text || "").trim();
            if (!content) return;
            await supabase.from("legal_chat_messages").insert({
              thread_id: threadId,
              user_id: user.id,
              role: "assistant",
              content,
              citations: citations.length ? citations : null,
            });
            await supabase
              .from("legal_chat_threads")
              .update({ updated_at: new Date().toISOString() })
              .eq("id", threadId);
          },
        });

        return result.toTextStreamResponse({
          headers: {
            "X-Clause-Citations": encodeURIComponent(
              JSON.stringify(citations.slice(0, 12)),
            ),
          },
        });
      } catch (err) {
        lastError = err;
        console.error(
          `[asistan/chat] model ${i + 1} failed:`,
          err instanceof Error ? err.message : err,
        );
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error("Asistan yanıtı üretilemedi");
  } catch (err) {
    console.error("[asistan/chat]", err);
    return Response.json(
      { error: "Asistan şu an yanıt veremedi. Biraz sonra tekrar deneyin." },
      { status: 500 },
    );
  }
}
