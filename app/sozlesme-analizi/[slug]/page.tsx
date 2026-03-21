import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SozlesmeAnaliziDashboard } from "@/components/seo/sozlesme-analizi-dashboard";
import {
  SOZLESME_ANALIZI_SLUGS,
  getSozlesmeAnaliziConfig,
} from "@/lib/seo/sozlesme-analizi-pages";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return SOZLESME_ANALIZI_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getSozlesmeAnaliziConfig(params.slug);
  if (!cfg) {
    return { title: "Sözleşme analizi" };
  }
  const path = `/sozlesme-analizi/${params.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [
      ...cfg.keywords,
      "sözleşme analizi yapay zeka",
      "Clause",
    ],
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: `${cfg.metaTitle} | ${SITE_NAME}`,
      description: cfg.metaDescription,
      url: absoluteUrl(path),
      type: "article",
      locale: "tr_TR",
      images: openGraphArticleImages(defaultOgAlt(cfg.metaTitle)),
    },
    twitter: twitterSummaryLargeImage(cfg.metaTitle, cfg.metaDescription),
  };
}

export default function SozlesmeAnaliziSlugPage({ params }: Props) {
  const cfg = getSozlesmeAnaliziConfig(params.slug);
  if (!cfg) {
    notFound();
  }
  return <SozlesmeAnaliziDashboard config={cfg} />;
}
