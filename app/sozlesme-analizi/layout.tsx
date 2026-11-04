import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Yapay zeka ile sözleşme analizi 2026 — ücretsiz AI sözleşme kontrolü";
const description =
  "Sözleşmenizi yapay zeka ile ücretsiz analiz edin: haksız cezai şart, eksik madde, riskli süre ve tarihler kanun maddesiyle. Kira, iş, freelance, ticari ve daha fazlası. Kayıt gerekmez.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "sözleşme analizi yapay zeka",
    "yapay zeka sözleşme analizi",
    "AI kontrat analizi",
    "sözleşme analizi",
    "sözleşme analiz programı",
    "ai sözleşme analizi",
    "yapay zeka sözleşme inceleme",
    "sözleşme risk analizi",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/sozlesme-analizi") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/sozlesme-analizi"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function SozlesmeAnaliziLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
