import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { InternalLinksSection } from "@/components/seo/internal-links-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import type { RehberPageConfig } from "@/lib/seo/rehber-types";
import {
  getRelatedLinksForRehber,
  type InternalLink,
} from "@/lib/seo/internal-links";
import { buildArticleJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  config: RehberPageConfig;
  /** Varsayılan: /rehber */
  basePath?: string;
  hub?: { name: string; href: string };
  relatedLinks?: InternalLink[];
};

export function RehberPageLayout({
  config,
  basePath = "/rehber",
  hub = { name: "Hukuk rehberleri", href: "/rehber" },
  relatedLinks,
}: Props) {
  const path = `${basePath}/${config.slug}`;
  const articleLd = buildArticleJsonLd({
    headline: config.h1,
    description: config.metaDescription,
    url: absoluteUrl(path),
    dateModified: config.updatedAt,
  });
  const links = relatedLinks ?? getRelatedLinksForRehber(config.slug);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            hub,
            { name: config.h1.split("—")[0]?.trim() ?? config.h1, href: path },
          ]}
        />
        <article>
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Son güncelleme: {config.updatedAt}
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
              {config.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{config.intro}</p>
          </header>

          <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:text-madde-ink prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-slate-700">
            {config.sections.map((section) => (
              <section key={section.title} className="mt-8">
                <h2 className="text-xl">{section.title}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#005BEA]/20 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-6">
            <h2 className="text-lg font-bold text-madde-ink">Sözleşmenizi kontrol edin</h2>
            <p className="mt-2 text-sm text-slate-600">
              Bu rehber bilgilendirme amaçlıdır. Kendi sözleşmeniz için ücretsiz ön tarama yapın.
            </p>
            <Link
              href={config.ctaHref}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#005BEA] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0049c4]"
            >
              {config.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <FaqSection faqs={config.faqs} />
          <LegalAiDisclaimer className="mt-10" />
        </article>
      </main>
      <InternalLinksSection links={links} />
      <SiteFooter />
    </div>
  );
}
