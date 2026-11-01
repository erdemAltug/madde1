type Turn = { role: string; content: string };

/** "Peki bu durumda?", "ya depozito?" gibi önceki konuya yaslanan kısa sorular. */
const FOLLOW_UP =
  /^(peki|ya |o zaman|bu durumda|bunu|bunun|onu|onun|şu|aynı|ayni|neden|niye|nasıl|nasil|ne olur|ve |ama |hani)/i;

/**
 * Sohbet için arama metni: son mesaj kısa ya da önceki konuya atıf yapıyorsa,
 * önceki kullanıcı mesajları eklenir. Böylece "peki ihbar süresi?" sorusu
 * önceki "işten çıkarıldım" bağlamıyla aranır. LLM çağrısı yok — deterministik.
 */
export function contextualizeQuery(history: Turn[], message: string): string {
  const msg = message.trim();
  const isFollowUp = msg.length < 120 || FOLLOW_UP.test(msg);
  if (!isFollowUp) return msg;

  const earlier = history
    .filter((t) => t.role === "user")
    .map((t) => t.content.trim())
    .filter((c) => c && c !== msg)
    .slice(-2);
  if (earlier.length === 0) return msg;

  return `${msg}\n${earlier.map((c) => c.slice(0, 400)).join("\n")}`.slice(0, 1500);
}
