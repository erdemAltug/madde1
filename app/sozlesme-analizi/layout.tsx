import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Yapay zeka sözleşme analizi — tüm sözleşme türleri";
const description =
  "Kira, iş, freelance, KVKK ve ticari sözleşmeler için yapay zeka destekli analiz sayfaları. Ücretsiz ön tarama — Clause Legal AI.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "sözleşme analizi yapay zeka",
    "yapay zeka sözleşme analizi",
    "AI kontrat analizi",
    "programatik sözleşme analizi",
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
