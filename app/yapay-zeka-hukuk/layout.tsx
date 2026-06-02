import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Yapay zeka hukuk — AI sözleşme analizi ve hukuk asistanı";
const description =
  "Yapay zeka hukuk asistanı, sözleşme analizi AI ve Legal AI Türkiye rehberleri. Kira, iş ve ticari sözleşmeler için ücretsiz ön tarama — Clause.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "yapay zeka hukuk",
    "yapay zeka hukuk asistanı",
    "yapay zeka sözleşme analizi",
    "legal AI Türkiye",
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
