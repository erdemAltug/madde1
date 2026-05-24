import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle2, FileText } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { InternalLinksSection } from "@/components/seo/internal-links-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import type { HukukiAnalizPageConfig } from "@/lib/seo/hukuki-analiz-pages";
import { getRelatedLinksForHukukiAnaliz } from "@/lib/seo/internal-links";
import { buildArticleJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  config: HukukiAnalizPageConfig;
};

export function HukukiAnalizPageLayout({ config }: Props) {
  const path = `/hukuki-analiz/${config.slug}`;
  const articleLd = buildArticleJsonLd({
    headline: config.heroTitle,
    description: config.metaDescription,
    url: absoluteUrl(path),
    dateModified: config.updatedAt,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SiteNavbar />
      <main>
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <Breadcrumbs
              items={[
                { name: "Hukuki konular", href: "/hukuki-analiz" },
                { name: config.title, href: path },
              ]}
            />
          </div>
        </div>

        <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 py-14">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
              Herkes için hukuki bilgi
            </p>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
              {config.heroTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              {config.heroSubtitle}
            </p>
            <Link
              href={config.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#005BEA] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0049c4]"
            >
              Ücretsiz kontrol başlat
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <article className="space-y-10 lg:col-span-2">
              <section>
                <h2 className="text-xl font-bold text-madde-ink">Sorun nedir?</h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {config.problemExplanation}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-madde-ink">Hukuki çerçeve</h2>
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-5">
                  <p className="leading-relaxed text-slate-600">{config.legalContext}</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-madde-ink">İlgili mevzuat başlıkları</h2>
                <ul className="mt-3 space-y-2">
                  {config.relatedLaws.map((law) => (
                    <li
                      key={`${law.code}-${law.article}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <FileText className="h-5 w-5 shrink-0 text-[#005BEA]" aria-hidden />
                      <div>
                        <p className="font-semibold text-madde-ink">
                          {law.code} — Madde {law.article}
                        </p>
                        <p className="text-sm text-slate-500">{law.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-slate-500">
                  Madde metinleri için resmi mevzuat kaynaklarına ve avukata danışın.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-madde-ink">Dikkat edilmesi gereken riskler</h2>
                <ul className="mt-3 space-y-2">
                  {config.risks.map((risk) => (
                    <li
                      key={risk}
                      className="flex gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4"
                    >
                      <AlertTriangle
                        className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                        aria-hidden
                      />
                      <span className="text-sm text-slate-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-madde-ink">
                  {config.exampleScenario.title}
                </h2>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase text-slate-500">Durum</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {config.exampleScenario.situation}
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Olası sonuç
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {config.exampleScenario.result}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-[#005BEA]/20 bg-white p-5">
                <h2 className="text-lg font-bold text-madde-ink">Clause ile ön kontrol</h2>
                <p className="mt-2 text-sm text-slate-600">{config.solution}</p>
                <Link
                  href={config.ctaHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#005BEA] hover:underline"
                >
                  Hemen başla
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </section>

              <FaqSection faqs={config.faqs} />
              <LegalAiDisclaimer />
            </article>

            <aside className="space-y-6">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-[#005BEA] p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Sözleşmenizi tarayın</h3>
                <p className="mt-2 text-sm text-blue-100">
                  Avukat öncesi ücretsiz özet — metninizi yapıştırın.
                </p>
                <Link
                  href={config.ctaHref}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-[#005BEA]"
                >
                  Analiz başlat
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <InternalLinksSection links={getRelatedLinksForHukukiAnaliz(config.slug)} />
      <SiteFooter />
    </div>
  );
}
