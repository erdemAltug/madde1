import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { KiraAnaliziCalculator } from "@/components/growth/kira-analizi-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { KIRA_ANALIZI_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = KIRA_ANALIZI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "Ev sahibi yüzde kaç zam yapabilir? — Kira analizi & cevap metni";
const description =
  "Ev sahibinin istediği kira zammını TÜFE yasal tavanıyla karşılaştırın. TBK 344 bağlamında haklı/haksız uyarısı ve WhatsApp / e-posta cevap taslağı — ücretsiz.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ev sahibi yüzde kaç zam yapabilir",
    "kira artışı yasal tavan",
    "TBK 344",
    "kira zammı hesaplama",
    "ev sahibine cevap metni",
    "kiracı hakları",
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
  name: "Kira zammı yasal tavan analizi",
  description:
    "Mevcut kira, talep edilen kira ve TÜFE tavanı ile yasal üst sınırı hesaplama.",
  url: canonical,
  steps: [
    "Mevcut kiranızı ve ev sahibinin istediği tutarı girin.",
    "TÜİK’ten güncel TÜFE 12 aylık ortalama oranını yazın.",
    "Yasal tavan aşıldı mı rozetini ve hazır cevap metnini kullanın.",
  ],
});

const faqs = [
  {
    question: "Ev sahibi yüzde kaç zam yapabilir?",
    answer:
      "Konut ve çatılı işyeri kiralarında yenilenen dönem artışı kural olarak TÜFE’nin on iki aylık ortalamalarına göre değişim oranını aşamaz (TBK m. 344). Sözleşme daha düşük bir oran öngörmüşse o oran uygulanır. Güncel oranı TÜİK’ten teyit edin.",
  },
  {
    question: "Ev sahibi kiraya %100 zam yaptı, ne yapmalıyım?",
    answer:
      "Önce yasal tavanı hesaplayın. Aşıyorsa yazılı olarak itiraz edin, ödeme yapacaksanız çekince koyun, sözleşmeyi ve yazışmaları saklayın. Baskı veya tahliye tehdidi varsa avukata danışın. Bu araç hazır cevap taslağı üretir; noter ihtarı veya dava yerine geçmez.",
  },
  {
    question: "TÜFE mi ÜFE mi esas alınır?",
    answer:
      "Kanundaki ölçüt tüketici fiyat endeksinin (TÜFE) on iki aylık ortalamalara göre değişimidir. ÜFE bu hesabın yasal ölçütü değildir.",
  },
  {
    question: "Bir yıllık süre dolmadan zam istenebilir mi?",
    answer:
      "Yenileme dönemine bağlıdır. Sözleşme başlangıcı veya son artıştan bir yıl dolmadan talep gelirse süre ve bildirim şartlarını kontrol edin; şüphede avukat görüşü alın.",
  },
];

export default function KiraAnaliziPage() {
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
            { name: "Kira analizi", href: path },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Günlük hukuk · Kiracı
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Ev sahibi fazla zam mı istedi?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Mevcut kiranızı, istenen zammı ve TÜFE tavanını girin. Yasal üst
            sınırı, haklı/haksız uyarısını ve ev sahibine atılacak cevap
            metnini anında alın.{" "}
            <Link
              href="/sozlesme-analizi/kira-sozlesmesi-analizi"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              Kira sözleşmesi AI taraması
            </Link>
            .
          </p>
        </header>

        <KiraAnaliziCalculator />

        <article className="prose prose-slate mt-12 max-w-none prose-p:text-[15px] prose-p:leading-relaxed">
          <h2>Bu araç ne işe yarar?</h2>
          <p>
            Sıradan kullanıcı TBK madde numarasıyla değil, “ev sahibi %100 zam
            istedi” sorusuyla gelir. Bu mikro araç tam da o anı yakalar: sayılar
            girilir, yasal tavanla karşılaştırılır, kopyalanabilir cevap üretilir.
            Sonraki adım kira sözleşmesinin tam metin AI analizi ve gerekirse
            kayıtlı PDF / dilekçe akışıdır.
          </p>
          <h2>İlgili araçlar</h2>
          <p>
            <Link href="/araclar/kira-sozlesmesi-artis-orani-hesaplama">
              Klasik kira artış oranı hesaplama
            </Link>
            ,{" "}
            <Link href="/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol">
              tahliye taahhütnamesi ön kontrol
            </Link>{" "}
            ve{" "}
            <Link href="/rehber/kira-artisi-haklari">kira artışı hakları rehberi</Link>
            .
          </p>
        </article>

        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <SiteFooter />
    </div>
  );
}
