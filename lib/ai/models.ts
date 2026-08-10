import { generateText, streamText, type LanguageModel } from "ai";
import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";

/**
 * Groq: `llama-3.3-70b-versatile` 16 Ağu 2026'da kapanıyor.
 * Resmi yedek: `openai/gpt-oss-120b` — https://console.groq.com/docs/deprecations
 */
const DEFAULT_GROQ_LEGAL_MODEL = "openai/gpt-oss-120b";
const DEFAULT_OPENAI_LEGAL_MODEL = "gpt-4o-mini";

export function groqLegalModelId(): string {
  const id = process.env.GROQ_LEGAL_MODEL?.trim();
  if (!id) return DEFAULT_GROQ_LEGAL_MODEL;
  // Eski / kapanmış kimlikler → güncel yedek
  if (
    id === "llama-3.3-70b-versatile" ||
    id === "llama3-70b-8192" ||
    id === "llama-3.1-8b-instant" ||
    id === "llama3-8b-8192"
  ) {
    return DEFAULT_GROQ_LEGAL_MODEL;
  }
  return id;
}

/** Varsayılan Groq model kimliği (env ile override: GROQ_LEGAL_MODEL) */
export const GROQ_LEGAL_MODEL = DEFAULT_GROQ_LEGAL_MODEL;

function openaiLegalModelId(): string {
  return process.env.OPENAI_LEGAL_MODEL?.trim() || DEFAULT_OPENAI_LEGAL_MODEL;
}

/** Öncelik sırasıyla kullanılabilir modeller (Groq → OpenAI). */
export function resolveLegalModelCandidates(): LanguageModel[] {
  const models: LanguageModel[] = [];
  if (process.env.GROQ_API_KEY?.trim()) {
    models.push(groq(groqLegalModelId()));
  }
  if (process.env.OPENAI_API_KEY?.trim()) {
    models.push(openai(openaiLegalModelId()));
  }
  return models;
}

/** İlk aday (geriye uyum). Yoksa null. */
export function resolveLegalModel(): LanguageModel | null {
  return resolveLegalModelCandidates()[0] ?? null;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

/**
 * generateText — Groq başarısız olursa OpenAI'ye düşer.
 */
export async function generateLegalText(
  params: Omit<Parameters<typeof generateText>[0], "model">,
) {
  const candidates = resolveLegalModelCandidates();

  if (candidates.length === 0) {
    throw new Error("GROQ_API_KEY veya OPENAI_API_KEY tanımlı değil");
  }

  let lastError: unknown;
  for (let i = 0; i < candidates.length; i++) {
    const model = candidates[i]!;
    try {
      return await generateText({
        ...(params as object),
        model,
      } as Parameters<typeof generateText>[0]);
    } catch (err) {
      lastError = err;
      console.error(
        `[legal-ai] model ${i + 1}/${candidates.length} failed:`,
        errorMessage(err).slice(0, 300),
      );
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(errorMessage(lastError) || "Model çağrısı başarısız");
}

/**
 * streamText — adaylarla dene; stream başlamadan önceki hatalarda fallback.
 */
export async function streamLegalText(
  params: Omit<Parameters<typeof streamText>[0], "model">,
) {
  const candidates = resolveLegalModelCandidates();

  if (candidates.length === 0) {
    throw new Error("GROQ_API_KEY veya OPENAI_API_KEY tanımlı değil");
  }

  let lastError: unknown;
  for (let i = 0; i < candidates.length; i++) {
    const model = candidates[i]!;
    try {
      return streamText({
        ...(params as object),
        model,
      } as Parameters<typeof streamText>[0]);
    } catch (err) {
      lastError = err;
      console.error(
        `[legal-ai] stream model ${i + 1}/${candidates.length} failed:`,
        errorMessage(err).slice(0, 300),
      );
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(errorMessage(lastError) || "Model stream başarısız");
}
