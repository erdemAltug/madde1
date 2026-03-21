import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";

/**
 * Groq: `llama3-70b-8192` kapatıldı (model_decommissioned).
 * Resmi yedek: `llama-3.3-70b-versatile` — bkz. https://console.groq.com/docs/deprecations
 */
const DEFAULT_GROQ_LEGAL_MODEL = "llama-3.3-70b-versatile";

export function groqLegalModelId(): string {
  const id = process.env.GROQ_LEGAL_MODEL?.trim();
  return id && id.length > 0 ? id : DEFAULT_GROQ_LEGAL_MODEL;
}

/** Varsayılan Groq model kimliği (env ile override: GROQ_LEGAL_MODEL) */
export const GROQ_LEGAL_MODEL = DEFAULT_GROQ_LEGAL_MODEL;

export function resolveLegalModel() {
  if (process.env.GROQ_API_KEY) {
    return groq(groqLegalModelId());
  }
  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }
  return null;
}
