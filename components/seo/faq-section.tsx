import type { FaqItem } from "@/lib/seo/rehber-pages";
import { buildFaqJsonLd } from "@/lib/seo/faq-schema";
import { cn } from "@/lib/utils";

type Props = {
  faqs: FaqItem[];
  heading?: string;
  className?: string;
};

export function FaqSection({
  faqs,
  heading = "Sıkça sorulan sorular",
  className,
}: Props) {
  const jsonLd = buildFaqJsonLd(faqs);

  return (
    <section
      aria-labelledby="faq-baslik"
      className={cn("mt-12", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 id="faq-baslik" className="text-2xl font-bold tracking-tight text-madde-ink dark:text-slate-50">
        {heading}
      </h2>
      <dl className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <dt className="text-base font-semibold text-madde-ink dark:text-slate-100">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
