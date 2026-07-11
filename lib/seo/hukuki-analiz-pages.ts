import type { HukukiAnalizPageConfig } from "./rehber-types";
import { HUKUKI_ANALIZ_EXTRA_PAGES } from "./hukuki-analiz-pages-extra";

export type { FaqItem, HukukiAnalizPageConfig } from "./rehber-types";

const PAGES: HukukiAnalizPageConfig[] = [
  {
    slug: "kira-sozlesmesi-feshi",
    title: "Kira sözleşmesi feshi",
    metaTitle: "Kira sözleşmesi feshi — süreç, haklar ve tahliye",
    metaDescription:
      "Kira sözleşmesi nasıl feshedilir? Kiracı ve ev sahibi için yasal şartlar, ihbar süreleri ve tahliye. Ücretsiz kira sözleşmesi AI analizi.",
    keywords: [
      "kira feshi",
      "kira sözleşmesi sona erdirme",
      "kiracı tahliye",
      "TBK kira feshi",
    ],
    heroTitle: "Kira sözleşmesi feshinde haklarınızı bilin",
    heroSubtitle:
      "Süre bitimi, ihbar ve tahliye — avukatsız önce temel çerçeveyi anlayın",
    problemExplanation:
      "Kira sözleşmesinin sona ermesi, taraflardan birinin veya her ikisinin iradesiyle ya da kanunda öngörülen sebeplerle gerçekleşir. Belirsiz süreli ve belirli süreli sözleşmelerde fesih kuralları farklıdır. Usule uyulmadan yapılan tahliye talepleri tazminat ve dava riski doğurur.",
    legalContext:
      "TBK'da kira süresinin bitimi, fesih bildirimi süreleri ve tahliye usulleri düzenlenmiştir. Tahliye taahhütnamesi, icra ve dava yolları birbirinden ayrı değerlendirilir. Konut kiralarında kiracı koruma ilkesi güçlüdür.",
    risks: [
      "Usulsüz fesih bildirimi nedeniyle davanın reddi veya gecikme",
      "Hukuka aykırı tahliye girişiminde tazminat yükümlülüğü",
      "Sözleşmedeki belirsiz fesih maddesine güvenip hak kaybı",
      "Tahliye taahhüdünün geçersiz sayılması riski",
    ],
    solution:
      "Kira sözleşmenizi Clause ile ücretsiz tarayın. Artış, fesih, depozito ve tahliye maddeleri ön kontrolden geçer; ardından avukatınızla paylaşabileceğiniz özet alırsınız.",
    relatedLaws: [
      { code: "TBK", article: "347", title: "Kiralananın tahliyesi" },
      { code: "TBK", article: "325", title: "Sözleşmenin sona ermesi" },
      { code: "TBK", article: "344", title: "Kira bedelinin tespiti" },
    ],
    exampleScenario: {
      title: "Örnek: Süreli sözleşme bitimi",
      situation:
        "2 yıllık konut kira sözleşmesi sona erdi. Ev sahibi kiracıya yazılı bildirim yapmadan evi boşaltmasını istedi; kiracı kalmak istiyor.",
      result:
        "Süre bitiminde tahliye koşulları sözleşme ve kanuna göre değerlendirilir. Bildirimsiz baskı hukuki tahliye yerine geçmez; kiracı haklarını koruyabilir.",
    },
    faqs: [
      {
        question: "Kiracı sözleşme bitiminde evi boşaltmazsa ne olur?",
        answer:
          "Ev sahibi yasal yolları (tahliye davası vb.) izlemek zorundadır. Zorla çıkarma yasaktır.",
      },
      {
        question: "Belirsiz süreli kira nasıl feshedilir?",
        answer:
          "Kanuni ihbar sürelerine uygun yazılı bildirim gerekir. Süreler konut ve iş yeri için farklılık gösterebilir.",
      },
      {
        question: "Kira borcu varsa hemen çıkarılır mıyım?",
        answer:
          "Borç tahliye sebebi olabilir ancak usul kuralları vardır. İhtar ve yasal süreçler gözetilmelidir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-05-01",
  },
  {
    slug: "is-cikarilma-tazminat",
    title: "İşten çıkarılma ve tazminat",
    metaTitle: "İşten çıkarılma tazminatı — haksız fesih rehberi",
    metaDescription:
      "Haksız işten çıkarılma durumunda kıdem, ihbar ve diğer alacaklar. İşçi için adım adım bilgi ve ücretsiz iş sözleşmesi analizi.",
    keywords: [
      "haksız işten çıkarma",
      "işten çıkarılma tazminatı",
      "kıdem tazminatı",
      "ihbar tazminatı",
    ],
    heroTitle: "İşten çıkarıldıysanız haklarınızı kontrol edin",
    heroSubtitle: "Fesih geçerli mi, hangi tazminatlar gündemde?",
    problemExplanation:
      "İşveren, İş Kanunu'nda sayılan geçerli sebeplere dayanmadan veya usule uymadan fesih yaparsa bu haksız fesih sayılabilir. Çalışan, kıdem ve ihbar tazminatı ile diğer alacakları talep edebilir.",
    legalContext:
      "Belirsiz süreli iş sözleşmelerinde ihbar süreleri ve fesih bildirimi şekli önemlidir. Geçerli nedenle fesih ile haklı nedenle derhal fesih ayrı kurallara tabidir.",
    risks: [
      "Fesih belgesine haksız feragat imzalamak",
      "Zamanaşımı ve süre kaçırma",
      "Kıdem tavanı ve brüt-net hesap hatası",
      "Sendika ve toplu sözleşme hükümlerini göz ardı etme",
    ],
    solution:
      "İş sözleşmenizi ve fesih bildirimini Clause ile tarayın. Fesih, rekabet yasağı ve ücret maddelerindeki riskler özetlenir.",
    relatedLaws: [
      { code: "İş Kanunu", article: "17", title: "Fesih bildirimi" },
      { code: "İş Kanunu", article: "18", title: "Geçerli sebep" },
      { code: "İş Kanunu", article: "14", title: "Kıdem tazminatı" },
    ],
    exampleScenario: {
      title: "Örnek: Performans gerekçesiyle fesih",
      situation:
        "Çalışan, yazılı performans uyarısı almadan 'verim düşük' gerekçesiyle işten çıkarıldı.",
      result:
        "Geçerli fesih ispat yükü işverendedir. Usul ve sebep yoksa haksız fesih iddiası güçlenir.",
    },
    faqs: [
      {
        question: "İşten çıkarılınca hemen tazminat alır mıyım?",
        answer:
          "Önce alacak kalemleri hesaplanır; anlaşmazlık varsa arabuluculuk ve dava yolu açılabilir.",
      },
      {
        question: "Deneme süresinde tazminat var mı?",
        answer:
          "Deneme süresi içinde bildirimsiz fesih mümkün olabilir; kötü niyet ayrı değerlendirilir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-05-01",
  },
  {
    slug: "tahliye-taahhutnamesi",
    title: "Tahliye taahhütnamesi",
    metaTitle: "Tahliye taahhütnamesi — geçerlilik ve sonuçlar",
    metaDescription:
      "Tahliye taahhütnamesi imzalayınca ne olur? Geçerlilik şartları, riskler ve ücretsiz AI ön kontrol aracı.",
    keywords: [
      "tahliye taahhütnamesi",
      "tahliye taahhüdü geçerlilik",
      "kiracı tahliye taahhüdü",
    ],
    heroTitle: "Tahliye taahhütnamesi imzalamadan önce okuyun",
    heroSubtitle: "Tek imza ile tahliye riski — usul ve içerik kontrolü",
    problemExplanation:
      "Tahliye taahhütnamesi, kiracının belirli tarihte kiralananı boşaltacağına dair yazılı beyanıdır. Usule uygun değilse icra edilemeyebilir; uygunsa ciddi sonuçlar doğurur.",
    legalContext:
      "TBK ve icra mevzuatında şekil, tarih ve irade serbestisi açısından sıkı değerlendirme yapılır. Baskı, aldatma veya bilgilendirme eksikliği geçersizlik sebebi olabilir.",
    risks: [
      "Belirsiz tarih veya adres içeren taahhüt",
      "Kira borcuna karşılık imzalatılan belirsiz taahhüt",
      "Usul dışı icra girişimi",
      "Geçerli taahhütte süresinde boşaltmama",
    ],
    solution:
      "Taahhütname metninizi ücretsiz AI ön kontrol aracımıza yapıştırın; usul ve içerik risklerini görün.",
    relatedLaws: [
      { code: "TBK", article: "347", title: "Tahliye" },
      { code: "İİK", article: "272", title: "Taahhüde dayalı icra" },
    ],
    exampleScenario: {
      title: "Örnek: Kira borcu baskısı",
      situation:
        "Kiracı, birikmiş kira borcunu ödemek için elinde tahliye taahhütnamesi imzaladı.",
      result:
        "Borç ile tahliye taahhüdü farklı konulardır. Metin ve koşullar birlikte değerlendirilmelidir.",
    },
    faqs: [
      {
        question: "Tahliye taahhütnamesi geri alınabilir mi?",
        answer:
          "Geçersizlik sebepleri varsa dava yolu açılabilir; her olayın koşulları farklıdır.",
      },
      {
        question: "WhatsApp mesajı tahliye taahhüdü sayılır mı?",
        answer:
          "Yazılı şekil şartları açısından risklidir; resmi belge düzenlenmesi tercih edilir.",
      },
    ],
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    updatedAt: "2026-05-01",
  },
  {
    slug: "sozlesme-risk-analizi",
    title: "Sözleşme risk analizi",
    metaTitle: "Sözleşme risk analizi — riskli maddeleri anlama rehberi",
    metaDescription:
      "Sözleşmedeki riskli maddeler nelerdir? Cezai şart, gizlilik, fesih ve rekabet yasağı. Ücretsiz AI sözleşme ön taraması.",
    keywords: [
      "sözleşme risk analizi",
      "kontrat riskleri",
      "sözleşme okuma",
      "riskli sözleşme maddeleri",
    ],
    heroTitle: "Sözleşmenizdeki riskleri imzadan önce görün",
    heroSubtitle: "Herkes için sözleşme okuma rehberi — avukat öncesi ön kontrol",
    problemExplanation:
      "Sözleşmeler uzun ve teknik yazılır; çoğu kişi son sayfayı imzalar. Oysa cezai şart, otomatik yenileme, tek taraflı değişiklik ve sorumluluk sınırları mali risk taşır.",
    legalContext:
      "TBK'da sözleşme özgürlüğü ve emredici kurallar birlikte işler. Tüketici sözleşmelerinde haksız şartlar ayrıca denetlenir.",
    risks: [
      "Sınırsız cezai şart ve tazminat",
      "Belirsiz otomatik yenileme",
      "Aşırı geniş gizlilik yükümlülüğü",
      "Ulaşılamaz yetkili mahkeme seçimi",
    ],
    solution:
      "Metninizi Clause'a yapıştırın; ücretsiz güven özeti ile hangi maddelerin dikkat gerektirdiğini görün.",
    relatedLaws: [
      { code: "TBK", article: "26", title: "Sözleşme özgürlüğü" },
      { code: "TBK", article: "182", title: "Cezai şart" },
    ],
    exampleScenario: {
      title: "Örnek: Freelance proje sözleşmesi",
      situation:
        "Tasarımcı, 'tüm revizyonlar dahil' ve 'tüm haklar devredilir' maddelerini fark etmeden imzaladı.",
      result:
        "Kapsam şişmesi ve telif kaybı yaşanabilir; imza öncesi madde madde okuma şarttır.",
    },
    faqs: [
      {
        question: "Hangi sözleşmeler en riskli?",
        answer:
          "Kira, iş, freelance, kredi ve dijital abonelik sözleşmeleri sık uyuşmazlık doğurur.",
      },
      {
        question: "Risk analizi ne kadar sürer?",
        answer:
          "Clause ile ön tarama saniyeler içinde; detaylı analiz birkaç dakika sürebilir.",
      },
    ],
    ctaHref: "/",
    updatedAt: "2026-05-01",
  },
  {
    slug: "depozito-anlasmazligi",
    title: "Depozito anlaşmazlığı",
    metaTitle: "Depozito anlaşmazlığı — eşya hasar depozitosu ve iade",
    metaDescription:
      "Depozito iade edilmiyor mu? Eşya hasar depozitosu kesintileri ve kiracı-ev sahibi anlaşmazlığında yapılacaklar. Ücretsiz kira sözleşmesi analizi.",
    keywords: [
      "depozito anlaşmazlığı",
      "eşya hasar depozitosu",
      "depozito iade edilmiyor",
      "kira depozitosu dava",
      "kıbrıs depozito anlaşmazlığı",
    ],
    heroTitle: "Depozito iadesinde anlaşmazlık mı yaşıyorsunuz?",
    heroSubtitle: "Kesinti gerekçelerini ve haklarınızı netleştirin",
    problemExplanation:
      "Tahliye sonrası depozito iadesi en sık kira uyuşmazlığı konusudur. Ev sahibi hasar iddia eder, kiracı olağan yıpranma ile kusuru ayırt edemez.",
    legalContext:
      "Depozito sözleşmede düzenlenir; TBK haksız fiil ve alacak hükümleri uygulanır. İspat yükü iddiaya göre dağılır.",
    risks: [
      "Teslim tutanağı olmadan iade talebi",
      "Belirsiz hasar fotoğrafları",
      "Sözlü anlaşmaya güvenmek",
      "Zamanaşımı",
    ],
    solution:
      "Kira sözleşmenizdeki depozito maddesini Clause ile analiz edin; tahliye rehberimizle birlikte okuyun.",
    relatedLaws: [
      { code: "TBK", article: "112", title: "Borçların sona ermesi" },
      { code: "TBK", article: "98", title: "Haksız fiil" },
    ],
    exampleScenario: {
      title: "Örnek: Boya badana kesintisi",
      situation:
        "Ev sahibi, 3 yıllık kiradan sonra tüm dairenin boyasını depozitodan kesti.",
      result:
        "Olağan yıpranma ile kiracı kusuru ayrılır; keyfi kesinti uyuşmazlık konusu olur.",
    },
    faqs: [
      {
        question: "Depozito için dava açılır mı?",
        answer:
          "Anlaşma sağlanamazsa alacak davası veya icra yolları değerlendirilebilir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
    updatedAt: "2026-05-01",
  },
  {
    slug: "haksiz-fesih",
    title: "Haksız fesih",
    metaTitle: "Haksız fesih — iş ve kira sözleşmelerinde haklar",
    metaDescription:
      "Haksız fesih nedir, sonuçları neler? İş ve kira sözleşmelerinde haksız fesih ve tazminat. Ücretsiz sözleşme ön kontrolü.",
    keywords: [
      "haksız fesih",
      "haksız fesih tazminatı",
      "sözleşme haksız fesih",
    ],
    heroTitle: "Haksız fesih durumunda ne yapabilirsiniz?",
    heroSubtitle: "İş ve kira ilişkilerinde usul dışı sonlandırma",
    problemExplanation:
      "Haksız fesih, kanunda veya sözleşmede öngörülen sebep ve usule uyulmadan yapılan sonlandırmadır. İş hukukunda tazminat, kira hukukunda tahliye ve tazminat sonuçları doğurabilir.",
    legalContext:
      "Her sözleşme türünde fesih rejimi farklıdır. İş Kanunu emredici kurallar içerir; kira sözleşmelerinde TBK hükümleri uygulanır.",
    risks: [
      "Yazılı gerekçesiz fesih bildirimi kabul etmek",
      "Karşı tarafa haksız fesih hakkını kullanmak",
      "Delil toplamadan hareket etmek",
    ],
    solution:
      "Sözleşmenizi ve fesih yazışmalarını analiz ettirin; rehber sayfalarımızdan konuya özel bilgi alın.",
    relatedLaws: [
      { code: "İş Kanunu", article: "21", title: "Fesih geçersizlik davası" },
      { code: "TBK", article: "331", title: "Kira sözleşmesinin feshi" },
    ],
    exampleScenario: {
      title: "Örnek: Ani işten çıkarma",
      situation:
        "İşveren, çalışana sözlü 'yarın gelme' dedi; yazılı fesih ve gerekçe sunulmadı.",
      result:
        "Usulsüz fesih iddiası güçlenir; yazılı belge talep edilmelidir.",
    },
    faqs: [
      {
        question: "Haksız fesih ile haksız tahliye aynı mı?",
        answer:
          "Kavramlar benzer mantıkta olsa da uygulanan kanun ve sonuçlar farklıdır.",
      },
    ],
    ctaHref: "/rehber/isten-cikarilinca-ne-yapilir",
    updatedAt: "2026-05-01",
  },
];

const ALL_HUKUKI_ANALIZ_PAGES: HukukiAnalizPageConfig[] = [
  ...PAGES,
  ...HUKUKI_ANALIZ_EXTRA_PAGES,
];

export const HUKUKI_ANALIZ_PAGES: Record<string, HukukiAnalizPageConfig> =
  Object.fromEntries(ALL_HUKUKI_ANALIZ_PAGES.map((p) => [p.slug, p]));

export const HUKUKI_ANALIZ_SLUGS = ALL_HUKUKI_ANALIZ_PAGES.map((p) => p.slug);

export function getHukukiAnalizConfig(
  slug: string,
): HukukiAnalizPageConfig | undefined {
  return HUKUKI_ANALIZ_PAGES[slug];
}
