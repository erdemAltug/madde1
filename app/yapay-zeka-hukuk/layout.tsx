import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Yapay zeka ve hukuk 2026 — legal AI ile ücretsiz hukuki yardım";
const description =
  "Türk hukuku için legal AI: sözleşme analizi, hukuki soru-cevap, dilekçe yazma ve hak hesaplama. Her yanıt kanun maddesine dayanır. Ücretsiz deneyin.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "yapay zeka hukuk",
    "yapay zeka hukuk asistanı",
    "yapay zeka sözleşme analizi",
    "legal AI Türkiye",
    "legal ai",
    "hukuk yapay zekası",
    "hukuk yapay zeka",
    "AI avukat",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/yapay-zeka-hukuk") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/yapay-zeka-hukuk"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function YapayZekaHukukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
