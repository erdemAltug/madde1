import { ChevronDown } from "lucide-react";
import { HOME_FAQ } from "@/lib/seo/home-faq";

/** Görünür SSS. FAQPage şeması HomeStructuredData'da aynı listeden üretilir; burada tekrar basılmaz. */
export function LandingFaq() {
  return (
    <section className="border-b border-slate-200/70 bg-white py-14 sm:py-20" aria-labelledby="sss-baslik">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="sss-baslik" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Sık sorulan sorular
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {HOME_FAQ.map((f) => (
            <details key={f.question} className="group px-4 sm:px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="pb-4 text-[15px] leading-relaxed text-slate-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
