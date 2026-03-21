import type { UIMessage } from "ai";

function textFromMessage(message: UIMessage | undefined): string {
  if (!message?.parts) return "";
  return message.parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof (p as { text?: string }).text === "string",
    )
    .map((p) => p.text)
    .join("");
}

export function getAssistantText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "assistant");
  return textFromMessage(last);
}

/** Kronolojik tüm asistan yanıtları (analiz + iyileştirme turu). */
export function getAllAssistantTexts(messages: UIMessage[]): string[] {
  return messages
    .filter((m) => m.role === "assistant")
    .map((m) => textFromMessage(m))
    .filter((t) => t.length > 0);
}
