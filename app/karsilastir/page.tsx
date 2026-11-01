import type { Metadata } from "next";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { DarkScope, ThemeToggle } from "@/components/theme/dark-scope";
import { FaqSection } from "@/components/seo/faq-section";
import { ContractCompare } from "@/components/compare/contract-compare";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Sözleşme karşılaştırma — eski ve yeni sürümde ne değişti?";
const description =
  "Kira yenilemesi ya da yeni iş teklifi geldiğinde eski ve yeni sözleşmeyi yapıştırın; değişen, eklenen ve çıkarılan maddeleri tek tek görün. Artış, cezai şart, fesih ve süre değişiklikleri işaretlenir. Ücretsiz, metin cihazınızdan çıkmaz.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/karsilastir") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/karsilastir"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

const FAQS = [
  {
    question: "Metnim bir sunucuya gönderiliyor mu?",
    answer:
      "Hayır. Karşılaştırma tamamen tarayıcınızda yapılır. Kimlik numarası, telefon ve IBAN gibi bilgiler ekranda da maskelenir.",
  },
  {
    question: "Hangi değişiklikler işaretleniyor?",
    answer:
      "Kira ya da ücret artışı, cezai şart, fesih ve tahliye, depozito, rekabet yasağı, süreler, hak devri ve yetkili mahkeme ile ilgili değişiklikler ayrıca uyarı olarak gösterilir.",
  },
  {
    question: "Madde numaraları kaymışsa ne olur?",
    answer:
      "Maddeler önce numarasıyla, bulunamazsa başlığıyla eşleştirilir. Yeniden numaralanan uzun sözleşmelerde bazı maddeler “eklendi” ve “çıkarıldı” olarak görünebilir; içeriği karşılaştırarak kontrol edin.",
  },
];

export default function KarsilastirPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNavbar />
      <DarkScope>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="max-w-2xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#005BEA]">Madde karşılaştırma</p>
            <ThemeToggle />
          </div>
          <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Yeni sürümde ne değişti?
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Kira yenilemesinde ya da iş teklifinde karşı tarafın gönderdiği metni eskisiyle karşılaştırın. Gözden kaçan
            bir artış ya da yeni bir cezai şart imzadan önce görünsün.
          </p>
        </header>
        <div className="mt-8">
          <ContractCompare />
        </div>
        <FaqSection faqs={FAQS} />
      </main>
      </DarkScope>
      <SiteFooter />
    </div>
  );
}
