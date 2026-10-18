import type { Metadata } from "next";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { KiraAnaliziCalculator } from "@/components/growth/kira-analizi-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { KiraArtisSeoArticle } from "@/components/seo/araclar/kira-artis-seo-article";
import { KIRA_ARTIS_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = KIRA_ARTIS_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Ev sahibi zam istedi — yasal tavan ve mesaj";

export const metadata: Metadata = {
  title,
  description:
    "Ev sahibinin istediği kirayı Ekim 2026 yasal tavanıyla karşılaştır, mesajı kopyala. Dosya asistanında kalır.",
  keywords: [
    "kira zammı yasal mı",
    "kira artış hesaplama 2026",
    "kira artış oranı hesaplama",
    "kira sözleşmesi artış oranı hesaplama",
    "ücretsiz kira tarama",
    "Clause",
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description:
      "Kira zammı yasal mı? 2026 tavan hesabı ve ücretsiz tarama.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(
    title,
    "Kira zammı yasal mı — ücretsiz 2026 hesap.",
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
            Ev sahibi zam istedi
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Mevcut kirayı ve istenen tutarı yaz. Yasal tavan hazır, ev sahibine
            mesaj çıkar. Bu bir hesap sitesi değil: dosya asistanında kalır,
            sözleşmen ve gelecek yılın zammı aynı yerde durur.
          </p>
        </header>

        <section
          aria-labelledby="hesap-baslik"
          className="mb-14 min-h-[320px] rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6"
        >
          <h2 id="hesap-baslik" className="sr-only">
            Kira artış hesaplayıcı aracı
          </h2>
          <KiraAnaliziCalculator analyticsToolId="rent_increase_page" />
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
