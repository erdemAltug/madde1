import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { RentIncreaseCalculator } from "@/components/growth/rent-increase-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { KiraArtisSeoArticle } from "@/components/seo/araclar/kira-artis-seo-article";
import { KIRA_ARTIS_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = KIRA_ARTIS_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "Kira sözleşmesi artış oranı hesaplama — TBK bağlamında ücretsiz araç";

export const metadata: Metadata = {
  title,
  description:
    "Kira sözleşmesi artış oranı ve yıllık yüzde ile tahmini yeni kira tutarını hesaplayın. Kira sözleşmesi riskleri ve sözleşme analizi için Clause AI ile tam metin taramasına geçin.",
  keywords: [
    "kira sözleşmesi artış oranı hesaplama",
    "kira sözleşmesi riskleri",
    "kira artış hesaplama",
    "TBK kira artışı",
    "sözleşme analizi",
    "legal AI assistant",
    "Clause",
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description:
      "Uzun kuyruk SEO URL ile kira artışı hesabı; ücretsiz LegalTech aracı.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(
    title,
    "Kira sözleşmesi artış oranı — ücretsiz hesaplayıcı ve rehber.",
  ),
};

export default function KiraSozlesmesiArtisOraniHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/#ucretsiz-araclar" },
            { name: "Kira sözleşmesi artış oranı hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Kira sözleşmesi artış oranı hesaplama
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Tahmini yeni kira — bilgilendirme amaçlıdır. Kesin hukuki sonuç için
            avukata danışın. Ev sahibinin istediği zammı yasal tavanla
            karşılaştırmak ve hazır cevap metni almak için{" "}
            <Link
              href="/araclar/kira-analizi"
              className="font-semibold text-madde-blue hover:underline"
            >
              kira analizi &amp; cevap taslağı
            </Link>
            ; tam metin risk taraması için{" "}
            <Link
              href="/analiz/kira-sozlesmesi"
              className="font-semibold text-madde-blue hover:underline"
            >
              kira sözleşmesi yapay zeka analizi
            </Link>
            .
          </p>
        </header>

        <section
          aria-labelledby="hesap-baslik"
          className="mb-14 min-h-[320px] rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6"
        >
          <h2 id="hesap-baslik" className="sr-only">
            Kira artış hesaplayıcı aracı
          </h2>
          <RentIncreaseCalculator
            analyticsToolId="rent_increase_page"
            analyticsSurface="tool_page"
          />
        </section>

        <section aria-labelledby="rehber-baslik">
          <h2 id="rehber-baslik" className="sr-only">
            Hukuki rehber ve detaylı açıklama
          </h2>
          <KiraArtisSeoArticle />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
