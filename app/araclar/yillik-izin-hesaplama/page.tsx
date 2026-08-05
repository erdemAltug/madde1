import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { YillikIzinCalculator } from "@/components/growth/labor-calculators";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { YILLIK_IZIN_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = YILLIK_IZIN_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Yıllık izin hesaplama — ücretsiz süre ve ücret aracı 2026";

export const metadata: Metadata = {
  title,
  description:
    "Kıdeme göre yıllık izin günü ve kullanılmayan izin ücreti tahmini. Ücretsiz araç + işçi hakları rehberi.",
  keywords: [
    "yıllık izin hesaplama",
    "yıllık izin kaç gün",
    "kullanılmayan izin ücreti",
    "yıllık izin hakları 2026",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz yıllık izin süresi ve ücret tahmini.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, "Yıllık izin hesaplama — ücretsiz."),
};

const howToLd = buildHowToJsonLd({
  name: "Yıllık izin hesaplama",
  description: "Kıdem yılına göre asgari izin ve kullanılmayan gün ücreti tahmini.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi girin.",
    "Kıdem yılınızı yazın.",
    "Kullanılmayan gün varsa girin; tahmini ücreti görün.",
  ],
});

export default function YillikIzinHesaplamaPage() {
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
            { name: "Yıllık izin hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Yıllık izin hesaplama
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Asgari süre tahmini — sözleşme veya TİS daha elverişli hak
            tanıyabilir.{" "}
            <Link
              href="/rehber/yillik-izin-haklari-2026"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              Yıllık izin hakları rehberi
            </Link>
            .
          </p>
        </header>
        <YillikIzinCalculator
          analyticsToolId="yillik_izin_page"
          analyticsSurface="tool_page"
        />
        <section className="prose prose-slate mt-12 max-w-none text-sm">
          <h2>Yıllık izin kaç gün?</h2>
          <p>
            Genel çerçevede kıdeme göre asgari izin süreleri uygulanır; bir
            yıldan az kıdemde hak doğmayabilir. Kullanılmayan izinlerin ücrete
            dönüşmesi özellikle işten ayrılmada gündeme gelir.
          </p>
          <p>
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">
              İş sözleşmesi AI analizi
            </Link>{" "}
            ile izin ve ücret maddelerini kontrol edin.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
