import { createRehberPage } from "@/lib/seo/rehber-factory";

/** +18 rehber — SEO Faz 1 genişletme (toplam ~50) */
export const REHBER_EXTRA_2_PAGES = [
  createRehberPage({
    slug: "aidat-ve-kira-faturasi",
    h1: "Aidat ve kira — kim öder, sözleşmede nasıl yazılır?",
    metaTitle: "Aidat ve kira faturası rehberi — kiracı mal sahibi",
    metaDescription:
      "Konut aidatı, ortak gider ve kira bedeli ayrımı. Kira sözleşmesinde aidat maddesi ve uyuşmazlık önleme.",
    keywords: ["aidat kim öder", "kira aidat", "ortak gider kira sözleşmesi"],
    intro:
      "Aidat ile kira karıştığında taraflar farklı anlar. Sözleşmede kalemler ayrı ve net yazılmalıdır.",
    sections: [
      {
        title: "Aidat neyi kapsar?",
        paragraphs: [
          "Asansör, temizlik, ısınma gibi ortak giderler aidat kapsamında sayılabilir; kira bedelinden ayrı gösterilmelidir.",
          "Aidat artışı için ayrı bildirim ve hesaplama yöntemi belirsizse tartışma çıkar.",
        ],
      },
      {
        title: "Kiracı yükümlülüğü",
        paragraphs: [
          "Sözleşmede aidatın kime ait olduğu yazılmazsa kanun ve site yönetimi kuralları devreye girer.",
          "Ödeme dekontlarında ‘kira’ ve ‘aidat’ ayrımı yapın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Aidat ödemezsem tahliye olur mu?",
        answer: "Kira borcu ile aidat borcu hukuki sonuçları farklı olabilir; sözleşme ve yönetim planına bakın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
  createRehberPage({
    slug: "deneme-suresi-rehberi",
    h1: "Deneme süresi rehberi — işçi ve işveren",
    metaTitle: "Deneme süresi nedir? İş sözleşmesi rehberi 2026",
    metaDescription:
      "Deneme süresi süresi, fesih bildirimi ve tazminat. İş Kanunu çerçevesinde çalışan özeti.",
    keywords: ["deneme süresi", "deneme süresi fesih", "iş sözleşmesi deneme"],
    intro: "Deneme süresi, iş ilişkisinin erken aşamasında taraflara daha kolay ayrılma imkânı tanır; sınırsız değildir.",
    sections: [
      {
        title: "Süre sınırları",
        paragraphs: [
          "İş Kanunu ve toplu iş sözleşmesi deneme süresini sınırlar; sözleşmede daha uzun süre yazılsa bile geçersiz olabilir.",
        ],
      },
      {
        title: "Fesih sonuçları",
        paragraphs: [
          "Deneme süresinde de belirli bildirim kuralları geçerli olabilir; keyfi çıkarma iddiası tazminat doğurabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Denemede kıdem oluşur mu?",
        answer: "Kıdem hesabı kural olarak işe girişten itibaren işler; somut uyuşmazlıklarda uzman görüşü alın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  createRehberPage({
    slug: "is-kazasi-isveren-yukumluluk",
    h1: "İş kazasında işverenin yükümlülükleri",
    metaTitle: "İş kazası işveren yükümlülükleri — bildirim ve önlem",
    metaDescription:
      "İş kazası bildirimi, SGK, önleyici tedbirler ve tazminat riskleri. İşveren kontrol listesi.",
    keywords: ["iş kazası işveren", "iş kazası bildirim", "işveren iş güvenliği"],
    intro: "İş kazası sonrası süreç hızlı ve yazılı yürütülmezse hem ceza hem tazminat riski artar.",
    sections: [
      {
        title: "Acil adımlar",
        paragraphs: [
          "Sağlık müdahalesi, olay tutanağı ve tanık ifadeleri ilk saatlerde toplanmalıdır.",
          "Yasal bildirim sürelerine uyulmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşçi kusurluysa işveren sorumlu mu?",
        answer: "Kusur oranı somut olaya göre belirlenir; sigorta ve hukuki süreçler ayrı yürür.",
      },
    ],
    ctaHref: "/rehber/isci-haklari",
  }),
  createRehberPage({
    slug: "gizlilik-istihdam-sozlesmesi",
    h1: "Çalışan gizlilik sözleşmesi — sınırlar",
    metaTitle: "İstihdam gizlilik sözleşmesi rehberi — KVKK ve NDA",
    metaDescription:
      "Çalışan gizlilik, rekabet yasağı ve veri koruma. İş sözleşmesi eki olarak NDA.",
    keywords: ["çalışan gizlilik sözleşmesi", "iş sözleşmesi gizlilik", "rekabet yasağı"],
    intro: "Gizlilik maddesi çok geniş yazılırsa çalışan lehine geçersizlik ve KVKK ihlali riski doğar.",
    sections: [
      {
        title: "Makul sınırlar",
        paragraphs: [
          "Gizlilik kapsamı iş tanımıyla orantılı olmalı; tüm hayatı kapsayan ifadeler sorunludur.",
          "İşten çıkış sonrası süre ve coğrafi rekabet yasağı ayrı değerlendirilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "LinkedIn’de çalıştığım şirketi yazabilir miyim?",
        answer: "Genel unvan paylaşımı ile ticari sır ifşası farklıdır; sözleşme metnine bakın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  createRehberPage({
    slug: "kira-garanti-mektubu",
    h1: "Kira garanti mektubu — kiracı ve mal sahibi",
    metaTitle: "Kira garanti mektubu rehberi — banka teminatı",
    metaDescription:
      "Kira için banka garanti mektubu, depozito alternatifi ve riskler. Sözleşmede garanti şartları.",
    keywords: ["kira garanti mektubu", "banka garanti kira", "kira teminat mektubu"],
    intro: "Garanti mektubu depozito yerine veya ek olarak istenebilir; maliyet ve süre koşulları net olmalıdır.",
    sections: [
      {
        title: "Mal sahibi açısından",
        paragraphs: [
          "Mektubun süresi, tutarı ve hangi ihlalde ödeneceği yazılmalıdır.",
          "Banka iflası gibi istisnai haller sözleşmede düşünülebilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Garanti mektubu depozito yerine geçer mi?",
        answer: "Tarafların anlaşmasına bağlıdır; ikisi birlikte de talep edilebilir.",
      },
    ],
    ctaHref: "/rehber/kiraci-haklari",
  }),
  createRehberPage({
    slug: "otomatik-yenileme-sozlesme",
    h1: "Sözleşmede otomatik yenileme maddesi",
    metaTitle: "Otomatik yenileme maddesi — iptal ve riskler",
    metaDescription:
      "Abonelik ve ticari sözleşmelerde otomatik yenileme, fesih bildirimi ve tüketici hakları.",
    keywords: ["otomatik yenileme sözleşme", "sözleşme yenileme maddesi", "abonelik iptal"],
    intro: "Otomatik yenileme pratik olabilir; iptal yolu görünür değilse tüketici ve ticari taraflar sıkışır.",
    sections: [
      {
        title: "Dikkat edilecekler",
        paragraphs: [
          "Yenileme tarihi, bildirim süresi ve iptal kanalı (e-posta, panel) açık yazılmalıdır.",
          "Fiyat artışı yenileme ile bağlanmışsa ayrı onay gerekebilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Yenilemeyi e-postayla reddedebilir miyim?",
        answer: "Sözleşmedeki fesih şekline uygun yazılı bildirim genelde yeterlidir.",
      },
    ],
    ctaHref: "/rehber/sozlesme-imzalamadan-once",
  }),
  createRehberPage({
    slug: "uyusmazlik-cozumu-tahkim",
    h1: "Sözleşmede tahkim ve uyuşmazlık çözümü",
    metaTitle: "Tahkim şartı sözleşme rehberi — mahkeme yerine",
    metaDescription:
      "Tahkim anlaşması, yetkili mahkeme ve arabuluculuk önceliği. Ticari ve tüketici sözleşmeleri.",
    keywords: ["tahkim şartı", "uyuşmazlık çözümü sözleşme", "yetkili mahkeme"],
    intro: "Uyuşmazlık maddesi imzalandıktan sonra mahkeme yolunu kısıtlayabilir; metni okumadan atlamayın.",
    sections: [
      {
        title: "Tahkim vs mahkeme",
        paragraphs: [
          "Tahkim genelde daha hızlı ve gizlidir; masraf ve itiraz imkânı sınırlı olabilir.",
          "Tüketici sözleşmelerinde bazı tahkim şartları geçersiz sayılabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tahkim şartını sonradan ekleyebilirler mi?",
        answer: "Aleyhinize köklü değişiklik için açık rıza gerekir.",
      },
    ],
    ctaHref: "/hukuki-analiz/sozlesme-risk-analizi",
  }),
  createRehberPage({
    slug: "pazaryeri-tuketici-sikayet",
    h1: "Pazaryeri alışverişinde tüketici şikayeti",
    metaTitle: "Pazaryeri tüketici hakları — iade ve şikayet",
    metaDescription:
      "Trendyol, Hepsiburada vb. pazaryerinde cayma, ayıplı mal ve satıcı sorumluluğu.",
    keywords: ["pazaryeri iade", "trendyol tüketici hakları", "online alışveriş şikayet"],
    intro: "Pazaryerinde satıcı ile platform sorumluluğu karışır; sipariş ve mesajlaşma kayıtlarını saklayın.",
    sections: [
      {
        title: "Şikayet yolları",
        paragraphs: [
          "Önce satıcı/platform iç şikayet, ardından tüketici hakem heyeti veya Bakanlık hatları.",
          "Cayma süresi ve iade kargo ücreti sipariş koşullarında yazar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Platform para iadesini geciktirirse?",
        answer: "Yazılı takip ve resmi şikayet kanalları değerlendirilir.",
      },
    ],
    ctaHref: "/rehber/tuketici-haklari",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-bosanma",
    h1: "Boşanma ve kira sözleşmesi — aile konutu",
    metaTitle: "Boşanma sonrası kira sözleşmesi — aile konutu",
    metaDescription:
      "Boşanmada kiralanan konut, eş onayı ve oturma hakkı. Kiracı ve mal sahibi bilgisi.",
    keywords: ["boşanma kira sözleşmesi", "aile konutu boşanma", "eş kira sözleşmesi"],
    intro: "Aile konutu kirasında boşanma, oturma düzenini ve sözleşmenin devamını etkileyebilir.",
    sections: [
      {
        title: "Oturma hakkı",
        paragraphs: [
          "Boşanma davası sürecinde konutta kalma düzenlemeleri ayrı değerlendirilir.",
          "Kira sözleşmesindeki taraf değişikliği yazılı hale getirilmelidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Eşim adına kira ödüyorum, boşanmada ne olur?",
        answer: "Somut olay ve sözleşme tarafına göre değişir; hukuki destek alın.",
      },
    ],
    ctaHref: "/rehber/aile-konutu-kirasi",
  }),
  createRehberPage({
    slug: "iscinin-hakli-fesih-hakki",
    h1: "İşçinin haklı fesih hakkı",
    metaTitle: "Haklı fesih işçi — ne zaman işten ayrılır?",
    metaDescription:
      "Ücret gecikmesi, mobbing, görev değişikliği ve haklı fesih şartları. İş sözleşmesi rehberi.",
    keywords: ["haklı fesih işçi", "işçi haklı fesih", "işten ayrılma haklı sebep"],
    intro: "Haklı fesih, işçiye tazminat ve kıdem gibi hakları koruyarak ayrılma imkânı verebilir; ispat şarttır.",
    sections: [
      {
        title: "Sık sebepler",
        paragraphs: [
          "Maaşın sürekli gecikmesi, ağır mobbing veya görevin kökten değiştirilmesi örnek başlıklardır.",
          "Fesih bildirimi yazılı ve gerekçeli yapılmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hemen çıkıp tazminat alabilir miyim?",
        answer: "Süreç ve delil yeterliliği mahkeme/uzlaşmada belirlenir; aceleci adım risklidir.",
      },
    ],
    ctaHref: "/rehber/isten-cikarilinca-ne-yapilir",
  }),
  createRehberPage({
    slug: "staj-sozlesmesi-rehberi",
    h1: "Staj sözleşmesi rehberi — ücret ve sigorta",
    metaTitle: "Staj sözleşmesi rehberi 2026 — zorunlu staj",
    metaDescription:
      "Stajyer sözleşmesi, sigorta, ücret ve iş kazası. Üniversite zorunlu stajı için kontrol listesi.",
    keywords: ["staj sözleşmesi", "stajyer sözleşmesi", "zorunlu staj sigorta"],
    intro: "Staj ile iş ilişkisi karıştırılmamalı; staj sözleşmesi ayrı düzenlenir.",
    sections: [
      {
        title: "Ücret ve sigorta",
        paragraphs: [
          "Zorunlu stajda sigorta ve ücret kuralları farklıdır; okul ve işyeri koordinasyonu önemlidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Stajyer işçi sayılır mı?",
        answer: "Staj türüne göre değişir; metin ‘iş sözleşmesi’ gibi düzenlenmişse risk artar.",
      },
    ],
    ctaHref: "/sozlesme-analizi/stajyer-sozlesmesi",
  }),
  createRehberPage({
    slug: "kvkk-calisan-verisi",
    h1: "Çalışan kişisel verileri ve KVKK",
    metaTitle: "KVKK çalışan verisi rehberi — işveren yükümlülük",
    metaDescription:
      "Özlük dosyası, performans, kamera ve e-posta izleme. İşyerinde KVKK uyumu özeti.",
    keywords: ["KVKK çalışan", "işyeri kişisel veri", "çalışan aydınlatma"],
    intro: "İşveren çalışan verisi işlerken meşru amaç ve ölçülülük ilkesine uymalıdır.",
    sections: [
      {
        title: "Temel belgeler",
        paragraphs: [
          "Aydınlatma metni, açık rıza (gereken hallerde) ve veri envanteri işveren için kritiktir.",
          "Gizlilik sözleşmesi tek başına KVKK uyumu sağlamaz.",
        ],
      },
    ],
    faqs: [
      {
        question: "İş e-postasını okuyabilir mi?",
        answer: "İş amacı ve ölçülülük çerçevesinde politika gerekir; keyfi izleme risklidir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi",
  }),
  createRehberPage({
    slug: "ticari-sozlesmesi-kobi-rehberi",
    h1: "KOBİ ticari sözleşme rehberi",
    metaTitle: "Ticari sözleşme rehberi — KOBİ için kontrol",
    metaDescription:
      "Tedarik, distribütörlük ve hizmet sözleşmelerinde ödeme, teslim ve cezai şart. AI ön tarama.",
    keywords: ["ticari sözleşme", "KOBİ sözleşme", "tedarik sözleşmesi"],
    intro: "KOBİ’ler hız için standart şablon imzalar; ticari sözleşmede küçük madde büyük zarar doğurur.",
    sections: [
      {
        title: "Ödeme ve teslim",
        paragraphs: [
          "Vade, temerrüt faizi, mülkiyetin geçişi (FOB vb.) ve force majeure net yazılmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözlü sipariş bağlayıcı mı?",
        answer: "Ticari teamül ve yazılı onay e-postası delil olabilir; yazılı sözleşme tercih edin.",
      },
    ],
    ctaHref: "/sozlesme-analizi/ticari-sozlesme",
  }),
  createRehberPage({
    slug: "hizmet-sozlesmesi-rehberi",
    h1: "Hizmet sözleşmesi rehberi — kapsam ve ücret",
    metaTitle: "Hizmet sözleşmesi rehberi — TBK özeti",
    metaDescription:
      "Danışmanlık ve hizmet sözleşmesinde kapsam, teslim, revizyon ve ödeme. Riskli maddeler.",
    keywords: ["hizmet sözleşmesi", "hizmet sözleşmesi örnek", "danışmanlık sözleşmesi"],
    intro: "Hizmet sözleşmesinde sonuç değil, özenle ifa esastır; yine de teslim tanımı net olmalıdır.",
    sections: [
      {
        title: "Kapsam tanımı",
        paragraphs: [
          "Deliverable listesi, kabul kriteri ve revizyon hakkı yazılmazsa ‘scope creep’ yaşanır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Memnun kalmazsam ücret iadesi?",
        answer: "Sözleşmedeki cayma/iptal ve ayıp hükümlerine bağlıdır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/hizmet-sozlesmesi",
  }),
  createRehberPage({
    slug: "eser-sozlesmesi-rehberi",
    h1: "Eser sözleşmesi rehberi — yapım işi",
    metaTitle: "Eser sözleşmesi nedir? Yapım işi rehberi",
    metaDescription:
      "İnşaat, yazılım teslimi ve yapım işlerinde eser sözleşmesi. Kabul, ayıp ve ödeme.",
    keywords: ["eser sözleşmesi", "yapım işi sözleşmesi", "eser sözleşmesi TBK"],
    intro: "Eser sözleşmesinde belirli bir işin tamamlanmış halinin teslimi hedeflenir.",
    sections: [
      {
        title: "Kabul ve ayıp",
        paragraphs: [
          "İşin kabulü ve gizli ayıplar için süreler sözleşmede düzenlenmelidir.",
          "Hakediş ödemesi iş ilerlemesine bağlanabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Eser ile hizmet sözleşmesi farkı?",
        answer: "Hedef ‘sonuç/ürün’ ise eser, ‘faaliyet’ ise hizmet sözleşmesi düşünülür.",
      },
    ],
    ctaHref: "/sozlesme-analizi/yapim-is-sozlesmesi",
  }),
  createRehberPage({
    slug: "sponsorluk-sozlesmesi-rehberi",
    h1: "Sponsorluk sözleşmesi rehberi",
    metaTitle: "Sponsorluk sözleşmesi — marka ve içerik hakları",
    metaDescription:
      "Influencer ve etkinlik sponsorluğunda teslim, ölçüm, fesih ve marka kullanımı.",
    keywords: ["sponsorluk sözleşmesi", "influencer sözleşmesi", "marka sponsorluk"],
    intro: "Sponsorlukta ‘görünürlük’ ve ‘metrik’ tanımsızsa ödeme uyuşmazlığı kaçınılmazdır.",
    sections: [
      {
        title: "Teslim ve metrik",
        paragraphs: [
          "Paylaşım sayısı, platform, hashtag ve raporlama periyodu yazılmalıdır.",
          "Fikri mülkiyet ve içerik onayı maddeleri net olmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Performans düşükse ödeme kesilir mi?",
        answer: "Kesinti şartları önceden ve ölçülebilir tanımlanmalıdır.",
      },
    ],
    ctaHref: "/rehber/freelance-sozlesme-rehberi",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-evcil-hayvan",
    h1: "Kira sözleşmesinde evcil hayvan maddesi",
    metaTitle: "Kira sözleşmesi evcil hayvan — yasak mı?",
    metaDescription:
      "Kirada kedi köpek yasağı, ek depozito ve komşu şikayeti. Sözleşme maddesi önerileri.",
    keywords: ["kira sözleşmesi evcil hayvan", "kirada hayvan besleme", "evcil hayvan kira"],
    intro: "Evcil hayvan yasağı sık yazılır; yasağın kapsamı ve ihlal sonucu net olmalıdır.",
    sections: [
      {
        title: "Yasak ve istisna",
        paragraphs: [
          "Tam yasak mı, küçük evcil hayvan istisnası mı açık yazılmalıdır.",
          "Ek depozito veya sigorta talebi ayrı madde olabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşmede yoksa hayvan besleyebilir miyim?",
        answer: "Genel TBK ve apartman kuralları devreye girebilir; komşu haklarına dikkat.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
  createRehberPage({
    slug: "sozlesme-iptal-cayma-farki",
    h1: "Sözleşme iptali ile cayma hakkı farkı",
    metaTitle: "İptal ve cayma farkı — tüketici ve ticari",
    metaDescription:
      "Cayma, fesih ve iptal kavramları arasındaki fark. Mesafeli satış ve abonelikler.",
    keywords: ["sözleşme iptal", "cayma hakkı farkı", "fesih iptal farkı"],
    intro: "Günlük dilde ‘iptal’ denilen pek çok işlem hukuken farklı sonuç doğurur.",
    sections: [
      {
        title: "Cayma",
        paragraphs: [
          "Mesafeli satışta 14 gün cayma özel bir haktır; sebep göstermek gerekmez (istisnalar hariç).",
        ],
      },
      {
        title: "Fesih",
        paragraphs: [
          "Fesih, sözleşmeyi geleceğe etkili sona erdirme; bildirim süreleri ve gerekçe sözleşmeye bağlıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Aboneliği iptal etmek cayma mı?",
        answer: "Genelde fesih bildirimi; cayma kanunu mesafeli satışa özgüdür.",
      },
    ],
    ctaHref: "/rehber/mesafeli-satis-cayma",
  }),
  createRehberPage({
    slug: "google-yapay-zeka-hukuk-arama",
    h1: "Google'da yapay zeka hukuk aramaları — doğru kaynak",
    metaTitle: "Yapay zeka hukuk Google araması — güvenilir bilgi",
    metaDescription:
      "Hukuki sorularda ChatGPT vs uzman araç. Türkçe sözleşme analizi için Clause önerisi.",
    keywords: ["yapay zeka hukuk", "hukuk google arama", "ai hukuk türkiye"],
    intro: "Arama sonuçları genel AI bloglarıyla dolu; sözleşme özelinde doğrulanmış araç seçin.",
    sections: [
      {
        title: "Ne aramalı?",
        paragraphs: [
          "‘Yapay zeka sözleşme analizi’, ‘kira sözleşmesi kontrol ücretsiz’ gibi niyet odaklı sorgular kullanın.",
          "Sonuçta TBK ve güncel mevzuat bağlamı sunan Türkçe araçlara öncelik verin.",
        ],
      },
    ],
    faqs: [
      {
        question: "ChatGPT sözleşme için yeterli mi?",
        answer: "Genel özet sunar; Türk hukuku ve gizlilik için özel araçlar daha uygundur.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani",
  }),
];
