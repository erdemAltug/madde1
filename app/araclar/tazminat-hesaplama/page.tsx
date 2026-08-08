import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { TazminatHub } from "@/components/growth/tazminat-hub";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { TAZMINAT_HUB_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = TAZMINAT_HUB_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "İşten çıkarılma tazminat hesaplama 2026 — kıdem, ihbar & hak sorgulama";
const description =
  "Kıdem ve ihbar tazminatı hesaplama; istifaya zorlama / mobbing kontrol listesi ve dilekçe taslağı. Ücretsiz iş hukuku mikro aracı.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "işten çıkarılma tazminat hesaplama 2026",
    "kıdem tazminatı hesaplama",
    "ihbar tazminatı",
    "istifaya zorlama",
    "mobbing haklı fesih",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

const howToLd = buildHowToJsonLd({
  name: "Kıdem ve ihbar tazminatı hesaplama",
  description: "Brüt ücret ve çalışma süresiyle tazminat tahmini.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi ve çalışma yılınızı girin.",
    "Kıdem ve ihbar tahminlerini inceleyin.",
    "İstifaya zorlama / mobbing kutularını işaretleyip dilekçe taslağını kopyalayın.",
  ],
});

const faqs = [
  {
    question: "Patron beni istifaya zorluyor, tazminat alabilir miyim?",
    answer:
      "İstifa kural olarak kıdem hakkını zayıflatır. Baskı, mobbing veya ücret ödememe gibi durumlar haklı nedenle fesih değerlendirmesine yol açabilir; kanıt kritiktir. Bu araç kontrol listesi ve taslak üretir; kesin hak tespiti için avukat/arabulucu gerekir.",
  },
  {
    question: "İşten çıkarılma tazminatı nasıl hesaplanır?",
    answer:
      "Kıdem için her tam yıl 30 günlük brüt ücret formülü sık kullanılır; kısmi yıl, tavan ve fesih türü sonucu değiştirir. İhbar, kıdeme göre kanuni bildirim süresine dayanır. Aşağıdaki hesaplayıcılar tahmini gösterir.",
  },
  {
    question: "Mobbing tazminatı nedir?",
    answer:
      "İşyerinde sistematik baskı iddiası ayrı bir dava/talep konusu olabilir. Önce olayları belgelemek, sağlık kaydı tutmak ve iş sözleşmesini incelemek gerekir. Clause ön analiz sunar; mahkeme kararı vermez.",
  },
];

export default function TazminatHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Tazminat hesaplama", href: path },
          ]}
        />
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Günlük hukuk · İşçi
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Kıdem &amp; ihbar + hak sorgulama
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Maaş ve süreyi girin; tahmini tazminatı görün. İstifaya zorlanıyorsanız
            kontrol listesiyle taslak dilekçe alın.{" "}
            <Link
              href="/rehber/isten-cikarilinca-ne-yapilir"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              İşten çıkarılınca ne yapılır?
            </Link>
          </p>
        </header>

        <TazminatHub />
        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <SiteFooter />
    </div>
  );
}
