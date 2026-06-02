import { maskSensitiveText } from "@/lib/security/mask-sensitive";

const EXCERPT_LEN = 400;
const FULL_TEXT_MAX = 8000;

function wordCount(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

/** Dedup / segment için; ham metin gönderilmez */
export function hashInput(text: string): string {
  let h = 2166136261;
  const s = text.trim();
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

export type InputAnalyticsOptions = {
  /** Örn. contract_analyzer, tahliye_widget */
  source?: string;
  /** Tam maskelenmiş metin (NEXT_PUBLIC_POSTHOG_CAPTURE_INPUT=1) */
  includeFullText?: boolean;
};

/**
 * Textarea / sözleşme metni için PostHog özellikleri.
 * Hassas alanlar maskelenir; tam metin varsayılan olarak kapalıdır.
 */
export function buildInputAnalyticsProps(
  rawText: string,
  options: InputAnalyticsOptions = {},
): Record<string, string | number | boolean> {
  const trimmed = rawText.trim();
  const { text: masked } = maskSensitiveText(trimmed);
  const excerpt = masked.slice(0, EXCERPT_LEN);
  const captureFull =
    options.includeFullText ??
    process.env.NEXT_PUBLIC_POSTHOG_CAPTURE_INPUT === "1";

  const props: Record<string, string | number | boolean> = {
    text_length: trimmed.length,
    text_word_count: wordCount(trimmed),
    text_line_count: trimmed ? trimmed.split(/\n/).length : 0,
    input_hash: hashInput(trimmed),
    input_excerpt: excerpt,
    input_is_empty: trimmed.length === 0,
  };

  if (options.source) props.input_source = options.source;

  if (captureFull && masked.length > 0) {
    props.input_text_masked =
      masked.length > FULL_TEXT_MAX
        ? `${masked.slice(0, FULL_TEXT_MAX)}…`
        : masked;
  }

  return props;
}
