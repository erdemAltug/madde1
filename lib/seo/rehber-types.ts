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

export type HukukiAnalizPageConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  problemExplanation: string;
  legalContext: string;
  risks: string[];
  solution: string;
  relatedLaws: { code: string; article: string; title: string }[];
  exampleScenario: { title: string; situation: string; result: string };
  faqs: FaqItem[];
  ctaHref: string;
  updatedAt: string;
};
