import Link from "next/link";
import { buildSoftwareApplicationJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

const ask = (q: string) => `/asistan?soru=${encodeURIComponent(q)}`;

const USES = [
  ["Sözleşme analizi", "Kira, iş ve hizmet sözleşmelerindeki riskli maddeleri kanun dayanağıyla bulur.", "/sozlesme-analizi"],
  ["Hukuki soru-cevap", "\"Ev sahibi beni çıkarabilir mi?\" gibi sorulara mevzuata dayalı, sade yanıt.", ask("Ev sahibim kirayı yüzde 60 artırmak istiyor, yasal mı?")],
  ["Dilekçe ve ihtarname", "Tüketici hakem heyeti, kira itirazı ve depozito iadesi için resmi formatta taslak.", "/dilekce-olusturucu"],
  ["Haklarım kontrolü", "İşten çıkarılma, kira, tüketici sorunlarında hak, alacak ve süreleri hesaplar.", "/haklarim/kontrol"],
  ["Gelen mektuba cevap", "İhtarname, icra ya da işveren yazısına verilecek cevabın taslağı.", "/cevap-taslagi"],
  ["Hesaplama araçları", "Kıdem, ihbar, işsizlik maaşı, kira artışı ve brüt-net hesapları.", "/araclar"],
] as const;

export const YAPAY_ZEKA_HUKUK_FAQS = [
  {
    question: "Legal AI (hukuk yapay zekası) nedir?",
    answer:
      "Legal AI, hukuki metinleri okuyup anlayan, mevzuat ve içtihat içinde arama yapan ve bunlara dayanarak soru yanıtlayan ya da belge hazırlayan yapay zeka sistemleridir. Avukatların araştırma süresini kısaltır; avukatı olmayan kişilerin de haklarını anlamasını kolaylaştırır.",
  },
  {
    question: "Yapay zeka avukatın yerini alır mı?",
    answer:
      "Hayır. Yapay zeka araştırma, ilk okuma ve taslak hazırlamada çok hızlıdır; ancak dava stratejisi, temsil ve sorumluluk avukatındır. Clause, sorunu anlamanıza ve avukatla daha kısa, daha verimli görüşmenize yardım eder.",
  },
  {
    question: "Yapay zekanın verdiği hukuki bilgi güvenilir mi?",
    answer:
      "Genel sohbet botları kanun maddesi ve oran uydurabilir. Clause bu riski azaltmak için yanıtlarını mevzuat veritabanından bulduğu maddelere dayandırır ve kaynağını gösterir. Yine de önemli kararlardan önce resmi kaynaktan ya da bir hukukçudan teyit alın.",
  },
  {
    question: "Clause ücretsiz mi?",
    answer:
      "Sözleşme taraması, dilekçe şablonları, haklarım kontrolü ve hesaplama araçları ücretsizdir. Hukuk asistanı ücretsiz hesapla kullanılır; daha yüksek kullanım için Plus üyelik vardır.",
  },
  {
    question: "Hukuki sorumu yapay zekaya nasıl sormalıyım?",
    answer:
      "Olayı tarih sırasıyla, tutarları ve belgeleri belirterek anlatın; ne istediğinizi son cümlede yazın. Örneğin: 'Mart 2024'te 3 yıllık kira sözleşmesi imzaladım, ev sahibi Ekim'de %60 artış istiyor, ne yapabilirim?'",
  },
];

export const yapayZekaHukukJsonLd = buildSoftwareApplicationJsonLd({
  name: "Clause — yapay zeka hukuk asistanı",
  description:
    "Türk hukukuna göre çalışan ücretsiz yapay zeka hukuk asistanı: sözleşme analizi, hukuki soru-cevap, dilekçe ve hak hesaplama.",
  url: absoluteUrl("/yapay-zeka-hukuk"),
});

export function YapayZekaHukukGuide() {
  return (
    <article className="prose prose-slate mt-16 max-w-3xl prose-headings:text-madde-ink prose-p:text-[15px] prose-p:leading-relaxed">
      <h2>Hukukta yapay zeka: herkes için ilk hukuki yardım</h2>
      <p>
        Türkiye&apos;de bir sözleşmeyi okutmak, basit bir dilekçe yazdırmak ya da &quot;haklı mıyım?&quot; sorusuna cevap
        almak çoğu zaman pahalı ve yavaştır. Hukuk yapay zekası bu ilk adımı herkes için erişilebilir hâle getirir:
        sorunuzu kendi cümlelerinizle yazarsınız, saniyeler içinde mevzuata dayalı bir yanıt ve yapılacakların listesini
        alırsınız.
      </p>
      <p>
        Clause, Türk hukuku için geliştirilmiş bir legal AI asistanıdır. Avukatlara yönelik araştırma platformlarından
        farklı olarak <strong>avukat olmayan kişiler</strong> için tasarlandı: kiracı, çalışan, serbest çalışan, tüketici
        ve küçük işletme sahipleri için sade bir dil kullanır, her yanıtta dayandığı kanun maddesini gösterir.
      </p>

      <h2>Clause yapay zeka ile neler yapabilirsiniz?</h2>
      <div className="not-prose grid gap-3 sm:grid-cols-2">
        {USES.map(([k, v, href]) => (
          <Link
            key={k}
            href={href}
            className="rounded-xl border border-slate-200 p-4 transition hover:border-[#005BEA] hover:shadow-sm"
          >
            <p className="font-semibold text-slate-900">{k}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{v}</p>
          </Link>
        ))}
      </div>

      <h2>Hukuk yapay zekası nasıl çalışır?</h2>
      <p>
        Clause&apos;un arkasında üç katman vardır. Birincisi <strong>mevzuat veritabanıdır</strong>: Türk Borçlar
        Kanunu, İş Kanunu, Tüketicinin Korunması Hakkında Kanun, KVKK ve ilgili yönetmelikler madde madde aranabilir
        durumdadır. İkincisi <strong>arama katmanıdır</strong>: sorunuz hem anlam benzerliğiyle hem de kelime
        eşleşmesiyle aranır, böylece &quot;kira zammı&quot; diye soran biri TBK m. 344&apos;e ulaşır. Üçüncüsü{" "}
        <strong>dil modelidir</strong>: bulunan maddeleri okuyup sizin olayınıza uygulayan, sade bir yanıt yazan katman.
      </p>
      <p>
        Bu yapıya &quot;kaynağa dayalı üretim&quot; denir. Genel amaçlı sohbet botlarından en önemli farkı, yanıtın
        uydurma değil bulunan maddeye dayanması ve hangi maddeye dayandığını size göstermesidir.
      </p>

      <h2>Yapay zeka mı, avukat mı?</h2>
      <p>
        İkisi birbirinin rakibi değil. Yapay zeka; sorunu tanımlamak, haklarınızı öğrenmek, süreleri hesaplamak,
        sözleşmeyi ilk kez okumak ve basit başvurular hazırlamak için idealdir. Dava açmak, size açılan bir davaya cevap
        vermek, yüksek tutarlı bir anlaşma yapmak veya ceza soruşturması gibi durumlarda ise bir avukata ihtiyacınız
        vardır. Clause raporunu görüşmeye götürmek, avukatınızın konuyu daha hızlı anlamasını sağlar. Geliri düşük olanlar
        barolardaki adli yardım bürolarından ücretsiz destek alabilir.
      </p>

      <h2>Güvenlik ve gizlilik</h2>
      <p>
        Hukuki sorunlar kişiseldir. Clause; T.C. kimlik, telefon, e-posta ve IBAN gibi verileri yapay zekaya gitmeden
        önce maskeler. Ayrıntılar <Link href="/guvenlik">güvenlik</Link> sayfamızda.
      </p>

      <h2>Hemen deneyin</h2>
      <p>
        Bir sözleşmeniz varsa <Link href="/sozlesme-analizi">ücretsiz sözleşme analizi</Link> ile başlayın. Bir sorunuz
        varsa <Link href={ask("Merhaba, hukuki bir sorum var: ")}>hukuk asistanına sorun</Link>. Bir başvuru yapmanız
        gerekiyorsa <Link href="/dilekce-olusturucu">yapay zeka ile dilekçe yazın</Link>.
      </p>
    </article>
  );
}
