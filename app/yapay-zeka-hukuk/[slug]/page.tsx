import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehberPageLayout } from "@/components/seo/rehber-page-layout";
import { getRelatedLinksForYapayZekaHukuk } from "@/lib/seo/internal-links";
import {
  YAPAY_ZEKA_HUKUK_SLUGS,
  getYapayZekaHukukConfig,
} from "@/lib/seo/yapay-zeka-hukuk-pages";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return YAPAY_ZEKA_HUKUK_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getYapayZekaHukukConfig(params.slug);
  if (!cfg) return { title: "Yapay zeka hukuk" };
  const path = `/yapay-zeka-hukuk/${params.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [...cfg.keywords, "yapay zeka hukuk", "legal AI", SITE_NAME],
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

export default function YapayZekaHukukSlugPage({ params }: Props) {
  const cfg = getYapayZekaHukukConfig(params.slug);
  if (!cfg) notFound();
  return (
    <RehberPageLayout
      config={cfg}
      basePath="/yapay-zeka-hukuk"
      hub={{ name: "Yapay zeka hukuk", href: "/yapay-zeka-hukuk" }}
      relatedLinks={getRelatedLinksForYapayZekaHukuk(cfg.slug)}
    />
  );
}
