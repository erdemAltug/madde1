import { absoluteUrl } from "@/lib/seo/site";

/**
 * Google’a gösterilen kazanan URL’ler.
 * Aynı niyetli sayfalar bu path’e canonical verir.
 */
export const CANONICAL_WINNERS = {
  kiraAnaliz: "/kira-sozlesmesi-analizi",
  isAnaliz: "/is-sozlesmesi-analizi",
  dilekcePillar: "/dilekce-hazirlama",
  dilekceTool: "/dilekce-olusturucu",
  kiraZamHesap: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  kiraAnalizTool: "/araclar/kira-analizi",
  kidem: "/araclar/kidem-tazminati-hesaplama",
  tahliye: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
  tuzak: "/araclar/sozlesme-tuzak-tarama",
} as const;

/** path → kazanan path (kendisi kazanan değilse) */
export const CANONICAL_OVERRIDES: Record<string, string> = {
  "/sozlesme-analizi/kira-sozlesmesi-analizi": CANONICAL_WINNERS.kiraAnaliz,
  "/sozlesme-analizi/is-sozlesmesi-riskleri": CANONICAL_WINNERS.isAnaliz,
  "/analiz/kira-sozlesmesi": CANONICAL_WINNERS.kiraAnaliz,
  "/analiz/is-sozlesmesi": CANONICAL_WINNERS.isAnaliz,
  "/analiz/tahliye-taahhutnamesi": CANONICAL_WINNERS.tahliye,
};

export function canonicalForPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(CANONICAL_OVERRIDES[normalized] ?? normalized);
}

export function isCanonicalLoser(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return Boolean(CANONICAL_OVERRIDES[normalized]);
}
