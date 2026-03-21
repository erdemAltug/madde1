import type { Metadata } from "next";

/** Üretimde NEXT_PUBLIC_SITE_URL ile canonical / OG uyumu (örn. https://tryclause.ai) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tryclause.ai"
).replace(/\/$/, "");

export const SITE_NAME = "Clause";

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_TAGLINE =
  "Türkiye'de yapay zeka destekli sözleşme analizi, risk taraması ve taslak üretimi";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export const defaultHomeMetadata: Metadata = {
  title:
    "Sözleşme analizi ve kira sözleşmesi riskleri — ücretsiz AI ön tarama | Clause",
  description:
    "Sözleşme analizi, kira sözleşmesi riskleri ve legal AI assistant ile TBK odaklı ön inceleme. Ücretsiz güven skoru; detaylı rapor Clause ile. İş ve ticari sözleşmeler.",
  keywords: [
    "sözleşme analizi",
    "kira sözleşmesi riskleri",
    "legal AI assistant",
    "yapay zeka sözleşme analizi",
    "AI hukuk asistanı Türkiye",
    "sözleşme üretimi yapay zeka",
    "kira sözleşmesi kontrolü",
    "iş sözleşmesi fesih maddesi",
    "sözleşme risk analizi",
    "Clause AI",
    "TBK sözleşme inceleme",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Ücretsiz güven skoru ve özet; şirketler için sözleşme ön kontrolü ve risk taraması.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — sözleşme analizi ve legal AI assistant`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — sözleşme analizi & kira riskleri`,
    description:
      "Legal AI assistant: kira, iş ve freelance sözleşmelerinde hukuki risk ön taraması.",
    images: ["/opengraph-image"],
  },
};
