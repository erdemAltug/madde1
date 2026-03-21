import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { StampTaxCalculator } from "@/components/growth/stamp-tax-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { DamgaVergisiSeoArticle } from "@/components/seo/araclar/damga-vergisi-seo-article";
import { DAMGA_VERGISI_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = DAMGA_VERGISI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Damga vergisi hesaplama — kira ve sözleşme matrahı tahmini";

export const metadata: Metadata = {
  title,
  description:
    "Aylık bedel, süre ve binde oranı ile yaklaşık damga vergisi hesaplayın. Sözleşme analizi ve legal AI assistant Clause ile tam metin risk taramasına geçin.",
  keywords: [
    "damga vergisi hesaplama",
    "kira sözleşmesi damga",
    "sözleşme analizi",
    "legal AI assistant",
    "Clause",
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz damga vergisi kabaca hesap; bilgilendirme amaçlı.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(
    title,
    "Damga vergisi tahmini — ücretsiz hesaplayıcı.",
  ),
};

export default function DamgaVergisiHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/#ucretsiz-araclar" },
            { name: "Damga vergisi hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Damga vergisi hesaplama
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Kabaca matrah ve damga tutarı — resmi tarife ve istisnalar için uzman
            görüşü gerekir.{" "}
            <Link
              href="/analiz/kira-sozlesmesi"
              className="font-semibold text-madde-blue hover:underline"
            >
              Kira sözleşmesi AI analizi
            </Link>{" "}
            ile metin risklerini birlikte değerlendirin.
          </p>
        </header>

        <section
          aria-labelledby="damga-hesap"
          className="mb-14 min-h-[280px] rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6"
        >
          <h2 id="damga-hesap" className="sr-only">
            Damga vergisi hesaplayıcı
          </h2>
          <StampTaxCalculator
            analyticsToolId="stamp_tax_page"
            analyticsSurface="tool_page"
          />
        </section>

        <section aria-labelledby="damga-rehber">
          <h2 id="damga-rehber" className="sr-only">
            Damga vergisi ve sözleşme analizi rehberi
          </h2>
          <DamgaVergisiSeoArticle />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
