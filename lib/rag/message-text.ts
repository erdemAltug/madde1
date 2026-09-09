import type { UIMessage } from "ai";

/** UIMessage listesinden son kullanıcı metnini çıkarır (RAG sorgusu için). */
export function extractLastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (!m || m.role !== "user") continue;
    const parts = m.parts;
    if (Array.isArray(parts)) {
      const texts = parts
        .filter(
          (p): p is { type: "text"; text: string } =>
            p != null &&
            typeof p === "object" &&
            (p as { type?: string }).type === "text" &&
            typeof (p as { text?: unknown }).text === "string",
        )
        .map((p) => p.text);
      if (texts.length) return texts.join("\n").trim();
    }
    const legacy = m as UIMessage & { content?: unknown };
    if (typeof legacy.content === "string") return legacy.content.trim();
    if (Array.isArray(legacy.content)) {
      return legacy.content
        .map((c) =>
          c && typeof c === "object" && "text" in c
            ? String((c as { text: string }).text)
            : "",
        )
        .join("\n")
        .trim();
    }
  }
  return "";
}
