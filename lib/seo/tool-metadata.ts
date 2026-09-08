import type { Metadata } from "next";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

export type ToolMetadataInput = {
  /** Araç adı (title’ın [Araç Adı] kısmı) */
  toolName: string;
  /** Description’daki [Konu] — örn. “kıdem ve ihbar tazminatı” */
  topic: string;
  path: string;
  keywords?: string[];
  /** Title özelleştirmesi; verilmezse standart 2026 formatı kullanılır */
  titleOverride?: string;
  descriptionOverride?: string;
};

/**
 * Araç sayfası metadata — YMYL tutarlı title / description / canonical.
 * Title: `[Araç Adı] 2026 — Yasal Hesaplama ve AI Ön İnceleme | Clause`
 */
export function buildToolMetadata(input: ToolMetadataInput): Metadata {
  const title =
    input.titleOverride ??
    `${input.toolName} 2026 — Yasal Hesaplama ve AI Ön İnceleme`;
  const description =
    input.descriptionOverride ??
    `2026 güncel mevzuatına göre ${input.topic} hesaplayın, yasal sınırları öğrenin ve sözleşme maddelerinizi yapay zeka ile ücretsiz tarayın.`;
  const canonical = absoluteUrl(input.path);

  return {
    title,
    description,
    keywords: [
      input.toolName,
      input.topic,
      "2026",
      "yasal hesaplama",
      SITE_NAME,
      ...(input.keywords ?? []),
    ],
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      type: "article",
      locale: "tr_TR",
      images: openGraphArticleImages(defaultOgAlt(title)),
    },
    twitter: twitterSummaryLargeImage(title, description),
  };
}

export function toolCanonicalUrl(path: string): string {
  return absoluteUrl(path);
}
