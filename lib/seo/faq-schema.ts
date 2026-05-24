import type { FaqItem } from "./rehber-pages";

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(opts: {
  headline: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    dateModified: opts.dateModified,
    inLanguage: "tr-TR",
    author: {
      "@type": "Organization",
      name: "Clause",
    },
    publisher: {
      "@type": "Organization",
      name: "Clause",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
  };
}
