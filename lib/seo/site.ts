import type { Metadata } from "next";

/** Üretimde NEXT_PUBLIC_SITE_URL ile canonical / OG uyumu (örn. https://tryclause.ai) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tryclause.ai"
).replace(/\/$/, "");

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
    "Türkiye'nin İlk Ücretsiz Yapay Zeka Hukuk Asistanı | Clause - Sözleşme Analizi AI",
  description:
    "Yapay zeka hukuk asistanı ile sözleşme analizi, Yargıtay emsal sorgulama, TBK danışmanlık. Ücretsiz sözleşme risk taraması ve hukuki öneriler. Kira, iş ve ticari sözleşmeler için AI destekli analiz.",
  keywords: [
    "yapay zeka hukuk asistanı",
    "ücretsiz hukuki analiz",
    "sözleşme analizi AI",
    "yargıtay emsal sorgulama",
    "tbk danışmanlık",
    "kira sözleşmesi analizi",
    "sözleşme risk taraması",
    "hukuki yapay zeka türkiye",
    "yapay zeka avukat",
    "sözleşme kontrolü",
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
