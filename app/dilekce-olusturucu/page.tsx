import type { Metadata } from "next";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { DilekceWizard } from "@/components/growth/dilekce-wizard";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { DILEKCE_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = DILEKCE_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "Dilekçe nasıl yazılır? 2026 ücretsiz AI dilekçe oluşturucu";
const description =
  "Tüketici hakem heyeti, kira zammı itirazı veya depozito iadesi için soru-cevapla resmi formatta dilekçe taslağı oluşturun. Ücretsiz.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "dilekçe oluşturucu",
    "tüketici hakem heyeti başvuru",
    "ihtarname örneği",
    "depozito iadesi dilekçe",
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
    question: "İnternetten aldığım ürün bozuk, satıcı iade etmiyor — ne yapmalıyım?",
    answer:
      "Ayıp bildirimi, satıcıyla yazışma ve tutar/yetki sınırına göre tüketici hakem heyeti veya mahkeme yolları gündeme gelir. Bu araç başvuru taslağı üretir; güncel parasal sınırları resmi kaynaktan kontrol edin.",
  },
  {
    question: "Bu dilekçe mahkemede geçerli midir?",
    answer:
      "Hayır, otomatik taslaktır. Resmi başvuru için format, ekler ve yetkili merci doğrulanmalı; gerekirse avukat onayı alınmalıdır.",
  },
];

export default function DilekceOlusturucuPage() {
  return (
    <div className="min-h-screen bg-white pb-28">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Dilekçe oluşturucu", href: path },
          ]}
        />
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Günlük hukuk · Dilekçe
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Dilekçe &amp; ihtarname oluşturucu
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Tüketici, kira zammı veya depozito senaryosunu seçin; 10 saniyede
            kopyalanabilir taslak alın.
          </p>
        </header>
        <DilekceWizard />
        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <SiteFooter />
    </div>
  );
}
