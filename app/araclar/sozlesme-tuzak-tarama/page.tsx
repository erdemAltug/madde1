import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { RedFlagScanner } from "@/components/scanner/RedFlagScanner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { SOZLESME_TUZAK_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = SOZLESME_TUZAK_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "Sözleşmede tuzak var mı? 2026 ücretsiz AI tarama";
const description =
  "Kira veya iş sözleşmesini yapıştırın; yapay zeka yüksek riskli, dikkat ve lehe maddeleri 3 grupta listelesin. Ücretsiz hızlı tarama.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "sözleşme tuzakları",
    "kira sözleşmesi riskleri",
    "iş sözleşmesi cezai şart",
    "sözleşme AI tarama",
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

const faqs = [
  {
    question: "İkinci el araba alırken sözleşmede tuzak var mı?",
    answer:
      "Kilometre, ayıp bildirimi, cayma, cezai şart ve teslim koşulları sık risk alanlarıdır. Metni buraya yapıştırıp hızlı tarayın; kritik alımda avukat kontrolü şarttır.",
  },
  {
    question: "PDF fotoğrafı doğrudan yükleyebilir miyim?",
    answer:
      "İlk sürümde metin yapıştırma ve .txt desteklenir. PDF/JPG için metni kopyalayın veya tam analiz sayfasını kullanın; OCR yakında eklenecek.",
  },
];

export default function SozlesmeTuzakTaramaPage() {
  return (
    <div className="min-h-screen bg-white pb-28">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Sözleşme tuzak taraması", href: path },
          ]}
        />
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Günlük hukuk · Sözleşme
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Sözleşmedeki 3 gizli tuzak
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            İmza öncesi hızlı ön tarama. Derin analiz için{" "}
            <Link href="/#dene" className="font-semibold text-[#005BEA] hover:underline">
              Clause ücretsiz analiz
            </Link>
            .
          </p>
        </header>
        <RedFlagScanner />
        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <SiteFooter />
    </div>
  );
}
