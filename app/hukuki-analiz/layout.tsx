import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Hukuki konular — kira, iş ve sözleşme sorunları";
const description =
  "Kira feshi, işten çıkarılma, tahliye taahhütnamesi ve sözleşme riskleri hakkında sade anlatım. Ücretsiz ön kontrol ile devam edin.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hukuki analiz",
    "kira feshi",
    "işten çıkarma",
    "tahliye",
    "sözleşme riski",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/hukuki-analiz") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/hukuki-analiz"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function HukukiAnalizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
