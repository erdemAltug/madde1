import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { IhbarTazminatiCalculator } from "@/components/growth/severance-calculators";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { IHBAR_TAZMINATI_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = IHBAR_TAZMINATI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "İhbar tazminatı hesaplama — ücretsiz tahmini araç 2026";

export const metadata: Metadata = {
  title,
  description:
    "Brüt maaş ve kıdeme göre ihbar tazminatı hesaplama. İş Kanunu ihbar süreleri ve ücretsiz iş sözleşmesi analizi.",
  keywords: [
    "ihbar tazminatı hesaplama",
    "ihbar tazminatı hesapla",
    "ihbar süresi hesaplama",
    "işten çıkarılma ihbar",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz ihbar tazminatı tahmini.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, "İhbar tazminatı hesaplama — ücretsiz araç."),
};

const howToLd = buildHowToJsonLd({
  name: "İhbar tazminatı hesaplama",
  description: "Brüt ücret ve çalışma süresi ile tahmini ihbar tazminatı.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi girin.",
    "Çalışma sürenizi (yıl) yazın.",
    "İhbar süresine göre tahmini tutarı görün.",
  ],
});

export default function IhbarTazminatiHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "İhbar tazminatı hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            İhbar tazminatı hesaplama
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Bildirimsiz fesih varsayımıyla kabaca hesap.{" "}
            <Link href="/araclar/kidem-tazminati-hesaplama" className="font-semibold text-[#005BEA] hover:underline">
              Kıdem hesaplayıcı
            </Link>{" "}
            ile birlikte kullanın.
          </p>
        </header>
        <IhbarTazminatiCalculator analyticsToolId="ihbar_severance_page" analyticsSurface="tool_page" />
      </main>
      <SiteFooter />
    </div>
  );
}
