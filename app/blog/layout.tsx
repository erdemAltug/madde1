import type { Metadata } from "next";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

const title = "Hukuk blog — günlük hukuk, kira ve AI sözleşme analizi";

export const metadata: Metadata = {
  title,
  description: `${SITE_NAME} blog: 40+ yazı — yapay zeka sözleşme analizi, kira ve iş hukuku, günlük hukuk ihtiyaçları, TBK pratikleri ve ücretsiz araç rehberleri.`,
  robots: { index: true, follow: true },
  keywords: [
    "sözleşme analizi blog",
    "günlük hukuk blog",
    "legal AI assistant",
    "LegalTech Türkiye",
    "TBK yorum",
    "ücretsiz sözleşme analizi",
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
