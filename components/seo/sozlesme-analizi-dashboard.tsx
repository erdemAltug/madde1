import { ContractAnalyzer } from "@/components/clause/ContractAnalyzer";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { TechTrustStrip } from "@/components/landing/tech-trust-strip";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedToolsSection } from "@/components/seo/related-tools-section";
import { InternalLinksSection } from "@/components/seo/internal-links-section";
import { getRelatedLinksForSozlesme } from "@/lib/seo/internal-links";
import { buildArticleJsonLd } from "@/lib/seo/faq-schema";
import type { SozlesmeAnaliziPageConfig } from "@/lib/seo/sozlesme-analizi-pages";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  config: SozlesmeAnaliziPageConfig;
};

export function SozlesmeAnaliziDashboard({ config }: Props) {
  const path = `/sozlesme-analizi/${config.slug}`;
  const articleLd = buildArticleJsonLd({
    headline: config.h1,
    description: config.metaDescription,
    url: absoluteUrl(path),
    dateModified: new Date().toISOString(),
  });

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Programatik sözleşme analizi", href: "/#ozellikler" },
            { name: config.navLabel, href: path },
          ]}
        />
        <article>
          <header>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
              {config.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-base font-medium text-slate-600">
              {config.metaDescription}
            </p>
          </header>

          <div className="mt-8">
            <ContractAnalyzer sharePath={path} />
          </div>

          <div className="prose prose-slate prose-p:leading-relaxed mt-14 max-w-none border-t border-slate-100 pt-10 prose-p:text-[15px] prose-p:text-slate-700">
            {config.bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </main>
      <RelatedToolsSection slug={config.slug} />
      <InternalLinksSection
        links={getRelatedLinksForSozlesme(config.slug)}
        title="Bu konuyla ilgili rehberler ve araçlar"
      />
      <aside aria-label="Teknoloji ve güven" className="border-t border-slate-100">
        <TechTrustStrip />
      </aside>
      <SiteFooter />
    </div>
  );
}
