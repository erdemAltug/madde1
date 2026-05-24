import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehberPageLayout } from "@/components/seo/rehber-page-layout";
import {
  REHBER_SLUGS,
  getRehberConfig,
} from "@/lib/seo/rehber-pages";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return REHBER_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getRehberConfig(params.slug);
  if (!cfg) return { title: "Rehber" };
  const path = `/rehber/${params.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [...cfg.keywords, "hukuk rehberi", "Clause", SITE_NAME],
    alternates: { canonical: absoluteUrl(path) },
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

export default function RehberSlugPage({ params }: Props) {
  const cfg = getRehberConfig(params.slug);
  if (!cfg) notFound();
  return <RehberPageLayout config={cfg} />;
}
