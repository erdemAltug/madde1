import type { Metadata } from "next";

/** Üretimde NEXT_PUBLIC_SITE_URL ile canonical / OG uyumu (örn. https://tryclause.ai) */
const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL;
// Vercel’de NEXT_PUBLIC_SITE_URL set edilmediyse doğru host’u yakalamak için.
const siteUrlFromVercel = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const SITE_URL = (siteUrlFromEnv ?? siteUrlFromVercel ?? "https://tryclause.tech").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Clause";

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_TAGLINE =
  "Kira zammı yasal mı? Sözleşmeyi ücretsiz tara — Clause";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export const defaultHomeMetadata: Metadata = {
  title:
    "Clause — Kira zammı yasal mı? Ücretsiz sözleşme analizi 2026",
  description:
    "Kira zammı tavanı, kıdem tazminatı ve sözleşme tuzaklarını ücretsiz kontrol edin. Clause ile Türkiye odaklı AI tarama; kayıt olup detaylı raporu ve PDF'i indirin.",
  keywords: [
    "kira zammı yasal mı",
    "kira artış hesaplama",
    "kira takip raporu",
    "yapay zeka ile kira takibi",
    "ücretsiz sözleşme analizi",
    "kıdem tazminatı hesaplama",
    "tahliye taahhütnamesi kontrol",
    "sözleşme tuzakları",
    "yapay zeka hukuk asistanı",
    "kira sözleşmesi analizi",
    "Clause AI",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Clause — Ücretsiz kira ve sözleşme analizi",
    description:
      "Kira zammı yasal mı? Sözleşmeyi ücretsiz tarayın. Detaylı rapor ve PDF lansman döneminde hesapla ücretsiz.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Yapay Zeka Hukuk Asistanı`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Clause — Ücretsiz kira ve sözleşme analizi`,
    description:
      "Kira zammı, kıdem ve sözleşme tuzaklarını ücretsiz kontrol edin.",
    images: ["/opengraph-image"],
  },
};
