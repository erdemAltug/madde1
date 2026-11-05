import type { RagHit } from "@/lib/rag/types";
import { verifyCitations } from "@/lib/rag/cite";

export type QuoteCheck = {
  /** Alıntısı resmi metinde birebir bulunan etiketler */
  verified: string[];
  /** Alıntısı maddede bulunamayan satırlar */
  failed: Array<{ label: string; quote: string }>;
};

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/[“”"'’‘«»]/g, "")
    .replace(/[^\p{L}\p{N}%]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * "# 📚 Dayanaklar" altındaki `- **TBK m.344** — "alıntı"` satırlarını okur ve
 * alıntının o maddenin resmi metninde gerçekten geçip geçmediğini kontrol eder.
 */
export function checkQuotes(text: string, hits: RagHit[]): QuoteCheck {
  const idx = text.search(/#+\s*📚?\s*Dayanaklar/i);
  const section = idx >= 0 ? text.slice(idx) : "";
  const verified: string[] = [];
  const failed: QuoteCheck["failed"] = [];
  const line = /^\s*[-*]\s*\*{0,2}\[?([^\]*\n]+?)\]?\*{0,2}\s*[—–:-]+\s*[“"«]([^”"»\n]{6,400})[”"»]/gmu;
  for (const m of section.matchAll(line)) {
    const label = m[1]!.trim();
    const quote = m[2]!.replace(/…|\.\.\./g, " ").trim();
    const owners = hits.filter((h) => verifyCitations(label, [h.citeLabel]).grounded.length > 0);
    if (owners.length === 0) continue; // etiket bağlamda değil — atıf denetimi ayrıca yakalar
    const q = norm(quote);
    // Uzun alıntıda küçük kopyalama farklarına tolerans: ilk 12 kelimenin geçmesi yeterli
    const probe = q.split(" ").slice(0, 12).join(" ");
    const ok = q.length > 0 && owners.some((h) => norm(h.content).includes(probe));
    if (ok) verified.push(label);
    else failed.push({ label, quote });
  }
  return { verified, failed };
}
