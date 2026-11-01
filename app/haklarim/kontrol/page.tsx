import type { Metadata } from "next";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { DarkScope, ThemeToggle } from "@/components/theme/dark-scope";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { RightsCheckWizard } from "@/components/legal/rights-check-wizard";
import { getRightsScenario } from "@/lib/legal/rights-check";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Haklarım Kontrolü — 1 dakikada hak, alacak ve süre";
const description =
  "İşten mi çıkarıldınız, ev sahibi çıkın mı diyor, depozitonuz mu ödenmiyor? 4-5 soruyu yanıtlayın; haklarınızı, tahmini alacağınızı ve kaçırmamanız gereken süreleri tek sayfada görün. Ücretsiz, kayıt gerekmez.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/haklarim/kontrol") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/haklarim/kontrol"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

const FAQS = [
  {
    question: "Haklarım Kontrolü ücretli mi, kayıt gerekiyor mu?",
    answer:
      "Hayır. Sorular ve sonuç ücretsizdir, kayıt istemez. Cevaplarınız tarayıcınızda hesaplanır; sunucuya gönderilmez.",
  },
  {
    question: "Hesaplanan tazminat kesin mi?",
    answer:
      "Hayır, tahminidir. Kıdem tavanı ve kira artış oranı gibi resmi rakamlar güncel dönemle hesaplanır; ancak prim, ikramiye, fesih sebebi gibi ayrıntılar sonucu değiştirebilir.",
  },
  {
    question: "Dava açmadan önce ne yapmalıyım?",
    answer:
      "İş ve kira uyuşmazlıklarının çoğunda dava açmadan önce arabulucuya başvurmak zorunludur. Arabuluculuk bürosuna adliyeden ücretsiz başvurabilirsiniz.",
  },
  {
    question: "Avukata ne zaman gitmeliyim?",
    answer:
      "Size dava dilekçesi ya da icra emri geldiyse, işe iade düşünüyorsanız veya alacak tutarı yüksekse bir avukata danışın. Geliri düşük olanlar baroların adli yardım bürolarından ücretsiz destek alabilir.",
  },
];

type Props = { searchParams?: { durum?: string } };

export default function HaklarimKontrolPage({ searchParams }: Props) {
  const initial = getRightsScenario(searchParams?.durum)?.id;

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNavbar />
      <DarkScope>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: "Haklarım", href: "/haklarim" },
            { name: "Haklarım Kontrolü", href: "/haklarim/kontrol" },
          ]}
        />
        <header className="max-w-2xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#005BEA]">Haklarım Kontrolü</p>
            <ThemeToggle />
          </div>
          <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Haklarınızı 1 dakikada öğrenin
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Birkaç soruyu yanıtlayın. Hangi haklarınız olduğunu, tahmini alacağınızı ve kaçırmamanız gereken süreleri
            sade bir dille gösterelim. Cevaplarınız cihazınızda kalır.
          </p>
        </header>

        <section className="mt-8">
          <RightsCheckWizard initialScenario={initial} />
        </section>

        <FaqSection faqs={FAQS} />
      </main>
      </DarkScope>
      <SiteFooter />
    </div>
  );
}
