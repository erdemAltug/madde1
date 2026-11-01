/**
 * Paylaşılabilir risk kartı: URL yalnızca sayılar ve sabit bir tür taşır.
 * Serbest metin yok — kişisel veri sızmaz, alan adımızla keyfi yazı üretilemez.
 */
export const CARD_KINDS = {
  kira: "Kira sözleşmesi",
  is: "İş sözleşmesi",
  hizmet: "Hizmet sözleşmesi",
  sozlesme: "Sözleşme",
} as const;

export type CardKind = keyof typeof CARD_KINDS;

export type RiskCardData = {
  score: number;
  critical: number;
  missing: number;
  kind: CardKind;
};

function clampInt(v: string | null | undefined, min: number, max: number, fallback: number): number {
  const n = Number.parseInt(v ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function parseRiskCard(params: URLSearchParams | Record<string, string | undefined>): RiskCardData {
  const get = (k: string) =>
    params instanceof URLSearchParams ? params.get(k) : (params[k] ?? null);
  const kind = get("t");
  return {
    score: clampInt(get("s"), 0, 100, 50),
    critical: clampInt(get("c"), 0, 20, 0),
    missing: clampInt(get("m"), 0, 20, 0),
    kind: kind && kind in CARD_KINDS ? (kind as CardKind) : "sozlesme",
  };
}

export function riskCardQuery(d: RiskCardData): string {
  return new URLSearchParams({
    s: String(d.score),
    c: String(d.critical),
    m: String(d.missing),
    t: d.kind,
  }).toString();
}

export function riskVerdict(d: RiskCardData): { label: string; tone: "risk" | "warn" | "good" } {
  if (d.critical >= 2 || d.score < 50) return { label: "İmzalamadan önce konuşulmalı", tone: "risk" };
  if (d.critical === 1 || d.missing > 0 || d.score < 75) return { label: "Dikkat edilmesi gereken maddeler var", tone: "warn" };
  return { label: "Büyük bir risk görünmüyor", tone: "good" };
}
