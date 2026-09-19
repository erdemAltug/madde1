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

/** Platform odaklı — kira zammı niyeti araç kazananına bırakıldı */
export const SITE_TAGLINE =
  "Ücretsiz hukuk asistanı: sözleşme tara, dilekçe yaz, sorun sor — Clause";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export const defaultHomeMetadata: Metadata = {
  title:
    "Clause — Ücretsiz hukuk asistanı: sözleşme tara, dilekçe yaz 2026",
  description:
    "Sözleşme tuzaklarını tarayın, dilekçe taslağı alın, kira ve iş hesaplarını ücretsiz yapın. Clause kişisel hukuk asistanınız; kayıtla rapor ve arşiv sizde kalır.",
  keywords: [
    "yapay zeka hukuk asistanı",
    "ücretsiz sözleşme analizi",
    "sözleşme tuzakları",
    "dilekçe hazırlama",
    "kira zammı yasal mı",
    "kıdem tazminatı hesaplama",
    "tahliye taahhüdü kontrol",
    "kira sözleşmesi analizi",
    "iş sözleşmesi analizi",
    "Clause AI",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Clause — Ücretsiz kişisel hukuk asistanı",
    description:
      "Sözleşme tara, dilekçe yaz, günlük hukuki işlerini kontrol et. Detaylı rapor hesapla ücretsiz.",
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
    title: "Clause — Ücretsiz hukuk asistanı 2026",
    description:
      "Sözleşme tarama, dilekçe ve ücretsiz hukuk hesaplayıcıları — Clause.",
    images: ["/opengraph-image"],
  },
};
