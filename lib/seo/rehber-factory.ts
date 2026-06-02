import type { RehberPageConfig } from "@/lib/seo/rehber-types";

type SectionInput = { title: string; paragraphs: string[] };

export function createRehberPage(input: {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: SectionInput[];
  faqs: { question: string; answer: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  updatedAt?: string;
}): RehberPageConfig {
  return {
    slug: input.slug,
    h1: input.h1,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    keywords: input.keywords,
    intro: input.intro,
    sections: input.sections,
    faqs: input.faqs,
    ctaLabel: input.ctaLabel ?? "Sözleşmenizi ücretsiz tarayın",
    ctaHref: input.ctaHref ?? "/#dene",
    updatedAt: input.updatedAt ?? "2026-06-01",
  };
}
