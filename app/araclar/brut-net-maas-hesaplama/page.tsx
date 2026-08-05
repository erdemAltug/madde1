import type { Metadata } from "next";
import Link from "next/link";
import { SalaryCalculator } from "@/components/growth/salary-calculator";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import {
  BRUT_NET_MAAS_TOOL_PATH,
  FAZLA_MESAI_TOOL_PATH,
  KIDEM_TAZMINATI_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = BRUT_NET_MAAS_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Brüt net maaş hesaplama 2026 — 12 aylık ücretsiz bordro";
const description =
  "2026 brüt maaştan net maaş hesaplama: SGK, işsizlik, kümülatif gelir vergisi, damga vergisi ve asgari ücret istisnasıyla 12 aylık ücretsiz tablo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "brüt net maaş hesaplama 2026",
    "brütten nete maaş hesaplama",
    "net maaş hesaplama",
    "maaş vergi dilimi 2026",
    "bordro hesaplama",
    "SGK kesintisi hesaplama",
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
  name: "2026 brüt net maaş hesaplama",
  description:
    "Brüt aylık ücretten SGK, işsizlik, gelir vergisi ve damga vergisi sonrası tahmini net maaş hesabı.",
  url: canonical,
  steps: [
    "Aylık brüt ücretinizi girin.",
    "Ocak-Aralık tüm yılın kesinti ve net maaş tablosunu görün.",
    "Yıllık net toplamı ve vergi dilimi nedeniyle oluşan net düşüşünü inceleyin.",
  ],
});

const faqs = [
  {
    question: "2026 brüt asgari ücret ve net asgari ücret ne kadar?",
    answer:
      "2026 brüt asgari ücret 33.030 TL, standart kesintiler sonrasında net asgari ücret 28.075,50 TL olarak açıklanmıştır. Kişisel durum ve ek ödemeler bordroyu değiştirebilir.",
  },
  {
    question: "Net maaş neden yılın ilerleyen aylarında düşebilir?",
    answer:
      "Ücret gelirinde kümülatif vergi matrahı yıl içinde büyür. Çalışan daha yüksek gelir vergisi dilimine geçtiğinde, brüt ücret değişmese bile aylık net tutar azalabilir.",
  },
  {
    question: "2026 SGK işçi kesintisi yüzde kaç?",
    answer:
      "Standart çalışan için SGK işçi payı yüzde 14, işsizlik sigortası çalışan payı yüzde 1'dir. Prime esas kazanç tavanı ve özel statüler sonucu etkileyebilir.",
  },
  {
    question: "Bu hesap bordromla birebir aynı çıkar mı?",
    answer:
      "Her zaman değil. Prim, ikramiye, yemek/yol istisnası, BES, engellilik indirimi, eksik gün, önceki işverenden taşınan matrah ve özel teşvikler fark yaratabilir. Araç genel tahmin üretir.",
  },
  {
    question: "Bordromdaki kesinti yanlış görünüyorsa ne yapmalıyım?",
    answer:
      "Brüt ücret, SGK matrahı, kümülatif vergi matrahı ve kesinti kalemlerini işverenden yazılı isteyin. Bordro ve banka ödemesi uyuşmuyorsa kayıtları koruyun; gerektiğinde mali müşavir veya iş hukuku uzmanından destek alın.",
  },
];

export default function BrutNetMaasHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Brüt net maaş hesaplama", href: path },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            2026 güncel bordro parametreleri
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Brüt net maaş hesaplama 2026
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Brüt ücretinizi girin; SGK, işsizlik, kümülatif gelir vergisi ve
            damga vergisi kesintileriyle Ocak&apos;tan Aralık&apos;a tüm yılın
            net maaş tablosunu ve yıllık toplamı tek ekranda görün.
          </p>
        </header>

        <SalaryCalculator analyticsToolId="brut_net_salary_page" />

        <article className="prose prose-slate mt-12 max-w-none prose-p:text-[15px] prose-p:leading-relaxed">
          <h2>2026 brütten nete maaş hesabında hangi kesintiler var?</h2>
          <p>
            Standart bordro hesabında çalışan SGK primi, işsizlik sigortası
            primi, gelir vergisi ve damga vergisi dikkate alınır. 2026 için
            çalışan SGK payı yüzde 14, işsizlik payı yüzde 1 ve damga vergisi
            oranı binde 7,59&apos;dur. SGK kesintisi prime esas kazanç tavanına
            kadar uygulanır.
          </p>
          <p>
            Gelir vergisi sabit bir oran değildir. Vergi matrahı yılbaşından
            itibaren birikir ve 2026 ücret tarifesindeki yüzde 15, 20, 27, 35 ve
            40 dilimlerine göre hesaplanır. Bu nedenle aynı brüt maaşın Ocak ve
            Aralık neti farklı olabilir.
          </p>

          <h2>Asgari ücret vergi istisnası nasıl uygulanır?</h2>
          <p>
            Tüm ücretlerde asgari ücret düzeyine karşılık gelen gelir ve damga
            vergisi istisnası devam eder. Gelir vergisi istisnası, asgari
            ücretin yıl içindeki kümülatif matrahına göre bazı aylarda değişir.
            Araç bu aylık istisna tutarlarını hesaba katar.
          </p>

          <h2>Bordro kontrolü neden hukuki bir konudur?</h2>
          <p>
            İş sözleşmesinde ücretin brüt mü net mi kararlaştırıldığı, düzenli
            primlerin niteliği, fazla mesai ve kesintilerin dayanağı uyuşmazlık
            çıkarabilir. Bankaya yatan tutar ile bordro farklıysa yalnızca
            toplam nete değil, her kesinti kalemine bakılmalıdır.
          </p>
          <p>
            İlgili araçlar:{" "}
            <Link href={FAZLA_MESAI_TOOL_PATH}>
              fazla mesai ücreti hesaplama
            </Link>
            ,{" "}
            <Link href={KIDEM_TAZMINATI_TOOL_PATH}>
              kıdem tazminatı hesaplama
            </Link>{" "}
            ve{" "}
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">
              iş sözleşmesi AI ön analizi
            </Link>
            .
          </p>

          <h2>2026 verilerinin kaynağı</h2>
          <p>
            Vergi dilimleri 31 Aralık 2025 tarihli 332 Seri No.lu Gelir Vergisi
            Genel Tebliği; SGK, asgari ücret ve bordro kesintileri ise 2026
            düzenlemeleri esas alınarak modellenmiştir. Mevzuat veya kişisel
            bordro koşulları değişirse sonuç farklılaşabilir.
          </p>
          <p>
            Kontrol kaynakları:{" "}
            <a
              href="https://www.ey.com/tr_tr/services/tax/sosyal-guvenlikte-gundem/sirkuler/2026/sirkuler-no-1"
              target="_blank"
              rel="noreferrer"
            >
              EY 2026 ücret vergisi tarifesi
            </a>{" "}
            ve{" "}
            <a
              href="https://www.cottgroup.com/tr/mevzuat/item/2026-yili-icin-bordrodaki-yasal-kesintiler"
              target="_blank"
              rel="noreferrer"
            >
              2026 bordro kesintileri özeti
            </a>
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
