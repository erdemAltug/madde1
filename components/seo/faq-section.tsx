import type { FaqItem } from "@/lib/seo/rehber-pages";
import { buildFaqJsonLd } from "@/lib/seo/faq-schema";

type Props = {
  faqs: FaqItem[];
  heading?: string;
};

export function FaqSection({ faqs, heading = "Sıkça sorulan sorular" }: Props) {
  const jsonLd = buildFaqJsonLd(faqs);

  return (
    <section aria-labelledby="faq-baslik" className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 id="faq-baslik" className="text-2xl font-bold tracking-tight text-madde-ink">
        {heading}
      </h2>
      <dl className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <dt className="text-base font-semibold text-madde-ink">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
