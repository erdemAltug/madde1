/**
 * Resmi, tarihli tavanlar. Uydurma oran yazılmaz.
 * Kira: TÜİK 5 Eki 2026, Eylül 2026 on iki aylık ortalama TÜFE.
 * Ekim 2026’da yenilenen konut ve çatılı işyeri kiraları (TBK m. 344).
 * Kıdem: 1 Tem 2026 – 31 Ara 2026 yıllık tavan, brüt.
 */
export const RENT_CEILING = {
  pct: 31.49,
  periodLabel: "Ekim 2026 yenilemeleri",
  sourceLabel: "TÜİK, 5 Ekim 2026 — Eylül 2026 on iki aylık ortalama TÜFE",
} as const;

export const SEVERANCE_CEILING = {
  annualGrossTry: 73_729.87,
  periodLabel: "1 Temmuz 2026 – 31 Aralık 2026",
  sourceLabel: "Hazine ve Maliye Bakanlığı, 2026 II. dönem kıdem tazminatı tavanı",
} as const;
