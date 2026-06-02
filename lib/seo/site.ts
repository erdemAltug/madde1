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
  "Türkiye'nin İlk Ücretsiz Yapay Zeka Hukuk Asistanı";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export const defaultHomeMetadata: Metadata = {
  title:
    "Yapay Zeka Hukuk Asistanı — Ücretsiz Sözleşme Analizi AI | Clause Türkiye",
  description:
    "Türkiye'nin yapay zeka hukuk asistanı: sözleşme analizi AI, kira ve iş sözleşmesi risk taraması, TBK uyumlu özet. Legal AI assistant ile ücretsiz ön kontrol — günlük hukuki aramalarda hızlı bilgi.",
  keywords: [
    "yapay zeka hukuk asistanı",
    "yapay zeka sözleşme analizi",
    "yapay zeka hukuk",
    "legal AI assistant",
    "legal AI Türkiye",
    "hukuki yapay zeka",
    "ücretsiz hukuki analiz",
    "sözleşme analizi AI",
    "yapay zeka avukat",
    "AI hukuk asistanı",
    "kira sözleşmesi analizi yapay zeka",
    "sözleşme risk taraması",
    "Clause AI",
    "ücretsiz sözleşme analizi",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} — Türkiye'nin İlk Ücretsiz Yapay Zeka Hukuk Asistanı`,
    description:
      "Yapay zeka ile sözleşme analizi, Yargıtay içtihatları ve hukuki danışmanlık. Ücretsiz risk taraması.",
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
    title: `${SITE_NAME} — Türkiye'nin İlk Ücretsiz Yapay Zeka Hukuk Asistanı`,
    description:
      "AI hukuk asistanı ile sözleşme analizi, Yargıtay emsal ve TBK danışmanlık.",
    images: ["/opengraph-image"],
  },
};
