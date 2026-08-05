import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Ücretsiz hukuk rehberleri 2026 — günlük haklarınız";
const description =
  "90+ ücretsiz rehber: kiracı, işçi ve tüketici hakları; kira, işten çıkarılma, tazminat ve abonelik sorunları. Günlük hukuk için sade yanıtlar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hukuk rehberi",
    "günlük hukuk ihtiyaçları",
    "kiracı hakları",
    "işçi hakları",
    "tüketici hakları",
    "sözleşme rehberi",
    "ücretsiz hukuki bilgi",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/rehber") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/rehber"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function RehberLayout({ children }: { children: React.ReactNode }) {
  return children;
}
