import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo/site";

const OG_PATH = "/opengraph-image";

/** Dinamik sayfalar için tutarlı OG görselleri */
export function openGraphArticleImages(
  alt: string,
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  return [
    {
      url: OG_PATH,
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

export function twitterSummaryLargeImage(
  title: string,
  description: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [OG_PATH],
  };
}

export function defaultOgAlt(pageTitle: string): string {
  return `${pageTitle} — ${SITE_NAME}`;
}
