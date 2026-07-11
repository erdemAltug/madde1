import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { KidemTazminatiCalculator } from "@/components/growth/severance-calculators";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { KIDEM_TAZMINATI_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = KIDEM_TAZMINATI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Kıdem tazminatı hesaplama — ücretsiz tahmini araç 2026";

export const metadata: Metadata = {
  title,
  description:
    "Brüt maaş ve çalışma süresi ile kıdem tazminatı hesaplama. İşten çıkarılma rehberi ve ücretsiz iş sözleşmesi AI analizi.",
  keywords: [
    "kıdem tazminatı hesaplama",
    "kıdem tazminatı hesapla",
    "işten çıkarılma tazminatı",
    "kıdem hesaplama 2026",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz kıdem tazminatı tahmini — bilgilendirme amaçlı.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, "Kıdem tazminatı hesaplama — ücretsiz araç."),
};

const howToLd = buildHowToJsonLd({
  name: "Kıdem tazminatı hesaplama",
  description: "Brüt aylık ücret ve çalışma yılı ile tahmini kıdem tazminatı.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi girin.",
    "Toplam çalışma sürenizi (yıl) yazın.",
    "Tahmini kıdem tutarını görün; iş sözleşmenizi AI ile kontrol edin.",
  ],
});

export default function KidemTazminatiHesaplamaPage() {
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
            { name: "Kıdem tazminatı hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Kıdem tazminatı hesaplama
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Tahmini sonuç — kıdem tavanı ve fesih türü sonucu değiştirir.{" "}
            <Link href="/haklarim/isten-atildim-haklarim" className="font-semibold text-[#005BEA] hover:underline">
              İşten atıldım haklarım
            </Link>{" "}
            rehberine bakın.
          </p>
        </header>
        <KidemTazminatiCalculator analyticsToolId="kidem_severance_page" analyticsSurface="tool_page" />
        <section className="prose prose-slate mt-12 max-w-none text-sm">
          <h2>Kıdem tazminatı nasıl hesaplanır?</h2>
          <p>
            Her tam çalışma yılı için 30 günlük brüt ücret esas alınır. Kıdem tavanı ve hak
            kazanma şartları somut olaya göre değişir.
          </p>
          <p>
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">İş sözleşmesi AI analizi</Link>{" "}
            ile fesih maddelerini kontrol edin.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
