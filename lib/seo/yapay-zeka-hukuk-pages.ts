import type { RehberPageConfig } from "./rehber-pages";

/**
 * Yapay zeka + hukuk arama niyeti için programmatic SEO sayfaları.
 * /yapay-zeka-hukuk/[slug]
 */
const PAGES: RehberPageConfig[] = [
  {
    slug: "yapay-zeka-hukuk-asistani",
    h1: "Yapay zeka hukuk asistanı — ücretsiz sözleşme ön taraması",
    metaTitle: "Yapay zeka hukuk asistanı 2026 — ücretsiz Clause",
    metaDescription:
      "Türkiye'de yapay zeka hukuk asistanı ile kira, iş ve ticari sözleşmelerinizi ücretsiz tarayın. TBK uyumlu risk özeti; avukat öncesi bilgi.",
    keywords: [
      "yapay zeka hukuk asistanı",
      "hukuk asistanı AI",
      "legal AI assistant Türkiye",
      "ücretsiz hukuk AI",
    ],
    intro:
      "Yapay zeka hukuk asistanı, sözleşme ve hukuki metinleri dil modelleriyle ön taramadan geçiren bir yazılımdır. Mahkeme kararı veya avukatlık hizmeti yerine geçmez; riskleri görünür kılar ve profesyonel yardıma yönlendirir. Clause, Türk mevzuatı bağlamında bu ön tarama katmanını sunar.",
    sections: [
      {
        title: "Ne yapar, ne yapmaz?",
        paragraphs: [
          "Asistan; kira artışı, fesih, depozito, ücret, rekabet yasağı gibi maddeleri işaretleyebilir ve sade dilde özet üretebilir.",
          "Kesin hukuki görüş, dava stratejisi veya vekalet yerine geçmez. Nihai karar için avukata danışılmalıdır.",
        ],
      },
      {
        title: "Kimler kullanır?",
        paragraphs: [
          "Kiracılar, işçiler, freelancer'lar ve KOBİ'ler imza öncesi metni kontrol etmek için kullanır.",
          "Hukuk büroları içtihat ve madde taramasında hız kazanmak için tamamlayıcı araç olarak değerlendirebilir.",
        ],
      },
      {
        title: "Clause ile nasıl başlanır?",
        paragraphs: [
          "Sözleşme metnini yapıştırın; ücretsiz güven özeti ve risk çerçevesi alın. Kira ve iş için ayrı analiz sayfalarımız mevcuttur.",
        ],
      },
    ],
    faqs: [
      {
        question: "Yapay zeka hukuk asistanı güvenilir mi?",
        answer:
          "Ön bilgi ve risk işaretleme için faydalıdır; hata yapabilir. Kritik sözleşmelerde mutlaka avukat kontrolü şarttır.",
      },
      {
        question: "Ücretsiz mi?",
        answer:
          "Clause'da günlük ücretsiz ön tarama hakkı sunulur; detaylı analiz katmanları farklı olabilir.",
      },
      {
        question: "Avukat yerine geçer mi?",
        answer: "Hayır. Bilgilendirme ve ön kontrol aracıdır.",
      },
    ],
    ctaLabel: "Ücretsiz sözleşme taraması başlat",
    ctaHref: "/",
    updatedAt: "2026-06-02",
  },
  {
    slug: "yapay-zeka-sozlesme-analizi",
    h1: "Yapay zeka sözleşme analizi — riskleri saniyeler içinde görün",
    metaTitle: "Yapay zeka sözleşme analizi — ücretsiz AI kontrol",
    metaDescription:
      "Yapay zeka ile sözleşme analizi: riskli maddeler, TBK uyumu ve özet. Kira, iş, freelance ve ticari sözleşmeler için Clause.",
    keywords: [
      "yapay zeka sözleşme analizi",
      "AI sözleşme analizi",
      "sözleşme analizi yapay zeka",
      "kontrat AI kontrol",
    ],
    intro:
      "Sözleşme analizi yapay zeka ile, uzun metinleri madde madde okumadan önce risk haritası çıkarmanızı sağlar. Özellikle kira, iş, hizmet alımı ve dijital üyelik sözleşmelerinde tek taraflı cezai şart, belirsiz fesih ve otomatik yenileme maddeleri sık gözden kaçar.",
    sections: [
      {
        title: "AI analiz hangi riskleri yakalar?",
        paragraphs: [
          "Artış formülü, depozito kesintisi, tahliye taahhüdü, ihbar süresi, rekabet yasağı, gizlilik ve yetkili mahkeme başlıkları önceliklidir.",
          "Metinde çelişen veya belirsiz ifadeler işaretlenir; kullanıcı müzakere veya avukat incelemesine hazırlanır.",
        ],
      },
      {
        title: "Manuel okumadan farkı",
        paragraphs: [
          "İnsan gözü yorulduğunda son sayfalar atlanır. AI tutarlı bir ilk geçiş yapar; nihai karar yine insanda kalmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hangi sözleşme türleri desteklenir?",
        answer:
          "Kira, iş, freelance, KVKK metni, kredi ve ticari sözleşmeler dahil geniş bir yelpazede ön tarama yapılabilir.",
      },
      {
        question: "Sonuç ne kadar sürer?",
        answer: "Ön özet genelde saniyeler içinde; detaylı analiz metin uzunluğuna bağlıdır.",
      },
    ],
    ctaLabel: "Sözleşme analizi sayfalarına git",
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-06-02",
  },
  {
    slug: "yapay-zeka-kira-sozlesmesi",
    h1: "Yapay zeka kira sözleşmesi analizi — kiracı ve ev sahibi için",
    metaTitle: "Yapay zeka kira sözleşmesi analizi — TBK ön kontrol",
    metaDescription:
      "Kira sözleşmenizi yapay zeka ile tarayın: artış, depozito, tahliye ve fesih maddeleri. Ücretsiz kira artış hesaplayıcı ile birlikte kullanın.",
    keywords: [
      "yapay zeka kira sözleşmesi",
      "kira sözleşmesi AI analizi",
      "TBK kira yapay zeka",
    ],
    intro:
      "Kira sözleşmeleri her yıl milyonlarca kişiyi ilgilendirir; çoğu metin imzalanmadan okunmaz. Yapay zeka kira sözleşmesi analizi, artış oranı, depozito iadesi ve tahliye yollarını ön planda tarar.",
    sections: [
      {
        title: "Kiracı için kritik maddeler",
        paragraphs: [
          "Artış tavanı, bildirim süresi, depozito kesintisi gerekçesi ve tahliye taahhüdü en sık tartışılan konulardır.",
        ],
      },
      {
        title: "Ev sahibi için kritik maddeler",
        paragraphs: [
          "Kira borcu, süre bitimi, kefil ve bakım-onarım paylaşımı net yazılmalıdır; belirsizlik dava riski doğurur.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kira artışını AI hesaplar mı?",
        answer:
          "Ayrı ücretsiz kira artış hesaplayıcımız tahmini tutar verir; kesin sonuç için sözleşme metni analiz edilmelidir.",
      },
    ],
    ctaLabel: "Kira sözleşmesi AI analizi",
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-06-02",
  },
  {
    slug: "yapay-zeka-is-sozlesmesi",
    h1: "Yapay zeka iş sözleşmesi analizi — fesih ve tazminat riskleri",
    metaTitle: "Yapay zeka iş sözleşmesi analizi — İş Kanunu ön tarama",
    metaDescription:
      "İş sözleşmenizi yapay zeka ile kontrol edin: fesih, ücret, rekabet yasağı, fazla mesai. İşten çıkarılma rehberleri ile birlikte okuyun.",
    keywords: [
      "yapay zeka iş sözleşmesi",
      "iş sözleşmesi AI",
      "iş hukuku yapay zeka",
    ],
    intro:
      "İş sözleşmesi imzalandığında çalışan çoğu zaman ücret ve görevi okur; fesih ve rekabet maddeleri sonradan sorun olur. AI ön tarama bu maddeleri erken işaretler.",
    sections: [
      {
        title: "Sık riskli maddeler",
        paragraphs: [
          "Belirsiz performans kriteri, geniş rekabet yasağı, tek taraflı fesih, ücret dışı yan haklar ve fazla mesai onayı.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşten çıkarılınca AI tazminat hesaplar mı?",
        answer:
          "Hayır; bilgilendirme ve risk çerçevesi sunar. Tazminat hesabı için uzman desteği gerekir.",
      },
    ],
    ctaLabel: "İş sözleşmesi risk analizi",
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-06-02",
  },
  {
    slug: "legal-ai-turkiye",
    h1: "Legal AI Türkiye — hukuk teknolojisi ve sözleşme taraması",
    metaTitle: "Legal AI Türkiye — Clause hukuk yapay zekası",
    metaDescription:
      "Türkiye'de Legal AI: sözleşme analizi, mevzuat özeti ve risk taraması. Türkçe arayüz, TBK ve İş Kanunu bağlamı.",
    keywords: [
      "legal AI Turkey",
      "legal AI Türkiye",
      "LegalTech Türkiye",
      "hukuk teknolojisi",
    ],
    intro:
      "Legal AI (hukuk yapay zekası), Türkiye'de özellikle sözleşme yönetimi, KOBİ uyumu ve bireysel hak arama alanlarında büyüyor. Clause, Türkçe arayüz ve yerel mevzuat bağlamıyla bu segmentte konumlanır.",
    sections: [
      {
        title: "Türkiye'ye özgü ihtiyaçlar",
        paragraphs: [
          "Kira hukuku, iş hukuku ve tüketici koruması günlük aramalarda öne çıkar. İngilizce-only araçlar TBK ve Yargıtay bağlamını kaçırabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause hangi dillerde?",
        answer: "Arayüz ve özetler Türkçe odaklıdır; sözleşme metni farklı dillerde de yapıştırılabilir.",
      },
    ],
    ctaLabel: "Clause'u dene",
    ctaHref: "/",
    updatedAt: "2026-06-02",
  },
  {
    slug: "ucretsiz-yapay-zeka-hukuk",
    h1: "Ücretsiz yapay zeka hukuk aracı — sözleşme ön kontrolü",
    metaTitle: "Ücretsiz yapay zeka hukuk — sözleşme taraması",
    metaDescription:
      "Ücretsiz yapay zeka ile hukuki sözleşme ön kontrolü. Günlük ücretsiz analiz hakkı; kira, iş ve ticari metinler.",
    keywords: [
      "ücretsiz yapay zeka hukuk",
      "ücretsiz hukuki analiz AI",
      "ücretsiz sözleşme analizi",
    ],
    intro:
      "Ücretsiz yapay zeka hukuk araçları, giriş bariyerini düşürür; ancak 'tamamen ücretsiz avukat' vaadi olan sitelere dikkat edin. Clause, ücretsiz ön tarama ile başlayıp şeffaf fiyatlandırma sunar.",
    sections: [
      {
        title: "Ücretsiz katmanda neler var?",
        paragraphs: [
          "Güven özeti, risk sayısı ve kategori başlıkları gibi ön bilgiler ücretsiz sunulabilir.",
          "Madde madde gerekçe ve iyileştirilmiş metin genelde ücretli veya kredi tabanlıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kredi kartı gerekir mi?",
        answer: "Ücretsiz ön tarama için genelde hayır; ödeme adımları ayrı akışlardadır.",
      },
    ],
    ctaLabel: "Ücretsiz tarama başlat",
    ctaHref: "/#dene",
    updatedAt: "2026-06-02",
  },
  {
    slug: "yapay-zeka-tahliye-taahhutnamesi",
    h1: "Yapay zeka tahliye taahhütnamesi kontrolü",
    metaTitle: "Tahliye taahhütnamesi yapay zeka kontrolü — ücretsiz",
    metaDescription:
      "Tahliye taahhütnamesini yapay zeka ile ön kontrolden geçirin. Usul ve içerik riskleri; kira hukuku rehberleri.",
    keywords: [
      "tahliye taahhütnamesi yapay zeka",
      "AI tahliye kontrol",
      "tahliye taahhüdü analizi",
    ],
    intro:
      "Tahliye taahhütnamesi tek imzayla ciddi sonuç doğurabilir. Yapay zeka, tarih, adres, borç baskısı ve şekil unsurları açısından ön uyarı verebilir; nihai geçerlilik avukat ve mahkeme değerlendirmesindedir.",
    sections: [
      {
        title: "Kontrol listesi",
        paragraphs: [
          "Tarih net mi? Kiralanan adres doğru mu? Borç karşılığı imza baskısı var mı? Süre makul mü?",
        ],
      },
    ],
    faqs: [
      {
        question: "Belge yükleyebilir miyim?",
        answer: "Metni yapıştırarak ön tarama yapabilirsiniz; dosya yükleme özellikleri değişebilir.",
      },
    ],
    ctaLabel: "Tahliye taahhütnamesi aracı",
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    updatedAt: "2026-06-02",
  },
  {
    slug: "yapay-zeka-avukat-mi",
    h1: "Yapay zeka avukat mı? — Clause'un rolü",
    metaTitle: "Yapay zeka avukat mı? Hukuk AI gerçekleri",
    metaDescription:
      "'Yapay zeka avukat' aramaları artıyor. AI avukat yerine geçmez; sözleşme ön taraması ve bilgilendirme sağlar. Doğru beklenti rehberi.",
    keywords: [
      "yapay zeka avukat",
      "AI avukat",
      "yapay zeka avukat türkiye",
    ],
    intro:
      "'Yapay zeka avukat' ifadesi pazarlama dilinde sık kullanılır. Hukuken avukatlık mesleği insana aittir; AI ise araştırma, özet ve risk işaretleme aracıdır. Yanlış beklenti hem kullanıcıyı hem sektörü zarara uğratır.",
    sections: [
      {
        title: "AI'nın yapabilecekleri",
        paragraphs: [
          "Sözleşme özetleme, madde eşleştirme, tipik risk kalıplarını işaretleme, SSS düzeyinde bilgilendirme.",
        ],
      },
      {
        title: "AI'nın yapamayacakları",
        paragraphs: [
          "Vekalet, duruşma, strateji, delil değerlendirmesi ve bağlayıcı hukuki görüş.",
        ],
      },
    ],
    faqs: [
      {
        question: "AI ile dava açılır mı?",
        answer:
          "Dava açma usulü insana aittir; AI yalnızca hazırlık aşamasında yardımcı olabilir.",
      },
    ],
    ctaLabel: "Sözleşme ön taraması yap",
    ctaHref: "/",
    updatedAt: "2026-06-02",
  },
];

export const YAPAY_ZEKA_HUKUK_PAGES: Record<string, RehberPageConfig> =
  Object.fromEntries(PAGES.map((p) => [p.slug, p]));

export const YAPAY_ZEKA_HUKUK_SLUGS = PAGES.map((p) => p.slug);

export function getYapayZekaHukukConfig(slug: string): RehberPageConfig | undefined {
  return YAPAY_ZEKA_HUKUK_PAGES[slug];
}
