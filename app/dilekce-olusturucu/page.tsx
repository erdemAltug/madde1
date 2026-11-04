import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { DilekceWizard } from "@/components/growth/dilekce-wizard";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { RelatedToolsSection } from "@/components/seo/related-tools-section";
import { TrackToolOpen } from "@/components/analytics/track-tool-open";
import { DILEKCE_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import {
  buildHowToJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo/faq-schema";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = DILEKCE_TOOL_PATH;
const canonical = absoluteUrl(path);
const title = "Yapay zeka ile dilekçe yazma 2026 — ücretsiz AI dilekçe oluşturucu";
const description =
  "Yapay zeka ile dilekçe ve ihtarname yazın: tüketici hakem heyeti, kira zammı itirazı, depozito iadesi ve daha fazlası. Resmi formatta taslak, örnek dilekçe ve adım adım rehber. Ücretsiz.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "yapay zeka ile dilekçe yazma",
    "hukuk dilekçe yazma yapay zeka",
    "ai dilekçe oluşturucu",
    "dilekçe yazma programı",
    "otomatik dilekçe yazma",
    "ücretsiz dilekçe hazırlama",
    "tüketici hakem heyeti dilekçe",
    "ihtarname örneği",
    SITE_NAME,
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: canonical,
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

const assistantLink = (q: string) => `/asistan?soru=${encodeURIComponent(q)}`;

const PETITION_TYPES = [
  {
    name: "Tüketici hakem heyeti başvurusu",
    text: "Ayıplı ürün, iade edilmeyen para, iptal edilmeyen abonelik. Parasal sınırın altındaki uyuşmazlıklarda avukatsız ve harçsız başvurulur.",
    href: "/rehber/internetten-alinan-urun-iade-edilmezse",
  },
  {
    name: "Kira zammı itirazı ve ihtarname",
    text: "Yasal tavanın üzerindeki artış talebine yazılı itiraz; ev sahibine noter veya e-posta yoluyla gönderilecek ihtar metni.",
    href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  },
  {
    name: "Depozito iadesi talebi",
    text: "Tahliyeden sonra iade edilmeyen depozito için süre veren yazılı talep; ardından arabuluculuk ve dava yolu.",
    href: "/blog/depozito-iadesi-yazili-ihtar-ornek",
  },
  {
    name: "İşçilik alacakları için arabuluculuk başvurusu",
    text: "Kıdem, ihbar, fazla mesai ve izin ücreti talepleri. Dava açmadan önce arabulucuya başvurmak zorunludur.",
    href: assistantLink("İşten çıkarıldım, kıdem ve ihbar tazminatı için arabuluculuk başvuru dilekçesi yazar mısın?"),
  },
  {
    name: "Abonelik ve sözleşme iptal bildirimi",
    text: "Spor salonu, internet, dijital platform aboneliklerinde cayma veya fesih bildirimi.",
    href: "/rehber/dijital-abonelik-otomatik-yenileme-iptal",
  },
  {
    name: "Kurum ve şirketlere şikâyet/talep dilekçesi",
    text: "Belediye, okul, banka veya işverene yazılı başvuru; bilgi edinme ve KVKK başvuruları.",
    href: assistantLink("KVKK kapsamında bir şirkete kişisel verilerimin silinmesi için başvuru dilekçesi yazar mısın?"),
  },
];

const SECTIONS = [
  ["Başlık (merci)", "Dilekçenin verileceği yer büyük harfle yazılır: \"İSTANBUL TÜKETİCİ HAKEM HEYETİ BAŞKANLIĞI'NA\" gibi. Yanlış merci en sık ret nedenlerindendir."],
  ["Taraflar", "Başvuran ve karşı tarafın adı, T.C. kimlik numarası (başvuranın), adresi. Şirketlerde ticari unvan ve adres yeterlidir."],
  ["Konu", "Tek cümlede ne istediğiniz: \"Ayıplı ürün bedelinin iadesi talebidir.\""],
  ["Açıklamalar", "Olayların tarih sırasıyla, numaralı paragraflarla anlatımı. Duygusal ifadeler yerine tarih, tutar ve belge."],
  ["Hukuki nedenler", "Dayandığınız kanun: 6502 sayılı Tüketicinin Korunması Hakkında Kanun, 6098 sayılı TBK, 4857 sayılı İş Kanunu gibi."],
  ["Deliller", "Fatura, sözleşme, yazışma, fotoğraf, banka dekontu. Ekte numaralandırılarak sunulur."],
  ["Sonuç ve istem", "Merciden tam olarak ne istediğiniz: bedel iadesi, ürün değişimi, faiziyle ödeme."],
  ["Tarih, ad soyad, imza", "Islak ya da e-imza. Ekler listesi en alta yazılır."],
] as const;

const faqs = [
  {
    question: "Yapay zeka ile yazılan dilekçe geçerli mi?",
    answer:
      "Dilekçenin geçerliliği kimin yazdığına değil; doğru merciye, doğru formatta ve gerekli bilgilerle verilmesine bağlıdır. Clause'un ürettiği metin bir taslaktır: bilgilerinizi kontrol edip imzaladığınızda sizin dilekçeniz olur. Yüksek tutarlı veya süreli işlerde avukata göstermenizi öneririz.",
  },
  {
    question: "Ücretli mi, kayıt gerekiyor mu?",
    answer:
      "Hazır dilekçe taslakları ücretsizdir ve kayıt istemez. Kendi olayınıza göre yapay zeka asistanıyla uzun ve kişisel bir dilekçe yazdırmak için ücretsiz hesap açmanız yeterlidir.",
  },
  {
    question: "ChatGPT ile dilekçe yazmaktan farkı ne?",
    answer:
      "Genel sohbet botları Türk mevzuatındaki güncel süreleri, parasal sınırları ve madde numaralarını uydurabilir. Clause yanıtlarını mevzuat veritabanından dayanak göstererek verir, resmi dilekçe bölümlerine göre yazar ve kişisel verileri göndermeden önce maskeler.",
  },
  {
    question: "Dilekçeyi nereye ve nasıl veririm?",
    answer:
      "Tüketici hakem heyeti başvuruları e-Devlet üzerinden çevrim içi yapılabilir. Mahkemelere UYAP Vatandaş Portalı'ndan e-imza ile veya adliyedeki ön büroya elden verilir. İhtarname ise genellikle noter aracılığıyla gönderilir.",
  },
  {
    question: "Avukatsız dilekçe verebilir miyim?",
    answer:
      "Evet. Tüketici hakem heyeti, arabuluculuk başvurusu ve birçok idari başvuru avukatsız yapılabilir. Dava sürecinde de avukat zorunlu değildir; ancak karmaşık ve yüksek tutarlı uyuşmazlıklarda hukuki destek almanız haklarınızı korur.",
  },
  {
    question: "İnternetten aldığım ürün bozuk, satıcı iade etmiyor — ne yapmalıyım?",
    answer:
      "Önce satıcıya yazılı ayıp bildirimi yapın. Sonuç alamazsanız tutar parasal sınırın altındaysa tüketici hakem heyetine, üzerindeyse tüketici mahkemesine başvurursunuz. Bu sayfadaki tüketici şablonu başvuru metnini hazırlar; güncel parasal sınırı resmi kaynaktan kontrol edin.",
  },
  {
    question: "Kişisel verilerim güvende mi?",
    answer:
      "Hazır şablonlar tarayıcınızda doldurulur ve sunucuya gönderilmez. Asistan kullanırken T.C. kimlik, telefon ve IBAN gibi bilgiler yapay zekaya gitmeden önce maskelenir.",
  },
  {
    question: "Hangi süreleri kaçırmamalıyım?",
    answer:
      "Ayıplı malda iki yıllık zamanaşımı, işe iade için fesihten itibaren bir ay içinde arabulucuya başvuru ve icra takibine itiraz için ödeme emrinin tebliğinden itibaren yedi gün en sık kaçırılan sürelerdir. Clause dilekçenizdeki tarihleri hatırlatma takvimine ekleyebilir.",
  },
];

const howToLd = buildHowToJsonLd({
  name: "Yapay zeka ile dilekçe nasıl yazılır?",
  description: "Clause ile resmi formatta dilekçe ve ihtarname taslağı hazırlama adımları.",
  url: canonical,
  steps: [
    "Dilekçe türünü seçin (tüketici, kira, depozito) veya olayınızı asistana kendi cümlelerinizle anlatın.",
    "Taraflar, tarih ve tutar gibi bilgileri girin; kişisel veriler maskelenir.",
    "Resmi bölümlere ayrılmış taslağı kopyalayın, kontrol edip imzalayın ve ilgili merciye verin.",
  ],
});
const appLd = buildSoftwareApplicationJsonLd({
  name: "Clause AI dilekçe oluşturucu",
  description,
  url: canonical,
});

export default function DilekceOlusturucuPage() {
  return (
    <div className="min-h-screen bg-white pb-28">
      {[howToLd, appLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <TrackToolOpen tool="dilekce_olusturucu" />
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/araclar" },
            { name: "Yapay zeka ile dilekçe yazma", href: path },
          ]}
        />
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Ücretsiz · Kayıt gerekmez · Resmi format
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Yapay zeka ile dilekçe yazın
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Hazır şablonla 10 saniyede taslak alın ya da olayınızı kendi cümlelerinizle anlatın; Clause hukuk
            asistanı mevzuata dayanarak, resmi bölümleriyle dilekçenizi yazsın.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#sablon"
              className="rounded-lg bg-[#005BEA] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004bc2]"
            >
              Hazır şablonla başla
            </a>
            <Link
              href={assistantLink("Bana bir dilekçe yazar mısın? Olayım şu: ")}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Olayımı anlatıp yapay zekaya yazdır
            </Link>
          </div>
        </header>

        <section id="sablon" className="scroll-mt-24">
          <DilekceWizard />
        </section>

        <article className="prose prose-slate mt-14 max-w-none prose-headings:text-madde-ink prose-p:text-[15px] prose-p:leading-relaxed">
          <h2>Yapay zeka ile dilekçe yazma nasıl çalışır?</h2>
          <ol>
            <li>
              <strong>Türü seçin ya da anlatın.</strong> Tüketici, kira ve depozito için hazır şablonlar var. Başka bir
              konu için olayı asistana düz bir dille yazmanız yeterli: &quot;Spor salonu üyeliğimi iptal etmiyorlar&quot;
              gibi.
            </li>
            <li>
              <strong>Eksik bilgileri tamamlayın.</strong> Asistan tarih, tutar, karşı taraf gibi eksikleri sorar.
              T.C. kimlik, telefon ve IBAN yapay zekaya gitmeden maskelenir.
            </li>
            <li>
              <strong>Taslağı kontrol edip verin.</strong> Metin merci, taraflar, açıklamalar, hukuki nedenler, deliller
              ve sonuç-istem bölümleriyle gelir. Kopyalayın, imzalayın ve ilgili yere verin.
            </li>
          </ol>

          <h2>Hangi dilekçeleri yazabilirsiniz?</h2>
          <div className="not-prose grid gap-3 sm:grid-cols-2">
            {PETITION_TYPES.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-[#005BEA] hover:shadow-sm"
              >
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.text}</p>
              </Link>
            ))}
          </div>

          <h2>Örnek dilekçe: tüketici hakem heyeti başvurusu</h2>
          <p>
            Aşağıdaki örnek, Clause&apos;un ürettiği taslakların yapısını gösterir. Köşeli parantezli alanlar sizin
            bilgilerinizle doldurulur.
          </p>
          <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-[13px] leading-relaxed text-slate-800">{`[İL] TÜKETİCİ HAKEM HEYETİ BAŞKANLIĞI'NA

BAŞVURAN   : [Ad Soyad], T.C. [•••••••••••], [Adres]
KARŞI TARAF: [Satıcı ticari unvanı], [Adres]
KONU       : Ayıplı ürün bedelinin iadesi talebidir.

AÇIKLAMALAR:
1. [Tarih] tarihinde karşı taraftan [ürün] satın aldım; bedel olan [tutar] TL ödenmiştir (Ek-1).
2. Ürün teslimden [X] gün sonra [arıza] nedeniyle kullanılamaz hâle gelmiştir (Ek-2).
3. [Tarih] tarihinde satıcıya yazılı bildirimde bulunmama rağmen talebim karşılanmamıştır (Ek-3).

HUKUKİ NEDENLER: 6502 sayılı Tüketicinin Korunması Hakkında Kanun m. 8, 11 ve ilgili mevzuat.
DELİLLER: Fatura, yazışmalar, fotoğraflar, banka dekontu.

SONUÇ VE İSTEM: Ödediğim [tutar] TL'nin tarafıma iadesine karar verilmesini saygılarımla arz ederim.

[Tarih]                                                   [Ad Soyad — İmza]
EKLER: 1- Fatura  2- Fotoğraflar  3- Yazışmalar`}</pre>

          <h2>Bir dilekçede bulunması gereken 8 bölüm</h2>
          <dl>
            {SECTIONS.map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold text-slate-900">{k}</dt>
                <dd className="mb-3 ml-0 text-[15px] text-slate-700">{v}</dd>
              </div>
            ))}
          </dl>

          <h2>Dilekçe nereye verilir?</h2>
          <ul>
            <li>
              <strong>Tüketici hakem heyeti:</strong> e-Devlet &quot;Tüketici Şikâyeti Uygulaması&quot; üzerinden
              çevrim içi ya da il/ilçe heyetine elden.
            </li>
            <li>
              <strong>Mahkemeler:</strong> UYAP Vatandaş Portalı&apos;ndan e-imza ile veya adliyedeki ön büroya.
            </li>
            <li>
              <strong>İhtarname:</strong> Noter aracılığıyla; delil değeri en yüksek yoldur. Bazı durumlarda KEP veya
              iadeli taahhütlü posta da kullanılır.
            </li>
            <li>
              <strong>Arabuluculuk:</strong> Adliyedeki arabuluculuk bürosuna; iş ve kira uyuşmazlıklarında çoğu zaman
              dava şartıdır.
            </li>
          </ul>

          <h2>ChatGPT ile mi, Clause ile mi, avukatla mı?</h2>
          <p>
            Genel amaçlı sohbet botları akıcı metin yazar ama Türk mevzuatındaki güncel süreleri ve parasal sınırları
            uydurabilir. Clause her yanıtta dayandığı kanun maddesini gösterir ve dilekçeyi resmi bölümlerine göre
            kurar. Bir avukat ise davanın stratejisini kurar ve sizi temsil eder. Basit, düşük tutarlı başvurularda
            Clause taslağı genellikle yeterlidir; işe iade, yüksek tutarlı alacak veya size dava açıldıysa bir avukata
            danışın. Geliri düşük olanlar barolardaki adli yardım bürolarından ücretsiz destek alabilir.
          </p>
          <p>
            Dilekçe yazmadan önce sözleşmenizdeki maddeleri de kontrol etmek isterseniz{" "}
            <Link href="/araclar/sozlesme-tuzak-tarama">sözleşme tuzak taramasını</Link> ücretsiz kullanabilirsiniz.
          </p>
        </article>

        <FaqSection faqs={faqs} />
        <LegalAiDisclaimer className="mt-10" />
      </main>
      <RelatedToolsSection excludeHref={path} />
      <SiteFooter />
    </div>
  );
}
