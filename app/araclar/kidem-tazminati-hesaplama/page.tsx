import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { KidemTazminatiCalculator } from "@/components/growth/severance-calculators";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  KIDEM_IHBAR_TOOL_PATH,
  KIDEM_TAZMINATI_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";
import { buildFaqJsonLd, buildHowToJsonLd } from "@/lib/seo/faq-schema";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = KIDEM_TAZMINATI_TOOL_PATH;
const canonical = absoluteUrl(KIDEM_TAZMINATI_TOOL_PATH);
const title = "Kıdem tazminatı hesaplama 2026 — ücretsiz tahmini araç";

export const metadata: Metadata = {
  title,
  description:
    "2026 kıdem tazminatı hesaplama: brüt maaş ve çalışma süresiyle tahmini tutar, güncel tavan (73.729,87 TL), hak kazanma şartları ve örnek hesaplar.",
  keywords: [
    "kıdem tazminatı hesaplama",
    "kıdem tazminatı hesapla",
    "işten çıkarılma tazminatı",
    "kıdem hesaplama 2026",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Ücretsiz kıdem tazminatı tahmini — bilgilendirme amaçlı.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, "Kıdem tazminatı hesaplama — ücretsiz araç."),
};

const howToLd = buildHowToJsonLd({
  name: "Kıdem tazminatı hesaplama",
  description: "Brüt aylık ücret ve çalışma yılı ile tahmini kıdem tazminatı.",
  url: canonical,
  steps: [
    "Brüt aylık ücretinizi girin.",
    "Toplam çalışma sürenizi (yıl) yazın.",
    "Tahmini kıdem tutarını görün; iş sözleşmenizi AI ile kontrol edin.",
  ],
});

const faqs = [
  {
    question: "2026 kıdem tazminatı tavanı ne kadar?",
    answer:
      "1 Ocak – 30 Haziran 2026 döneminde 64.948,77 TL, 1 Temmuz – 31 Aralık 2026 döneminde 73.729,87 TL'dir. Tavan, fesih tarihindeki tutara göre uygulanır; brüt ücretiniz tavanı aşıyorsa her yıl için en fazla tavan tutarı ödenir.",
  },
  {
    question: "Kıdem tazminatı almak için kaç yıl çalışmak gerekir?",
    answer:
      "Aynı işverene bağlı olarak en az 1 yıl çalışmış olmak gerekir. 1 yılı aşan süreler (ay ve gün) de orantılı olarak hesaba katılır.",
  },
  {
    question: "İstifa edersem kıdem tazminatı alabilir miyim?",
    answer:
      "Kural olarak hayır. Ancak haklı nedenle fesih (ör. ücretin ödenmemesi, mobbing — İş Kanunu m. 24), emeklilik veya yaş dışındaki şartları tamamlama, askerlik ve kadın işçinin evlilikten itibaren 1 yıl içinde ayrılması gibi durumlarda istifa edilse de kıdem hakkı doğar.",
  },
  {
    question: "Kıdem tazminatından hangi kesintiler yapılır?",
    answer:
      "Kıdem tazminatından gelir vergisi ve SGK primi kesilmez; yalnızca damga vergisi (binde 7,59) kesilir. Tavanı aşan kısım için vergi istisnası uygulanmaz.",
  },
  {
    question: "Kıdem tazminatı hesabına hangi ödemeler dahil edilir?",
    answer:
      "Çıplak brüt ücrete ek olarak düzenli ödenen yol, yemek, ikramiye, prim gibi para ve parayla ölçülebilen menfaatler giydirilmiş ücrete eklenir. Arızi ödemeler (bir kerelik prim gibi) genellikle dahil edilmez.",
  },
];

const faqLd = buildFaqJsonLd(faqs);

export default function KidemTazminatiHesaplamaPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Kıdem tazminatı hesaplama", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Kıdem tazminatı hesaplama
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Tahmini sonuç — kıdem tavanı ve fesih türü sonucu değiştirir. Kıdem +
            ihbar + istifaya zorlama kontrol listesi için{" "}
            <Link
              href="/araclar/kidem-ihbar-tazminati-hesaplama"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              birleşik tazminat hub
            </Link>
            ;{" "}
            <Link href="/haklarim/isten-atildim-haklarim" className="font-semibold text-[#005BEA] hover:underline">
              işten atıldım haklarım
            </Link>{" "}
            rehberine bakın.
          </p>
        </header>
        <KidemTazminatiCalculator analyticsToolId="kidem_severance_page" analyticsSurface="tool_page" />
        <section className="prose prose-slate mt-12 max-w-none">
          <h2>Kıdem tazminatı nasıl hesaplanır?</h2>
          <p>
            Kıdem tazminatı, 1475 sayılı İş Kanunu&apos;nun hâlâ yürürlükte olan 14. maddesine
            göre hesaplanır: işçiye her tam çalışma yılı için <strong>30 günlük giydirilmiş
            brüt ücret</strong> tutarında ödeme yapılır. Bir yıldan artan süreler (ay ve gün)
            için de aynı oranda ödeme yapılır.
          </p>
          <p>Formül kısaca şöyledir:</p>
          <p>
            <strong>
              Kıdem tazminatı = Giydirilmiş brüt ücret × (Toplam çalışma günü ÷ 365) − Damga
              vergisi
            </strong>
          </p>
          <p>
            Giydirilmiş ücret; çıplak brüt maaşa düzenli olarak ödenen yol, yemek, ikramiye ve
            benzeri yardımların aylık karşılığı eklenerek bulunur. Hesaplanan aylık ücret
            yasal tavanı aşıyorsa, her yıl için tavan tutarı esas alınır.
          </p>

          <h2>2026 kıdem tazminatı tavanı</h2>
          <ul>
            <li>
              <strong>1 Ocak – 30 Haziran 2026:</strong> 64.948,77 TL
            </li>
            <li>
              <strong>1 Temmuz – 31 Aralık 2026:</strong> 73.729,87 TL
            </li>
          </ul>
          <p>
            Hangi tavanın uygulanacağını işe giriş tarihi değil, <strong>iş sözleşmesinin
            sona erdiği tarih</strong> belirler.
          </p>

          <h2>Örnek hesaplama</h2>
          <p>
            Brüt maaşı 45.000 TL olan, düzenli olarak ayda 5.000 TL yemek ve yol yardımı alan ve
            Ekim 2026&apos;da 4 yıl 6 ay kıdemle işten çıkarılan bir çalışan düşünelim:
          </p>
          <ul>
            <li>Giydirilmiş brüt ücret: 45.000 + 5.000 = 50.000 TL (tavanın altında)</li>
            <li>Kıdem süresi: 4,5 yıl</li>
            <li>Brüt kıdem tazminatı: 50.000 × 4,5 = 225.000 TL</li>
            <li>Damga vergisi (binde 7,59): yaklaşık 1.708 TL</li>
            <li>
              <strong>Tahmini net kıdem tazminatı: yaklaşık 223.292 TL</strong>
            </li>
          </ul>
          <p>
            Aynı çalışanın giydirilmiş ücreti 90.000 TL olsaydı, hesap tavan üzerinden
            yapılırdı: 73.729,87 × 4,5 ≈ 331.784 TL brüt.
          </p>

          <h2>Kimler kıdem tazminatı alabilir?</h2>
          <p>Aynı işverende en az 1 yıl çalışmış olmak şartıyla:</p>
          <ul>
            <li>İşveren tarafından haklı bir neden olmadan işten çıkarılanlar</li>
            <li>
              Haklı nedenle iş sözleşmesini fesheden işçiler (ücretin ödenmemesi, mobbing,
              sağlık sebepleri — İş Kanunu m. 24)
            </li>
            <li>Emekliliğe hak kazanan veya yaş dışındaki emeklilik şartlarını tamamlayanlar</li>
            <li>Muvazzaf askerlik nedeniyle işten ayrılanlar</li>
            <li>Evlendikten sonra 1 yıl içinde kendi isteğiyle ayrılan kadın işçiler</li>
            <li>Ölüm halinde işçinin yasal mirasçıları</li>
          </ul>
          <p>
            Ahlak ve iyi niyet kurallarına aykırı davranış nedeniyle (İş Kanunu m. 25/II)
            işten çıkarılanlar ve haklı bir neden olmadan istifa edenler kural olarak kıdem
            tazminatı alamaz.
          </p>

          <h2>Kıdem ve ihbar tazminatı farkı</h2>
          <p>
            Kıdem tazminatı çalışma süresine bağlı bir alacaktır. İhbar tazminatı ise
            sözleşmeyi feshederken yasal bildirim süresine uymayan tarafın ödediği tazminattır.
            İşten çıkarılan bir çalışan çoğu zaman ikisini birlikte talep edebilir. İkisini
            birlikte hesaplamak için{" "}
            <Link href={KIDEM_IHBAR_TOOL_PATH}>kıdem ve ihbar tazminatı hesaplama</Link>{" "}
            aracını kullanabilirsiniz.
          </p>

          <h2>İşveren ödemezse ne yapılır?</h2>
          <p>
            Kıdem tazminatı alacakları için dava açmadan önce arabulucuya başvurmak zorunludur.
            Zamanaşımı süresi iş sözleşmesinin sona ermesinden itibaren 5 yıldır. Fesih
            nedenini gösteren belgeleri, bordroları ve banka dökümlerini saklayın.{" "}
            <Link href="/is-sozlesmesi-analizi">İş sözleşmesi analizi</Link> ile fesih ve
            tazminat maddelerini kontrol edebilirsiniz.
          </p>

          <h2>Sık sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.question}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}

          <p className="text-xs text-slate-500">
            Bu sayfadaki hesaplamalar bilgilendirme amaçlı tahminlerdir; hukuki danışmanlık
            yerine geçmez. Tavan tutarları 2026 yılı resmi verilerine göre güncellenmiştir.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
