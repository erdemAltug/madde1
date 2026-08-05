import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { FazlaMesaiCalculator } from "@/components/growth/labor-calculators";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAZLA_MESAI_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = FAZLA_MESAI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Fazla mesai ücreti hesaplama — ücretsiz araç 2026";

export const metadata: Metadata = {
  title,
  description:
    "Brüt maaş ve fazla mesai saati ile ücretsiz fazla mesai ücreti tahmini. İşçi hakları rehberi ve iş sözleşmesi AI ön analizi.",
  keywords: [
    "fazla mesai ücreti hesaplama",
    "fazla mesai hesapla",
    "mesai ücreti nasıl hesaplanır",
    "fazla mesai 1.5",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz fazla mesai ücreti tahmini — bilgilendirme amaçlı.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, "Fazla mesai ücreti hesaplama — ücretsiz."),
};

const howToLd = buildHowToJsonLd({
  name: "Fazla mesai ücreti hesaplama",
  description: "Brüt aylık ücret ve fazla mesai saati ile tahmini zamlı ücret.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi girin.",
    "Fazla mesai saatini yazın.",
    "Tahmini zamlı ücreti görün; iş sözleşmenizi AI ile kontrol edin.",
  ],
});

export default function FazlaMesaiHesaplamaPage() {
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
            { name: "Fazla mesai ücreti hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Fazla mesai ücreti hesaplama
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Tahmini sonuç — yazılı anlaşma, gece ve tatil çalışması sonucu
            değiştirebilir.{" "}
            <Link
              href="/rehber/fazla-mesai-reddetme-ve-ucret"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              Fazla mesai reddetme ve ücret rehberi
            </Link>
            .
          </p>
        </header>
        <FazlaMesaiCalculator
          analyticsToolId="fazla_mesai_page"
          analyticsSurface="tool_page"
        />
        <section className="prose prose-slate mt-12 max-w-none text-sm">
          <h2>Fazla mesai ücreti nasıl hesaplanır?</h2>
          <p>
            Pratikte sık kullanılan yaklaşım; saatlik ücretin bir buçuk katı ile
            fazla mesai saatini çarpmaktır. Saatlik ücret için aylık brütün
            çalışma saatine bölünmesi yaygın bir tahmindir. Somut hesap bordro,
            sözleşmedeki çalışma düzeni ve güncel mevzuata göre değişir.
          </p>
          <p>
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">
              İş sözleşmesi AI analizi
            </Link>{" "}
            ile fazla mesai ve ücret maddelerini kontrol edin.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
