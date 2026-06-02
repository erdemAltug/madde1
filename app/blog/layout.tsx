import type { Metadata } from "next";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

const title = "Hukuk ve LegalTech blog — sözleşme analizi içerikleri";

export const metadata: Metadata = {
  title,
  description: `${SITE_NAME}: sözleşme analizi, kira sözleşmesi riskleri ve legal AI gündemi. Hukuk teknolojisi, TBK ve KOBİ sözleşme yönetimi yazıları kademeli eklenecek.`,
  robots: { index: false, follow: true },
  keywords: [
    "sözleşme analizi blog",
    "legal AI assistant",
    "LegalTech Türkiye",
    "TBK yorum",
  ],
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description:
      "Clause blog — yapay zeka sözleşme analizi ve hukuk teknolojisi yazıları.",
    url: absoluteUrl("/blog"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(
    title,
    "Sözleşme analizi ve LegalTech içerikleri — Clause blog.",
  ),
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
