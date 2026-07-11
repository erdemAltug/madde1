import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Haklarım — günlük hukuk senaryoları";
const description =
  "İşten atıldım, kiracıyım, tüketiciyim — haklarım neler? Senaryoya göre ücretsiz rehberler, hesaplayıcılar ve AI sözleşme analizi.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "haklarım neler",
    "hukuki haklarım",
    "işten atıldım haklarım",
    "kiracı haklarım",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/haklarim") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/haklarim"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function HaklarimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
