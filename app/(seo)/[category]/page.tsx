import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntentPillarLanding } from "@/components/seo/intent-pillar-landing";
import {
  INTENT_PILLAR_CATEGORIES,
  getIntentPillar,
} from "@/lib/seo/intent-pillars";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

type Props = { params: { category: string } };

export function generateStaticParams() {
  return INTENT_PILLAR_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getIntentPillar(params.category);
  if (!cfg) return { title: "Clause" };

  // Canonical: https://tryclause.tech/[category]
  const canonical = `${SITE_URL.replace(/\/$/, "")}/${cfg.category}`;

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [...cfg.keywords, "Clause", "yapay zeka hukuk", SITE_NAME],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${cfg.metaTitle} | ${SITE_NAME}`,
      description: cfg.metaDescription,
      url: canonical,
      type: "article",
      locale: "tr_TR",
      images: openGraphArticleImages(defaultOgAlt(cfg.metaTitle)),
    },
    twitter: twitterSummaryLargeImage(cfg.metaTitle, cfg.metaDescription),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function IntentPillarCategoryPage({ params }: Props) {
  const cfg = getIntentPillar(params.category);
  if (!cfg) notFound();
  return <IntentPillarLanding config={cfg} />;
}
