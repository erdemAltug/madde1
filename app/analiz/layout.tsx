import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Yapay zeka hukuki analiz — ücretsiz ön değerlendirme";
const description =
  "Vakanızı yapay zeka ile ön değerlendirin: kira, iş ve ticaret hukuku bağlamında kanun ve risk çerçevesi. Clause — ücretsiz hukuki analiz aracı.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hukuki analiz yapay zeka",
    "yapay zeka hukuki analiz",
    "ücretsiz hukuki analiz",
    "AI hukuk analizi",
    "vaka analizi AI",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/analiz") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/analiz"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function AnalizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
