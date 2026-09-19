export type AsistanThread = {
  id: string;
  title: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export type AsistanMessage = {
  id: string;
  thread_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: string[] | null;
  created_at: string;
};

export const ASISTAN_EXAMPLE_PROMPTS = [
  "Ev sahibi %80 zam istedi — yasal mı?",
  "İşten çıkarıldım, kıdem ve ihbar hakkım ne?",
  "Boş tarihli tahliye taahhüdü geçerli olur mu?",
  "Freelance sözleşmede kaynak kodu kime ait olmalı?",
  "Tüketici iadesi için dilekçede neler yazmalıyım?",
] as const;

export function titleFromFirstMessage(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return "Yeni sohbet";
  return t.length > 56 ? `${t.slice(0, 56)}…` : t;
}
