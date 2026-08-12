import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { Button } from "@/components/ui/button";
import type { IntentPillarConfig } from "@/lib/seo/intent-pillars";
import { buildArticleJsonLd, buildFaqJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  config: IntentPillarConfig;
};

export function IntentPillarLanding({ config }: Props) {
  const path = `/${config.category}`;
  const url = absoluteUrl(path);
  const articleLd = buildArticleJsonLd({
    headline: config.h1,
    description: config.metaDescription,
    url,
    dateModified: config.updatedAt,
  });
  const faqLd = buildFaqJsonLd(config.faqs);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteNavbar />
      <main>
        <section className="border-b border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <Breadcrumbs
              items={[
                { name: "Ana sayfa", href: "/" },
                { name: config.h1.split("&")[0]?.trim() ?? config.h1, href: path },
              ]}
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[var(--cta-primary)]">
              Türkiye · ücretsiz ön tarama
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-deep-navy sm:text-4xl lg:text-[2.6rem]">
              {config.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              {config.intro}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {config.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cta-primary)]"
                    aria-hidden
                  />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-[var(--cta-primary)] px-7 text-base font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:bg-[#1d4ed8]"
                asChild
              >
                <Link href={config.primaryCta.href}>
                  <Sparkles className="mr-1 h-4 w-4" />
                  {config.primaryCta.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-2 border-slate-300 px-7 text-base font-semibold"
                asChild
              >
                <Link href={config.secondaryCta.href}>
                  {config.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <article className="space-y-10">
            {config.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold tracking-tight text-deep-navy">
                  {section.title}
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
                  {section.body}
                </p>
              </section>
            ))}
          </article>

          <div className="mt-12 rounded-2xl border border-[var(--cta-primary)]/20 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-deep-navy">
              Hemen deneyin
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Kayıt olmadan ön tarama veya dilekçe taslağı ile başlayın. Avukat
              yerine geçmez; bilinçli adım atmanıza yardımcı olur.
            </p>
            <Button
              className="mt-5 rounded-xl bg-[var(--cta-primary)] font-bold hover:bg-[#1d4ed8]"
              asChild
            >
              <Link href={config.primaryCta.href}>
                {config.primaryCta.label}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <FaqSection faqs={config.faqs} />

          <nav aria-label="İlgili sayfalar" className="mt-12">
            <h2 className="text-lg font-bold text-deep-navy">İlgili araçlar</h2>
            <ul className="mt-4 space-y-2">
              {config.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-[var(--cta-primary)] hover:underline"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LegalAiDisclaimer className="mt-10" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
