import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspaceDashboard } from "@/components/clause/workspace-dashboard";
import {
  CONTRACT_ANALYSIS_SLUGS,
  getContractAnalysisConfig,
} from "@/lib/seo/contract-analysis-pages";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return CONTRACT_ANALYSIS_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getContractAnalysisConfig(params.slug);
  if (!cfg) {
    return { title: "Analiz" };
  }
  const path = `/analiz/${params.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [
      ...cfg.keywords,
      "yapay zeka sözleşme analizi Türkiye",
      "AI hukuk asistanı",
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

export default function AnalizSlugPage({ params }: Props) {
  const cfg = getContractAnalysisConfig(params.slug);
  if (!cfg) {
    notFound();
  }

  const path = `/analiz/${params.slug}`;

  return (
    <WorkspaceDashboard
      sharePath={path}
      pageTitle={cfg.h1}
      pageDescription={cfg.lead}
      breadcrumbItems={[
        { name: "Özellikler ve analiz", href: "/#ozellikler" },
        { name: cfg.h1, href: path },
      ]}
    />
  );
}
