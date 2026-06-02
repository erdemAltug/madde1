import { ContractAnalyzer } from "@/components/clause/ContractAnalyzer";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { TechTrustStrip } from "@/components/landing/tech-trust-strip";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedToolsSection } from "@/components/seo/related-tools-section";
import type { BreadcrumbItem } from "@/components/seo/breadcrumbs";
import { buildArticleJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  sharePath?: string;
  pageTitle?: string;
  pageDescription?: string;
  breadcrumbItems?: BreadcrumbItem[];
};

export function WorkspaceDashboard({
  sharePath = "/analiz/kira-sozlesmesi",
  pageTitle = "Sözleşme analizi",
  pageDescription = "Metninizi yapıştırın; TBK ve ilgili mevzuata göre ön analiz sonuçları canlı akışla üretilir.",
  breadcrumbItems,
}: Props) {
  const articleLd = buildArticleJsonLd({
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(sharePath),
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
        {breadcrumbItems?.length ? (
          <Breadcrumbs items={breadcrumbItems} />
        ) : null}
        <article itemScope itemType="https://schema.org/WebApplication">
          <header>
            <h1
              className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl"
              itemProp="name"
            >
              {pageTitle}
            </h1>
            <p
              className="mt-3 max-w-2xl text-base font-medium text-slate-600"
              itemProp="description"
            >
              {pageDescription}
            </p>
          </header>
          <div className="mt-10" itemProp="browserRequirements">
            <ContractAnalyzer sharePath={sharePath} />
          </div>
        </article>
      </main>
      <RelatedToolsSection />
      <aside aria-label="Teknoloji ve güven" className="border-t border-slate-100">
        <TechTrustStrip />
      </aside>
      <SiteFooter />
    </div>
  );
}
