import type { Metadata } from "next";
import Link from "next/link";
import { UnemploymentCalculator } from "@/components/growth/unemployment-calculator";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import {
  ISSIZLIK_MAASI_TOOL_PATH,
  KIDEM_TAZMINATI_TOOL_PATH,
  IHBAR_TAZMINATI_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";
import { buildHowToJsonLd } from "@/lib/seo/faq-schema";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { UNEMPLOYMENT_2026 as U } from "@/lib/legal/official-rates";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
const net = (gross: number) => gross * (1 - U.stampTaxRate);
const MIN_GROSS_BENEFIT = U.minGrossWageTry * U.benefitRate;
const MAX_GROSS_BENEFIT = U.minGrossWageTry * U.capRateOfMinWage;
const benefitFor = (avgGross: number) => Math.min(avgGross * U.benefitRate, MAX_GROSS_BENEFIT);
const EXAMPLES = [U.minGrossWageTry, 45_000, 60_000, 90_000];

const path = ISSIZLIK_MAASI_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "İşsizlik maaşı hesaplama 2026 — en az, en çok ne kadar, kaç ay?";
const description =
  `2026 işsizlik maaşı en az ${fmt(net(MIN_GROSS_BENEFIT))}, en çok ${fmt(net(MAX_GROSS_BENEFIT))} net. Brüt maaşınızı ve prim gününüzü girin; aylık tutarı, kaç ay alacağınızı ve toplamı hemen görün.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "işsizlik maaşı hesaplama 2026",
    "işsizlik maaşı ne kadar",
    "işsizlik maaşı kaç ay alınır",
    "işsizlik ödeneği hesaplama",
    "İŞKUR işsizlik maaşı",
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
  name: "2026 işsizlik maaşı hesaplama",
  description:
    "Son dört aylık ortalama prime esas kazanç ve son üç yıllık prim gününe göre işsizlik ödeneği tahmini.",
  url: canonical,
  steps: [
    "Son dört ayın ortalama brüt kazancını girin.",
    "Son üç yıldaki işsizlik sigortası prim gününü yazın.",
    "Aylık tahmini ödenek ve ödeme süresini görün.",
  ],
});

const faqs = [
  {
    question: "2026 en düşük ve en yüksek işsizlik maaşı ne kadar?",
    answer: `2026'da asgari ücretle çalışan biri için aylık işsizlik maaşı yaklaşık ${fmt(net(MIN_GROSS_BENEFIT))} nettir. Kazanç ne kadar yüksek olursa olsun aylık ödenek ${fmt(net(MAX_GROSS_BENEFIT))} neti (brüt asgari ücretin %80'i) geçemez.`,
  },
  {
    question: "İşsizlik maaşı 2026 nasıl hesaplanır?",
    answer:
      "Günlük ödenek, sigortalının son dört aylık prime esas kazancı üzerinden hesaplanan günlük ortalama brüt kazancın yüzde 40'ıdır. Aylık brüt ödenek, brüt asgari ücretin yüzde 80'ini aşamaz; damga vergisi sonrası net tutar ödenir.",
  },
  {
    question: "600 gün primi olan kaç ay işsizlik maaşı alır?",
    answer:
      "Diğer koşullar da sağlanıyorsa son üç yılda 600 gün prim ödeyenlere 180 gün, 900 gün ödeyenlere 240 gün ve 1080 gün ödeyenlere 300 gün ödenek verilebilir.",
  },
  {
    question: "Kendi isteğimle istifa edersem işsizlik maaşı alabilir miyim?",
    answer:
      "Kural olarak kendi istek ve kusuru dışında işsiz kalma koşulu aranır. Ancak haklı nedenle fesih gibi durumların niteliği ve çıkış kodu ayrıca değerlendirilmelidir; yalnızca hesaplayıcı sonucu hak kazandırmaz.",
  },
  {
    question: "İşsizlik maaşına ne zaman başvurulur?",
    answer:
      "İş sözleşmesinin sona ermesini izleyen dönemde İŞKUR'a süresi içinde başvurmak gerekir. Gecikme, mücbir sebep dışında toplam hak sahipliği süresinden düşülebilir; güncel başvuru şartlarını İŞKUR'dan doğrulayın.",
  },
  {
    question: "Kıdem ve işsizlik maaşı birlikte alınabilir mi?",
    answer:
      "Kıdem tazminatı ile işsizlik ödeneği farklı koşullara bağlı haklardır. Fesih biçimi her ikisini de etkileyebilir; kıdem alınması tek başına işsizlik ödeneğini otomatik olarak engellemez.",
  },
];

export default function IssizlikMaasiHesaplamaPage() {
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
            { name: "İşsizlik maaşı hesaplama", href: path },
          ]}
        />
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            İŞKUR formülüne göre tahmin
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            İşsizlik maaşı hesaplama 2026
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Son dört aylık ortalama brüt kazancınız ve prim gününüzle aylık
            işsizlik ödeneğini, kaç ay alınabileceğini ve tahmini toplamı görün.
          </p>
        </header>

        <UnemploymentCalculator />

        <article className="prose prose-slate mt-12 max-w-none prose-p:text-[15px] prose-p:leading-relaxed">
          <h2>2026 işsizlik maaşı ne kadar? (tablo)</h2>
          <p>
            Aylık ödenek, son dört ayın ortalama brüt kazancının %40&apos;ıdır; brüt asgari ücretin
            %80&apos;ini ({fmt(MAX_GROSS_BENEFIT)}) aşamaz. Ödenekten yalnızca damga vergisi kesilir.
          </p>
          <table>
            <thead>
              <tr>
                <th>Son 4 ay ort. brüt maaş</th>
                <th>Aylık brüt ödenek</th>
                <th>Aylık net ödenek</th>
                <th>600 gün primle 6 ay toplam (net)</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((g) => (
                <tr key={g}>
                  <td>
                    {fmt(g)}
                    {g === U.minGrossWageTry ? " (asgari ücret)" : ""}
                  </td>
                  <td>{fmt(benefitFor(g))}</td>
                  <td>{fmt(net(benefitFor(g)))}</td>
                  <td>{fmt(net(benefitFor(g)) * 6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Formül:{" "}
            <strong>aylık net ödenek = en düşük(ort. brüt × 0,40 ; brüt asgari ücret × 0,80) × (1 − 0,00759)</strong>.
            Ödeme süresi prim gününe bağlıdır: 600 gün → 6 ay, 900 gün → 8 ay, 1080 gün → 10 ay. Önceki yıllar
            (2023–2025) için aynı formül o yılın asgari ücretiyle uygulanır; bugün başvuruyorsanız 2026 rakamları
            geçerlidir.
          </p>

          <h2>İşsizlik maaşına hak kazanma şartları</h2>
          <p>
            Hesap tutarı kadar fesih nedeni de önemlidir. Kural olarak kişinin
            kendi istek ve kusuru dışında işsiz kalması, fesih öncesindeki son
            120 gün hizmet akdine tabi olması ve son üç yılda en az 600 gün
            işsizlik sigortası primi bulunması aranır. SGK çıkış kodu ile gerçek
            fesih nedeni uyuşmuyorsa somut inceleme gerekebilir.
          </p>

          <h2>İşsizlik ödeneği kaç ay ödenir?</h2>
          <p>
            Diğer koşulların da sağlanması kaydıyla 600 prim günü için 180 gün,
            900 prim günü için 240 gün ve 1080 prim günü için 300 gün ödeme
            süresi uygulanır. Başvuru gecikmesi toplam hak süresini
            etkileyebileceğinden güncel İŞKUR koşulları kontrol edilmelidir.
          </p>

          <h2>İşten çıkarılınca diğer alacaklar</h2>
          <p>
            İşsizlik ödeneği; kıdem, ihbar, kullanılmayan izin ve ödenmeyen
            ücretlerden ayrı değerlendirilir. Tahmin için{" "}
            <Link href={KIDEM_TAZMINATI_TOOL_PATH}>
              kıdem tazminatı hesaplama
            </Link>{" "}
            ve{" "}
            <Link href={IHBAR_TAZMINATI_TOOL_PATH}>
              ihbar tazminatı hesaplama
            </Link>{" "}
            araçlarını kullanabilirsiniz.
          </p>
          <p>
            Fesih maddelerini anlamak için{" "}
            <Link href="/is-sozlesmesi-analizi">
              iş sözleşmesi AI ön analizi
            </Link>{" "}
            yapabilirsiniz. Çıktılar hukuki görüş veya İŞKUR kararı değildir.
          </p>
          <p>
            Güncel başvuru ve hak sahipliği koşulları için{" "}
            <a
              href="https://www.iskur.gov.tr/is-arayan/issizlik-sigortasi/issizlik-odenegi/"
              target="_blank"
              rel="noreferrer"
            >
              İŞKUR işsizlik ödeneği sayfasını
            </a>{" "}
            kontrol edin.
          </p>
        </article>

        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <SiteFooter />
    </div>
  );
}
