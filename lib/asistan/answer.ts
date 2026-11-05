import { generateText, type LanguageModel } from "ai";
import { asistanSystem } from "@/lib/asistan/prompt";
import type { AsistanSource } from "@/lib/asistan/types";
import {
  RAG_ANALYSIS_OUTPUT_RULES,
  lookupStatutes,
  parseStatuteRefs,
  planStatuteRefs,
  retrieveLegalGrounding,
  verifyCitations,
} from "@/lib/rag";
import type { RagHit } from "@/lib/rag";
import { checkQuotes } from "@/lib/rag/quote-check";
import type { StatuteRef } from "@/lib/rag/query-signals";

const GROUNDING_CAP = 7_000;
const SOURCE_SNIPPET = 420;

export type AnswerInput = {
  candidates: LanguageModel[];
  /** Son kullanıcı mesajı (maskelenmiş) */
  message: string;
  /** Önceki mesajlarla zenginleştirilmiş arama metni */
  retrievalQuery: string;
  /** Model geçmişi — son kullanıcı mesajı dahil */
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  /** Kullanıcının dosyaları / hatırlatmaları gibi kişisel bağlam */
  personal?: string;
};

export type AnswerResult = {
  text: string;
  citations: string[];
  sources: AsistanSource[];
  plan: StatuteRef[];
  /** Model taslağı bağlam dışı madde andı ve resmi metinle yeniden yazıldı */
  regenerated: boolean;
  ungrounded: string[];
  /** Dayanaklar bölümündeki alıntısı resmi metinde bulunan etiketler */
  quotesVerified: string[];
  quotesFailed: string[];
  error?: unknown;
};

/**
 * Hukuk asistanı cevap hattı:
 *  1) planla — soruyu hangi maddeler düzenliyor?
 *  2) getir — planlanan maddeler resmi metinden birebir + hibrit arama
 *  3) yaz — yalnız getirilen metne dayanarak
 *  4) doğrula — bağlam dışı atıf varsa resmi metni getirip bir kez yeniden yaz
 */
export async function answerLegalQuestion(input: AnswerInput): Promise<AnswerResult> {
  const plan = await planStatuteRefs(input.retrievalQuery).catch(() => [] as StatuteRef[]);
  const grounding = await retrieveLegalGrounding({
    contractText: input.message,
    persona: "general",
    mode: "chat",
    retrievalQuery: input.retrievalQuery,
    extraRefs: plan,
  }).catch((err) => {
    console.error("[asistan] rag", err);
    return null;
  });

  let hits: RagHit[] = grounding?.retrieved ? grounding.hits : [];
  let allowed: string[] = grounding?.retrieved ? grounding.allowedCites : [];
  let groundingBlock = grounding?.retrieved ? grounding.groundingBlock.slice(0, GROUNDING_CAP) : "";

  const system = () =>
    [
      asistanSystem(),
      input.personal,
      groundingBlock ||
        `${RAG_ANALYSIS_OUTPUT_RULES}\n\n(Bu turda doğrulanmış mevzuat bulunamadı. Madde numarası yazma.)`,
    ]
      .filter(Boolean)
      .join("\n\n");

  let lastError: unknown;
  const generate = async (): Promise<string> => {
    for (let i = 0; i < input.candidates.length; i++) {
      try {
        const result = await generateText({
          model: input.candidates[i]!,
          system: system(),
          messages: input.messages,
          temperature: 0.2,
          maxOutputTokens: 1800,
        });
        const out = (result.text || "").trim();
        if (out) return out;
      } catch (err) {
        lastError = err;
        console.error(
          `[asistan] model ${i + 1} failed:`,
          err instanceof Error ? err.message.slice(0, 300) : err,
        );
      }
    }
    return "";
  };

  let text = await generate();
  let regenerated = false;
  let check = verifyCitations(text, allowed);
  let quotes = checkQuotes(text, hits);

  // Tek düzeltme turu: bağlam dışı madde ve/veya maddede geçmeyen alıntı
  if (text && (check.ungrounded.length > 0 || quotes.failed.length > 0)) {
    const missing =
      check.ungrounded.length > 0
        ? await lookupStatutes(parseStatuteRefs(check.ungrounded.join(" ; "))).catch(() => [] as RagHit[])
        : [];
    const notes: string[] = [];
    if (missing.length > 0) {
      hits = [...missing, ...hits];
      allowed = [...new Set([...missing.map((h) => h.citeLabel), ...allowed])];
      const extra = missing
        .map((h) => `### KANUN [${h.citeLabel}] (resmi metin)\n${h.content}`)
        .join("\n\n---\n\n");
      notes.push(
        `## EK RESMİ METİN (taslakta anılan maddeler)\nİzinli ek etiketler: ${missing.map((h) => h.citeLabel).join(" | ")}\nBu maddeleri oku; soruya gerçekten uyuyorsa kullan, uymuyorsa doğru maddeyle değiştir.\n\n${extra}`,
      );
    }
    const stillMissing = check.ungrounded.filter(
      (c) => !missing.some((h) => verifyCitations(c, [h.citeLabel]).grounded.length > 0),
    );
    if (stillMissing.length > 0) {
      notes.push(`## DÜZELT: Şu atıflar resmi veritabanında yok, kullanma: ${stillMissing.join(", ")}`);
    }
    if (quotes.failed.length > 0) {
      notes.push(
        `## DÜZELT: Aşağıdaki alıntılar ilgili maddenin metninde geçmiyor. Ya maddeden AYNEN alıntı yap ya da bu maddeye dayanma (iddia maddeyle uyuşmuyorsa doğru maddeyi seç):\n${quotes.failed.map((f) => `- ${f.label}: "${f.quote}"`).join("\n")}`,
      );
    }
    groundingBlock = `${groundingBlock}\n\n${notes.join("\n\n")}`;
    const second = await generate();
    if (second) {
      text = second;
      regenerated = true;
    }
    check = verifyCitations(text, allowed);
    quotes = checkQuotes(text, hits);
  }

  if (text && check.ungrounded.length > 0) {
    text += `\n\n_Not: ${check.ungrounded.join(", ")} için resmi metni bu yanıtta doğrulayamadık; bu atfı kullanmadan önce kontrol edin._`;
  }

  // Kullanıcıya yalnız cevapta gerçekten dayanılan kaynaklar; alıntısı doğrulananlar önce
  const used = hits.filter(
    (h) => h.type !== "hukuki_not" && verifyCitations(text, [h.citeLabel]).grounded.length > 0,
  );
  const isVerified = (h: RagHit) => quotes.verified.some((v) => verifyCitations(v, [h.citeLabel]).grounded.length > 0);
  used.sort((a, b) => Number(isVerified(b)) - Number(isVerified(a)));
  const seen = new Set<string>();
  const shown = used.filter((h) => !seen.has(h.citeLabel) && seen.add(h.citeLabel)).slice(0, 6);

  return {
    text,
    citations: shown.map((h) => h.citeLabel),
    sources: shown.map((h) => ({
      label: h.citeLabel,
      kind: h.type,
      snippet: h.content.replace(/\s+/g, " ").slice(0, SOURCE_SNIPPET),
    })),
    plan,
    regenerated,
    ungrounded: check.ungrounded,
    quotesVerified: quotes.verified,
    quotesFailed: quotes.failed.map((f) => f.label),
    error: text ? undefined : lastError,
  };
}
