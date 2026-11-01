/**
 * Mevzuat değişikliği bildirimleri. Yeni bir resmi oran yayımlandığında buraya bir kayıt
 * eklenir; panel ilgili kullanıcıya gösterir, cron bir kez e-posta/push gönderir.
 * Rakamlar official-rates.ts'ten gelir — burada ayrıca oran yazılmaz.
 */
import { RENT_CEILING, SEVERANCE_CEILING } from "@/lib/legal/official-rates";

/** legal_events.kind değerleri ile eşleşir */
export type AffectedKind =
  | "renewal"
  | "rent_increase"
  | "contract_end"
  | "notice"
  | "payment"
  | "probation"
  | "deadline"
  | "other";

export type RegulationUpdate = {
  /** Sabit kimlik — regulation_notices_sent.notice_id */
  id: string;
  publishedAt: string;
  title: string;
  body: string;
  source: string;
  /** Bu tür tarihi olan kullanıcılar etkilenir */
  affects: AffectedKind[];
  cta: { label: string; href: string };
};

export const REGULATION_UPDATES: RegulationUpdate[] = [
  {
    id: "kira-tavani-2026-10",
    publishedAt: "2026-10-05",
    title: `Kira artış tavanı güncellendi: %${RENT_CEILING.pct.toLocaleString("tr-TR")}`,
    body: `${RENT_CEILING.periodLabel} için yasal üst sınır belirlendi. Kira yenilemeniz yaklaşıyorsa ev sahibinin istediği artışı bu oranla karşılaştırın.`,
    source: RENT_CEILING.sourceLabel,
    affects: ["rent_increase", "renewal"],
    cta: { label: "Kira artışımı hesapla", href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama" },
  },
  {
    id: "kidem-tavani-2026-07",
    publishedAt: "2026-07-01",
    title: "Kıdem tazminatı tavanı güncellendi",
    body: `${SEVERANCE_CEILING.periodLabel} döneminde kıdem tazminatına esas brüt tavan ${SEVERANCE_CEILING.annualGrossTry.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} oldu. İş sözleşmeniz için tahmini alacağınız değişmiş olabilir.`,
    source: SEVERANCE_CEILING.sourceLabel,
    affects: ["probation", "notice", "contract_end"],
    cta: { label: "Kıdemimi yeniden hesapla", href: "/araclar/kidem-tazminati-hesaplama" },
  },
];

const RECENT_DAYS = 120;

/** Kullanıcının tarih türlerine göre son dönemde yayımlanmış ilgili güncellemeler. */
export function relevantUpdates(
  kinds: Iterable<string>,
  today: Date = new Date(),
): RegulationUpdate[] {
  const have = new Set(kinds);
  const cutoff = today.getTime() - RECENT_DAYS * 86_400_000;
  return REGULATION_UPDATES.filter(
    (u) =>
      Date.parse(`${u.publishedAt}T00:00:00Z`) >= cutoff &&
      u.affects.some((k) => have.has(k)),
  ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
