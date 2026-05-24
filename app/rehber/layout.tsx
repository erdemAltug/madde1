import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Hukuk rehberleri — herkes için sözleşme ve hak bilgisi";
const description =
  "Kiracı, işçi ve tüketici hakları; kira artışı, depozito, tahliye ve işten çıkarma rehberleri. Avukat olmadan önce bilgi, Clause ile ücretsiz sözleşme kontrolü.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hukuk rehberi",
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
