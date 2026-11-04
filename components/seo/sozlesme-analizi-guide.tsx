import Link from "next/link";
import { buildHowToJsonLd, buildSoftwareApplicationJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

const url = absoluteUrl("/sozlesme-analizi");

const CHECKS = [
  ["Haksız ve fahiş cezai şart", "Tek taraflı, orantısız ya da tüketici aleyhine cezalar. TBK m. 179–182 ve 6502 sayılı Kanun'a göre denetlenir."],
  ["Kanuna aykırı kira artışı", "Yenileme döneminde yasal tavanı aşan artış maddeleri (TBK m. 344)."],
  ["Geçersiz olabilecek tahliye taahhüdü", "Sözleşmeyle aynı gün imzatılan, tarihi boş bırakılan taahhütnameler."],
  ["Rekabet yasağı ve gizlilik", "Süre, yer ve konu bakımından sınırsız rekabet yasakları (TBK m. 444–447)."],
  ["Fesih ve ihbar süreleri", "Kanundaki asgari süreleri kısaltan ya da tek tarafa fesih hakkı tanıyan maddeler."],
  ["Ücret, fazla mesai ve izin", "Fazla mesainin ücrete dahil sayılması, yıllık izinden feragat gibi işçi aleyhine hükümler."],
  ["Eksik maddeler", "Teslim tarihi, ödeme vadesi, uyuşmazlık yeri, depozito iadesi gibi olması gerekip olmayan hükümler."],
  ["Kişisel veri ve KVKK", "Açık rıza, aktarım ve saklama süresi bakımından eksik ya da geniş izinler."],
  ["Sorumluluk sınırlamaları", "Ağır kusurda bile sorumluluğu kaldıran ve kesin hükümsüz sayılabilecek maddeler (TBK m. 115)."],
  ["Kritik tarihler", "Bitiş, yenileme, cayma ve itiraz tarihleri; isterseniz takviminize hatırlatma olarak eklenir."],
] as const;

export const SOZLESME_ANALIZI_FAQS = [
  {
    question: "Yapay zeka ile sözleşme analizi nasıl yapılır?",
    answer:
      "Sözleşmenizi PDF, Word veya fotoğraf olarak yükleyin ya da metni yapıştırın. Clause kişisel verileri maskeler, maddeleri tek tek okur ve her riski dayandığı kanun maddesiyle gösterir. İlk özet birkaç saniyede gelir; detaylı rapor ve PDF ücretsiz hesapla açılır.",
  },
  {
    question: "Sözleşme analizi ücretli mi?",
    answer:
      "Hayır. Risk özeti kayıt gerektirmeden ücretsizdir. Ücretsiz hesapla detaylı rapor, PDF, arşiv ve tarih hatırlatmaları da açılır.",
  },
  {
    question: "Hangi sözleşmeleri analiz edebilirim?",
    answer:
      "Kira, iş, freelance ve hizmet, satış, ortaklık, gizlilik (NDA), abonelik, araç kiralama ve kredi sözleşmeleri başta olmak üzere Türkçe yazılmış her tür sözleşme.",
  },
  {
    question: "ChatGPT'ye sözleşme yapıştırmaktan farkı ne?",
    answer:
      "Genel sohbet botları Türk mevzuatındaki güncel oranları ve madde numaralarını uydurabilir; metniniz kişisel verilerle birlikte gönderilir. Clause yanıtlarını mevzuat veritabanından dayanak göstererek verir ve T.C. kimlik, telefon, IBAN gibi bilgileri göndermeden önce maskeler.",
  },
  {
    question: "Sonuç avukat görüşü yerine geçer mi?",
    answer:
      "Hayır. Clause bir ön inceleme aracıdır: neye dikkat etmeniz gerektiğini ve hangi soruları sormanız gerektiğini gösterir. Yüksek tutarlı veya imzası geri alınamayacak sözleşmelerde bir avukata danışın.",
  },
  {
    question: "Sözleşmem güvende mi, saklanıyor mu?",
    answer:
      "T.C. kimlik, telefon, e-posta ve IBAN gibi kişisel veriler yapay zekaya gönderilmeden önce tarayıcınızda maskelenir. Hesabınız varsa raporlarınız yalnızca size görünen arşivinizde tutulur.",
  },
  {
    question: "Sözleşmenin yeni versiyonunu eskisiyle karşılaştırabilir miyim?",
    answer:
      "Evet. Karşılaştırma aracı iki metin arasındaki eklenen, çıkarılan ve değişen maddeleri gösterir; karşı tarafın son anda yaptığı değişiklikleri yakalamak için idealdir.",
  },
];

export const sozlesmeAnaliziJsonLd = [
  buildSoftwareApplicationJsonLd({
    name: "Clause yapay zeka sözleşme analizi",
    description:
      "Türk mevzuatına göre sözleşme risk analizi: haksız cezai şart, eksik madde, kritik tarihler ve kanun dayanağı.",
    url,
  }),
  buildHowToJsonLd({
    name: "Yapay zeka ile sözleşme analizi nasıl yapılır?",
    description: "Clause ile sözleşmenizi ücretsiz taramanın adımları.",
    url,
    steps: [
      "Sözleşmeyi yükleyin, metni yapıştırın veya fotoğrafını çekin.",
      "Sözleşmedeki rolünüzü seçin: kiracı, ev sahibi, çalışan, serbest çalışan gibi.",
      "Risk özetini, eksik maddeleri ve kanun dayanaklarını inceleyin.",
      "Detaylı raporu PDF olarak indirin, kritik tarihleri takviminize ekleyin.",
    ],
  }),
];

export function SozlesmeAnaliziGuide() {
  return (
    <article className="prose prose-slate mt-16 max-w-3xl prose-headings:text-madde-ink prose-p:text-[15px] prose-p:leading-relaxed">
      <h2>Yapay zeka sözleşme analizi nedir?</h2>
      <p>
        Yapay zeka sözleşme analizi, bir sözleşmenin maddelerini yazılım yardımıyla tek tek okuyup sizin aleyhinize
        olabilecek hükümleri, eksik maddeleri ve önemli tarihleri çıkarmaktır. Bir avukatın ilk okumada baktığı
        noktaları dakikalar yerine saniyeler içinde gösterir. Böylece imzalamadan önce neyi pazarlık edeceğinizi,
        neyi sormanız gerektiğini bilirsiniz.
      </p>
      <p>
        Clause bu işi Türk hukukuna göre yapar. Her bulgu, dayandığı kanun maddesiyle gelir: Türk Borçlar Kanunu,
        İş Kanunu, Tüketicinin Korunması Hakkında Kanun ve KVKK başta olmak üzere mevzuat veritabanımızdan aranır.
        &quot;Bu madde riskli&quot; demekle yetinmez; neden riskli olduğunu ve nasıl düzeltilebileceğini anlatır.
      </p>

      <h2>Clause sözleşmenizde neleri kontrol eder?</h2>
      <ol>
        {CHECKS.map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {v}
          </li>
        ))}
      </ol>

      <h2>Adım adım: sözleşmenizi 1 dakikada analiz edin</h2>
      <ol>
        <li>
          <strong>Yükleyin.</strong> PDF, Word, düz metin ya da telefonla çektiğiniz fotoğraf. Fotoğraftaki yazı
          otomatik okunur.
        </li>
        <li>
          <strong>Rolünüzü seçin.</strong> Aynı madde kiracı için riskli, ev sahibi için avantajlı olabilir. Analiz sizin
          tarafınızdan yapılır.
        </li>
        <li>
          <strong>Özeti okuyun.</strong> Kritik risk sayısı, eksik maddeler ve 100 üzerinden güven skoru.
        </li>
        <li>
          <strong>Detaya inin.</strong> Her maddenin açıklaması, kanun dayanağı ve önerilen düzeltilmiş metin. Raporu PDF
          olarak indirin, tarihleri hatırlatmaya ekleyin.
        </li>
      </ol>

      <h2>Hangi sözleşmeler en çok tuzak içerir?</h2>
      <p>
        Kullanıcılarımızın en sık taradığı sözleşmeler <Link href="/kira-sozlesmesi-analizi">kira sözleşmeleri</Link>,{" "}
        <Link href="/is-sozlesmesi-analizi">iş sözleşmeleri</Link> ve serbest çalışma sözleşmeleridir. Kirada fahiş
        artış maddesi ve boş tarihli tahliye taahhüdü; iş sözleşmesinde fazla mesainin ücrete dahil sayılması ve süresiz
        rekabet yasağı; hizmet sözleşmelerinde ise tek taraflı cezai şart ve ödeme vadesinin belirsizliği en sık
        rastlanan sorunlardır. Yukarıdaki listeden sözleşme türünüzü seçerek o türe özel kontrol listesini
        görebilirsiniz.
      </p>

      <h2>Yapay zeka analizi ne zaman yeterli, ne zaman avukat gerekir?</h2>
      <p>
        Ev kiralama, iş teklifi, freelance proje veya abonelik gibi günlük sözleşmelerde ön analiz çoğu zaman neyi
        değiştirmeniz gerektiğini görmek için yeterlidir. Şirket devri, gayrimenkul satışı, yüksek tutarlı ticari
        sözleşmeler veya size dava açıldığı durumlarda Clause raporunu bir avukatla birlikte değerlendirin; rapor bu
        görüşmeyi kısaltır ve maliyetini düşürür.
      </p>

      <h2>Gizlilik</h2>
      <p>
        Sözleşmeler hassas bilgi içerir. Clause; T.C. kimlik numarası, telefon, e-posta ve IBAN gibi verileri yapay
        zekaya göndermeden önce tarayıcınızda maskeler. Ayrıntılar için <Link href="/guvenlik">güvenlik</Link> ve{" "}
        <Link href="/gizlilik">gizlilik</Link> sayfalarımıza bakabilirsiniz.
      </p>
    </article>
  );
}
