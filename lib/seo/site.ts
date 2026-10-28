import type { Metadata } from "next";

/** Kanonik üretim domaini — canonical, sitemap ve OG her zaman buna işaret etmeli. */
const PRODUCTION_SITE_URL = "https://tryclause.tech";

/** Üretimde NEXT_PUBLIC_SITE_URL ile canonical / OG uyumu */
const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL;
// VERCEL_URL deploy'a özel *.vercel.app adresidir; yalnızca preview ortamında kullan.
// Üretimde kullanılırsa canonical ve sitemap yanlış domaine işaret eder.
const siteUrlFromVercel =
  process.env.VERCEL_URL && process.env.VERCEL_ENV !== "production"
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

export const SITE_URL = (siteUrlFromEnv ?? siteUrlFromVercel ?? PRODUCTION_SITE_URL).replace(
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
    "ücretsiz hukuk asistanı",
    "ücretsiz sözleşme analizi",
    "sözleşme tuzakları",
    "dilekçe hazırlama",
    "Clause",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title:
      "Ücretsiz hukuk asistanı: sözleşme tara, dilekçe yaz 2026 | Clause",
    description:
      "Sözleşme tuzaklarını tarayın, dilekçe taslağı alın, kira ve iş hesaplarını ücretsiz yapın.",
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
