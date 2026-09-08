const DEFAULT_KEY = "clause-analysis-markdown";

/** Analiz / araç çıktısını /baski üzerinden Yazdır → PDF akışına açar */
export function openPrintMarkdown(
  markdown: string,
  storageKey: string = DEFAULT_KEY,
): boolean {
  const trimmed = markdown.trim();
  if (!trimmed) return false;
  try {
    sessionStorage.setItem(storageKey, trimmed);
  } catch {
    return false;
  }
  window.open("/baski", "_blank", "noopener,noreferrer");
  return true;
}
