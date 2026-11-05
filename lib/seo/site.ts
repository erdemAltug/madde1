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
  title: {
    absolute: "Clause — Ücretsiz hukuk asistanı: hukuki sorunuzu sorun, haklarınızı öğrenin",
  },
  description:
    "Kira zammı, işten çıkarılma, iade, depozito, sözleşme… Hukuki sorunuzu kendi cümlelerinizle sorun; kanun dayanağıyla sade bir yanıt, ücretsiz hesaplayıcı ve dilekçe alın. Sadece profesyoneller için değil, herkes için.",
  keywords: [
    "ücretsiz hukuk asistanı",
    "hukuki soru sor",
    "ücretsiz hukuki danışma",
    "yapay zeka hukuk asistanı",
    "haklarımı öğrenmek istiyorum",
    "kira zammı yasal mı",
    "işten çıkarıldım haklarım",
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
      "Clause — Herkes için ücretsiz hukuk asistanı",
    description:
      "Kira, iş, tüketici ve sözleşme sorularınızı sorun; haklarınızı kanun dayanağıyla, sade bir dille öğrenin.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Herkes için yapay zeka hukuk asistanı`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clause — Herkes için ücretsiz hukuk asistanı",
    description:
      "Hukuki sorunuzu sorun, haklarınızı öğrenin: kira, iş, tüketici, sözleşme.",
    images: ["/opengraph-image"],
  },
};
