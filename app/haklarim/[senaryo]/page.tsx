import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehberPageLayout } from "@/components/seo/rehber-page-layout";
import { HAKLARIM_SLUGS, getHaklarimConfig } from "@/lib/seo/haklarim-pages";
import { getRelatedLinksForHaklarim } from "@/lib/seo/internal-links";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: { senaryo: string } };

export function generateStaticParams() {
  return HAKLARIM_SLUGS.map((senaryo) => ({ senaryo }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cfg = getHaklarimConfig(params.senaryo);
  if (!cfg) return { title: "Haklarım" };
  const path = `/haklarim/${params.senaryo}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: [...cfg.keywords, "haklarım", SITE_NAME],
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

export default function HaklarimSenaryoPage({ params }: Props) {
  const cfg = getHaklarimConfig(params.senaryo);
  if (!cfg) notFound();
  return (
    <RehberPageLayout
      config={cfg}
      basePath="/haklarim"
      hub={{ name: "Haklarım", href: "/haklarim" }}
      relatedLinks={getRelatedLinksForHaklarim(params.senaryo)}
    />
  );
}
