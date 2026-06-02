export type FaqItem = { question: string; answer: string };

export type RehberSection = {
  title: string;
  paragraphs: string[];
};

export type RehberPageConfig = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: RehberSection[];
  faqs: FaqItem[];
  ctaLabel: string;
  ctaHref: string;
  updatedAt: string;
};

/** Blog yazıları aynı şemayı kullanır */
export type BlogPostConfig = RehberPageConfig & {
  excerpt: string;
  publishedAt: string;
};
