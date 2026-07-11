import { createRehberPage } from "@/lib/seo/rehber-factory";

/** SEO Faz 2 — günlük hukuk uzun kuyruk (+12 rehber) */
export const REHBER_BATCH_3_PAGES = [
  createRehberPage({
    slug: "kira-borcu-takibi-icra",
    h1: "Kira borcu takibi ve icra süreci — kiracı ve ev sahibi rehberi",
    metaTitle: "Kira borcu takibi — icra ve tahliye süreci rehberi 2026",
    metaDescription:
      "Kira borcu birikince ne olur? İhtar, icra takibi ve tahliye yolları. Kiracı ve mal sahibi için adım adım kira borcu rehberi ve ücretsiz sözleşme analizi.",
    keywords: [
      "kira borcu takibi",
      "kira borcu icra",
      "kira ödenmezse ne olur",
      "kira alacağı takibi",
      "kiracı kira borcu",
    ],
    intro:
      "Kira borcunun birikmesi hem kiracı hem ev sahibi için streslidir. Türkiye'de kira alacağı genellikle önce yazılı ihtar, ardından icra veya dava yoluyla takip edilir. Usule uyulmazsa taraflar hak kaybeder.",
    sections: [
      {
        title: "Ev sahibi için ilk adımlar",
        paragraphs: [
          "Kira gecikmesinde önce sözleşmedeki temerrüt ve faiz maddelerini kontrol edin. Yazılı ihtar, borç tutarını ve ödeme süresini net göstermelidir.",
          "Anlaşma sağlanamazsa icra takibi veya kira alacağı davası gündeme gelir. Tahliye ile kira borcu takibi farklı hukuki süreçlerdir; karıştırılmamalıdır.",
        ],
      },
      {
        title: "Kiracı için haklar",
        paragraphs: [
          "Ödeme güçlüğünde ev sahibiyle yazılı ödeme planı müzakere edilebilir. Haksız veya fazla talep edilen faiz ve masraflara itiraz hakkınız vardır.",
          "İcra tebligatı aldıysanız sürelere dikkat edin; itiraz süresi kaçırılırsa haciz riski artar.",
        ],
      },
      {
        title: "Kira takip raporu ve sözleşme",
        paragraphs: [
          "Kira borcu takibi kadar önemli olan, sözleşmedeki artış, fesih ve depozito maddeleridir. Yapay zeka ile kira sözleşmesini tarayarak risk özetini güncel tutun.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kaç ay kira ödenmezse tahliye olur?",
        answer:
          "Tek başına ay sayısı yeterli değildir; sözleşme, ihtar ve yasal süreç birlikte değerlendirilir. Usul şartları sağlanmadan zorla tahliye yapılamaz.",
      },
      {
        question: "Kira borcu icra masrafını kim öder?",
        answer: "Genel olarak borçlu kiracıya yüklenir; sözleşme aksini düzenleyebilir.",
      },
    ],
    ctaHref: "/hukuki-analiz/kira-borcu-takibi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-fesih-bildirimi",
    h1: "Kira sözleşmesi fesih bildirimi — süre, şekil ve örnek",
    metaTitle: "Kira sözleşmesi fesih bildirimi nasıl yapılır? 2026 rehber",
    metaDescription:
      "Belirli ve belirsiz süreli kira fesih bildirimi süreleri, yazılı şekil şartı ve kiracı-ev sahibi hakları. Ücretsiz kira sözleşmesi AI kontrolü.",
    keywords: [
      "kira fesih bildirimi",
      "kira sözleşmesi fesih",
      "kira fesih süresi",
      "kiracı fesih bildirimi",
    ],
    intro:
      "Kira sözleşmesini sona erdirmek için kanuni ihbar sürelerine ve yazılı bildirim şekline uymak gerekir. Süre veya şekil hatası feshi geçersiz kılabilir ve tazminat riski doğurur.",
    sections: [
      {
        title: "Belirsiz süreli kira",
        paragraphs: [
          "Konut kiralarında kiracı ve ev sahibi için farklı ihbar süreleri uygulanır. Bildirim yazılı olmalı ve süre kanuna uygun hesaplanmalıdır.",
        ],
      },
      {
        title: "Belirli süreli kira",
        paragraphs: [
          "Süre bitiminde tahliye koşulları sözleşme ve TBK'ya göre değerlendirilir. Süre dolmadan tek taraflı fesih genelde sınırlıdır.",
        ],
      },
      {
        title: "Sözleşmedeki fesih maddesi",
        paragraphs: [
          "Sözleşmede daha kısa süre veya ağır cezai şart yazılmış olabilir. İmza öncesi fesih maddesini Clause ile tarayın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fesih bildirimi e-posta ile olur mu?",
        answer:
          "Sözleşme ve kanun yazılı şekil ister; e-posta ancak tarafların kabul ettiği veya kanunun öngördüğü hallerde geçerli olabilir. Noter veya iadeli taahhütlü mektup daha güvenlidir.",
      },
    ],
    ctaHref: "/hukuki-analiz/kira-sozlesmesi-feshi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "kefil-sorumlulugu-kira",
    h1: "Kira sözleşmesinde kefil sorumluluğu — ne kadar, ne zaman?",
    metaTitle: "Kira kefaleti sorumluluğu — kefil rehberi 2026",
    metaDescription:
      "Kira sözleşmesinde kefil olmak ne demek? Kefil sorumluluğu, süre sınırı ve miras. Kefalet metnini ücretsiz AI ile kontrol edin.",
    keywords: ["kira kefaleti", "kefil sorumluluğu kira", "kira sözleşmesi kefil", "kefalet süresi"],
    intro:
      "Kira kefaleti, kiracının borcunu ödememesi halinde ev sahibinin kefile başvurmasına izin verir. Kefalet sözleşmesi yazılı şekle tabidir ve süre sınırı vardır.",
    sections: [
      {
        title: "Kefil neyi üstlenir?",
        paragraphs: [
          "Kira bedeli, yan giderler ve sözleşmede açıkça yazılmış alacaklar kefalet kapsamına girebilir. Belirsiz 'tüm borçlar' ifadesi risklidir.",
        ],
      },
      {
        title: "Kefalet süresi",
        paragraphs: [
          "TBK'da kefalet süresi sınırlandırılmıştır. Süre uzatımı için yeni yazılı irade gerekir; otomatik uzama her zaman geçerli değildir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kefil tahliye sonrası da sorumlu mu?",
        answer: "Kefalet metnindeki kapsam ve süre belirleyicidir; genel kefalet ile sınırlı kefalet farklı sonuç doğurur.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "abonelik-iptal-dijital-hizmet",
    h1: "Dijital abonelik iptali — üyelik ve otomatik yenileme rehberi",
    metaTitle: "Abonelik iptal hakkı — dijital hizmet sözleşmesi 2026",
    metaDescription:
      "Netflix, Spotify, SaaS ve online üyelik iptali. Otomatik yenileme, cayma ve tüketici hakları. Üyelik sözleşmesi ücretsiz AI analizi.",
    keywords: [
      "abonelik iptal",
      "üyelik iptal hakkı",
      "otomatik yenileme iptal",
      "dijital abonelik sözleşmesi",
    ],
    intro:
      "Dijital aboneliklerde otomatik yenileme ve gizli iptal engelleri sık şikayet konusudur. Mesafeli sözleşme ve tüketici mevzuatı belirli haklar tanır.",
    sections: [
      {
        title: "Cayma ve iptal farkı",
        paragraphs: [
          "14 günlük cayma hakkı ile abonelik döneminde iptal farklı kurallara tabidir. Hizmet ifası başladıysa cayma istisnaları devreye girebilir.",
        ],
      },
      {
        title: "Otomatik yenileme maddesi",
        paragraphs: [
          "Sözleşmede belirsiz 'sessiz yenileme' ifadeleri risklidir. İptal prosedürünün açık yazılması gerekir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İptal butonu yoksa ne yapılır?",
        answer: "Yazılı iptal talebi ve tüketici şikayet hatları değerlendirilebilir; sözleşme metnini saklayın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/uyelik-sozlesmesi-dijital",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "ucretsiz-sozlesme-analizi-nasil",
    h1: "Ücretsiz sözleşme analizi nasıl yapılır? — adım adım rehber",
    metaTitle: "Ücretsiz sözleşme analizi 2026 — yapay zeka ile kontrol",
    metaDescription:
      "Kira, iş ve ticari sözleşmeleri ücretsiz AI ile analiz etme rehberi. Riskli maddeler, TBK uyumu ve avukat öncesi özet.",
    keywords: [
      "ücretsiz sözleşme analizi",
      "sözleşme analizi ücretsiz",
      "ücretsiz kontrat kontrolü",
      "yapay zeka sözleşme ücretsiz",
    ],
    intro:
      "Ücretsiz sözleşme analizi, imza öncesi metni yapay zeka ile tarayarak riskli maddeleri işaretlemektir. Clause günlük ücretsiz ön tarama sunar; avukatlık hizmeti yerine geçmez.",
    sections: [
      {
        title: "Hangi sözleşmeler taranır?",
        paragraphs: [
          "Kira, iş, freelance, hizmet alımı, KVKK metni ve dijital üyelik sözleşmeleri ön taramaya uygundur.",
        ],
      },
      {
        title: "Analiz sonrası ne yapmalı?",
        paragraphs: [
          "Risk özeti ile müzakere edin veya avukata danışın. Yüksek tutarlı sözleşmelerde mutlaka profesyonel inceleme şarttır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ücretsiz analiz yeterli mi?",
        answer: "Ön bilgi için evet; dava veya büyük ticari işlem için avukat şarttır.",
      },
    ],
    ctaHref: "/#dene",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "is-sozlesmesi-ucret-kesintisi",
    h1: "İş sözleşmesinde ücret kesintisi — hangi kesintiler yasal?",
    metaTitle: "Ücret kesintisi iş hukuku — çalışan hakları 2026",
    metaDescription:
      "Maaştan yapılabilecek kesintiler, disiplin cezası ve tazminat mahsubu. İş sözleşmesi ücretsiz AI analizi.",
    keywords: ["ücret kesintisi", "maaş kesintisi yasal mı", "iş sözleşmesi kesinti", "ücretten kesinti"],
    intro:
      "İşverenin çalışan ücretinden kesinti yapabilmesi kanunda sınırlıdır. Sözleşmede geniş kesinti yetkisi yazılsa bile geçersiz olabilir.",
    sections: [
      {
        title: "Yasal kesinti sınırları",
        paragraphs: [
          "İş Kanunu ücretin ödenmesini ve kesinti sınırlarını korur. İşçi rızası her kesinti için yeterli değildir.",
        ],
      },
      {
        title: "Disiplin ve tazminat",
        paragraphs: [
          "Disiplin cezası ile maddi tazminat mahsubu farklı usullere tabidir. Yazılı savunma hakkı gözetilmelidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hatalı kesinti için dava açılır mı?",
        answer: "Evet; alacak davası ve iş mahkemesi yolları değerlendirilebilir.",
      },
    ],
    ctaHref: "/hukuki-analiz/ucret-kesintisi-anlasmazligi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "tuketici-sikayet-hatti-rehber",
    h1: "Tüketici şikayet hattı ve başvuru rehberi — 2026",
    metaTitle: "Tüketici şikayet hattı — nasıl başvurulur?",
    metaDescription:
      "Alo 175, tüketici hakem heyeti ve Bakanlık başvurusu. Online alışveriş ve hizmet şikayetleri için adım adım rehber.",
    keywords: [
      "tüketici şikayet hattı",
      "alo 175",
      "tüketici şikayeti nasıl yapılır",
      "tüketici hakları başvuru",
    ],
    intro:
      "Tüketici şikayetleri önce satıcıya yazılı bildirimle çözülmeye çalışılır. Sonuç alınamazsa hakem heyeti ve resmi şikayet kanalları devreye girer.",
    sections: [
      {
        title: "Önce satıcıya yazın",
        paragraphs: [
          "E-posta, uygulama içi destek veya iadeli taahhütlü mektup ile talebinizi kayıt altına alın. Sipariş no ve fatura ekleyin.",
        ],
      },
      {
        title: "Hakem heyeti",
        paragraphs: [
          "Belirli tutar sınırları içinde ücretsiz hakem heyeti başvurusu yapılabilir. Süre ve belge eksikliği ret sebebidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Şikayet ne kadar sürer?",
        answer: "Kanal ve dosya yoğunluğuna göre haftalar ile aylar arasında değişir.",
      },
    ],
    ctaHref: "/blog/tuketici-hakem-heyeti-basvuru-blog",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "online-alisveris-14-gun-cayma",
    h1: "Online alışverişte 14 gün cayma hakkı — detaylı rehber",
    metaTitle: "Online alışveriş cayma hakkı 14 gün — tüketici rehberi",
    metaDescription:
      "İnternetten alışverişte 14 gün cayma, iade kargo ücreti ve istisnalar. Mesafeli satış sözleşmesi ücretsiz kontrol.",
    keywords: [
      "online alışveriş cayma",
      "14 gün cayma hakkı",
      "internetten alışveriş iade",
      "mesafeli satış cayma",
    ],
    intro:
      "Mesafeli sözleşmelerde tüketici genel olarak 14 gün içinde sebep göstermeden cayabilir. Ancak kişiye özel ürün ve hijyen istisnaları vardır.",
    sections: [
      {
        title: "Süre ne zaman başlar?",
        paragraphs: [
          "Mal tesliminde ürünü aldığınız gün; hizmette sözleşme günü esas alınır. Satıcı cayma formu sunmak zorundadır.",
        ],
      },
      {
        title: "İade masrafları",
        paragraphs: [
          "Cayma hakkı kullanımında iade kargo kural olarak tüketiciye aittir; satıcı 'ücretsiz iade' taahhüdü verebilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İndirimli üründe cayma var mı?",
        answer: "Evet; indirim cayma hakkını ortadan kaldırmaz, istisna ürün grubu değilse.",
      },
    ],
    ctaHref: "/rehber/mesafeli-satis-cayma",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "yapay-zeka-hukuk-guvenilir-mi",
    h1: "Yapay zeka hukuk güvenilir mi? — dürüst değerlendirme",
    metaTitle: "Yapay zeka hukuk güvenilir mi? — 2026 rehber",
    metaDescription:
      "Legal AI güvenilirliği, hata riski ve avukat ile farkı. Türkiye'de yapay zeka hukuk asistanı kullanırken bilmeniz gerekenler.",
    keywords: [
      "yapay zeka hukuk güvenilir mi",
      "legal AI güvenilir mi",
      "hukuki yapay zeka riskleri",
      "AI avukat güvenli mi",
    ],
    intro:
      "Yapay zeka hukuk araçları hızlı ön bilgi sunar ancak hata yapabilir. Güvenilir kullanım = doğru beklenti + kritik konularda avukat desteği.",
    sections: [
      {
        title: "Güçlü yanlar",
        paragraphs: [
          "Uzun sözleşmeleri hızlı tarar, riskli maddeyi işaretler, sade dilde özet üretir.",
        ],
      },
      {
        title: "Sınırlar",
        paragraphs: [
          "Güncel içtihat, yerel mahkeme uygulaması ve somut dava stratejisi AI'ın zayıf noktasıdır. KVKK ve veri güvenliği sağlayıcıya göre değişir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause verilerimi saklar mı?",
        answer: "Güvenlik sayfamızda veri işleme ve saklama politikası açıklanır; hassas metinlerde dikkatli olun.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-avukat-mi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "miras-kira-sozlesmesi-devri",
    h1: "Miras ve kira sözleşmesi — ölüm halinde kiracı hakları",
    metaTitle: "Mirasçı kira sözleşmesi — devam ve fesih rehberi",
    metaDescription:
      "Ev sahibi veya kiracı vefatında kira sözleşmesi ne olur? Mirasçıların hak ve yükümlülükleri. Ücretsiz kira analizi.",
    keywords: ["miras kira sözleşmesi", "kiracı ölümü kira", "ev sahibi ölümü kira", "kira miras"],
    intro:
      "Taraflardan birinin ölümü kira ilişkisini sona erdirmez; mirasçılar hukuki duruma girer. Sözleşme ve TBK hükümleri birlikte uygulanır.",
    sections: [
      {
        title: "Kiracının ölümü",
        paragraphs: [
          "Aile konutu ve birlikte yaşayanların durumu özel kurallara tabidir. Mirasçılar sözleşmeyi belirli koşullarda sürdürebilir.",
        ],
      },
      {
        title: "Ev sahibinin ölümü",
        paragraphs: [
          "Yeni malik kira sözleşmesine taraf olur; keyfi tahliye hakkı doğmaz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mirasçı sözleşmeyi feshedebilir mi?",
        answer: "Kanuni ve sözleşmesel fesih şartları mirasçı için de geçerlidir.",
      },
    ],
    ctaHref: "/rehber/aile-konutu-kirasi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "is-yeri-ticari-kira-rehberi",
    h1: "İş yeri ve ticari kira sözleşmesi — KOBİ rehberi",
    metaTitle: "Ticari kira sözleşmesi — iş yeri kiracı hakları 2026",
    metaDescription:
      "Dükkan, ofis ve iş yeri kira sözleşmesi. Artış, tadilat, fesih ve depozito. Ticari kira ücretsiz AI analizi.",
    keywords: [
      "ticari kira sözleşmesi",
      "iş yeri kira",
      "dükkan kira sözleşmesi",
      "ticari kira artışı",
    ],
    intro:
      "Ticari kiralarda konut kirasından farklı artış ve fesih kuralları uygulanabilir. KOBİ'ler sözleşmedeki tadilat, işletme devri ve cezai şart maddelerine dikkat etmelidir.",
    sections: [
      {
        title: "Artış ve yenileme",
        paragraphs: [
          "Ticari kira artışı sözleşme serbestisi ile belirlenir; ancak aşırı dengesizlik iddiası yargıda tartışılabilir.",
        ],
      },
      {
        title: "Tadilat ve dekorasyon",
        paragraphs: [
          "Kim öder, çıkışta ne kalır — yazılmazsa uyuşmazlık çıkar.",
        ],
      },
    ],
    faqs: [
      {
        question: "İş yeri kirasında tahliye taahhüdü geçerli mi?",
        answer: "Şekil şartları ve TBK hükümleri birlikte değerlendirilir; ayrı rehberimize bakın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "hukuki-danismanlik-ucretsiz-secenekler",
    h1: "Ücretsiz hukuki danışmanlık seçenekleri — ne mümkün, ne değil?",
    metaTitle: "Ücretsiz hukuki danışmanlık 2026 — rehber ve AI araçları",
    metaDescription:
      "Ücretsiz hukuki danışmanlık nereden alınır? Baro, tüketici hakem heyeti ve yapay zeka ön tarama. Sınırlar ve güvenli kullanım.",
    keywords: [
      "ücretsiz hukuki danışmanlık",
      "ücretsiz avukat danışmanlık",
      "hukuki danışmanlık ücretsiz",
      "ücretsiz hukuk asistanı",
    ],
    intro:
      "Tamamen ücretsiz ve sınırsız avukatlık hizmeti nadirdir; ancak bilgilendirme rehberleri, kamu kanalları ve AI ön tarama günlük ihtiyaçları karşılayabilir.",
    sections: [
      {
        title: "Kamu ve baro kanalları",
        paragraphs: [
          "Baroların belirli günlerde ücretsiz danışmanlık uygulamaları ve tüketici hakem heyeti başvuruları değerlendirilebilir.",
        ],
      },
      {
        title: "AI ön tarama",
        paragraphs: [
          "Clause gibi araçlar sözleşme riskini ücretsiz özetler; dava ve vekalet yerine geçmez.",
        ],
      },
    ],
    faqs: [
      {
        question: "AI ile dava açılır mı?",
        answer: "Hayır; dava usulü ve strateji için avukat gerekir.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
    updatedAt: "2026-07-11",
  }),
];
