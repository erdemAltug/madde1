import { createRehberPage } from "@/lib/seo/rehber-factory";

/** +20 rehber — uzun kuyruk SEO */
export const REHBER_EXTENDED_PAGES = [
  createRehberPage({
    slug: "tahliye-taahhutnamesi-rehberi",
    h1: "Tahliye taahhütnamesi rehberi — geçerli mi, nasıl iptal edilir?",
    metaTitle: "Tahliye taahhütnamesi rehberi 2026 — şartlar ve riskler",
    metaDescription:
      "Tahliye taahhütnamesi ne zaman geçerlidir, hangi hatalar geçersiz kılar? Kiracı ve ev sahibi için TBK çerçevesinde sade rehber ve ücretsiz AI ön kontrol.",
    keywords: [
      "tahliye taahhütnamesi",
      "tahliye taahhütnamesi geçerliliği",
      "tahliye taahhütnamesi iptal",
      "kira tahliye",
    ],
    intro:
      "Tahliye taahhütnamesi, kira ilişkisinde en çok tartışılan belgelerden biridir. Tek başına her durumda tahliyeye izin vermez; şekil şartları ve TBK hükümleri birlikte değerlendirilir.",
    sections: [
      {
        title: "Ne zaman geçerlidir?",
        paragraphs: [
          "Taahhütname genellikle kira sözleşmesiyle birlikte veya sonrasında düzenlenir. Kiracının iradesi baskı altında değilse, süre ve adres net yazılmışsa ve kanuni çerçeveye uygunsa daha güçlü kabul edilir.",
          "Aile konutu kiralarında ek koruma kuralları uygulanabilir; tek taraflı ağır şartlar sorgulanmalıdır.",
        ],
      },
      {
        title: "Sık yapılan hatalar",
        paragraphs: [
          "Boşluk bırakılmış formlar, okunmayan küçük puntolar veya el yazısıyla sonradan eklenen maddeler uyuşmazlık doğurur.",
          "Süre veya kira bedeli belirsizse taahhüdün icrası zorlaşır; mahkeme somut olaya göre karar verir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İmzaladığım tahliye taahhütnamesinden vazgeçebilir miyim?",
        answer:
          "Her somut olay farklıdır; baskı, bilgilendirme eksikliği veya hukuka aykırı şartlar iddia edilebilir. Belgelerinizi saklayın ve hukuki değerlendirme alın.",
      },
    ],
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    ctaLabel: "Tahliye taahhütnamesini AI ile kontrol edin",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-ornek-maddeler",
    h1: "Kira sözleşmesinde olması gereken maddeler",
    metaTitle: "Kira sözleşmesi örnek maddeler — kontrol listesi 2026",
    metaDescription:
      "Konut ve iş yeri kira sözleşmesinde bedel, artış, depozito, bakım ve fesih maddeleri. İmzalamadan önce kontrol listesi ve ücretsiz analiz.",
    keywords: ["kira sözleşmesi maddeleri", "kira sözleşmesi örnek", "kira kontratı"],
    intro:
      "İyi bir kira sözleşmesi, tarafların haklarını yazılı olarak netleştirir. Eksik madde, ileride pahalı uyuşmazlığa dönüşür.",
    sections: [
      {
        title: "Zorunlu sayılabilecek başlıklar",
        paragraphs: [
          "Tarafların kimliği, kiralananın adresi, kira bedeli, ödeme günü, süre, depozito, artış yöntemi ve teslim-tesellüm şekli açık olmalıdır.",
          "Bakım-onarım, aidat, vergi ve sigorta yükümlülükleri yazılmazsa varsayılan kanun hükümleri devreye girer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözlü kira anlaşması geçerli mi?",
        answer:
          "Bazı hallerde geçerli olabilir ancak ispat zordur. Yazılı sözleşme her iki taraf için de güvence sağlar.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ctaLabel: "Kira sözleşmesi analizi",
  }),
  createRehberPage({
    slug: "is-sozlesmesi-belirsiz-maddeler",
    h1: "İş sözleşmesinde riskli ve belirsiz maddeler",
    metaTitle: "İş sözleşmesi belirsiz maddeler — çalışan için riskler",
    metaDescription:
      "Rekabet yasağı, gizlilik, fazla mesai, performans ve fesih maddelerinde sık hatalar. İş sözleşmesi ücretsiz AI kontrolü.",
    keywords: ["iş sözleşmesi maddeleri", "iş sözleşmesi riskleri", "belirsiz iş sözleşmesi"],
    intro:
      "İş sözleşmelerindeki belirsiz ifadeler çoğu zaman işveren lehine yorumlanmaya çalışılır. İmzalamadan önce netleştirilmesi gerekir.",
    sections: [
      {
        title: "Dikkat edilmesi gereken maddeler",
        paragraphs: [
          "Süresiz rekabet yasağı, tek taraflı cezai şart, belirsiz performans kriterleri ve geniş gizlilik tanımları çalışan açısından risklidir.",
          "Fazla mesai ve ücret kalemleri ayrı yazılmalı; ‘tüm yan haklar dahil’ gibi genel ifadeler soru işaretidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İş sözleşmesini sonradan değiştirebilirler mi?",
        answer:
          "İşçinin açık rızası olmadan aleyhine köklü değişiklik yapılamaz. Yeni metni imzalamadan önce inceleyin.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ctaLabel: "İş sözleşmesi risk analizi",
  }),
  createRehberPage({
    slug: "freelance-sozlesme-rehberi",
    h1: "Freelance ve serbest çalışan sözleşmesi rehberi",
    metaTitle: "Freelance sözleşme rehberi — ödeme, telif, fesih",
    metaDescription:
      "Serbest çalışan sözleşmesinde kapsam, teslim, ödeme vadesi, telif devri ve gizlilik. Yazılım ve tasarım freelance için pratik rehber.",
    keywords: ["freelance sözleşme", "serbest çalışan sözleşmesi", "freelance kontrat"],
    intro:
      "Freelance ilişkide yazılı sözleşme, ödeme gecikmesi ve ‘scope creep’ risklerini azaltır. Sözlü anlaşma çoğu uyuşmazlıkta yetersiz kalır.",
    sections: [
      {
        title: "Ödeme ve teslim",
        paragraphs: [
          "İş tanımı, revizyon sayısı, teslim formatı ve ödeme takvimi net olmalıdır. Avans ve ara ödemeler yazılmazsa nakit akışı zorlanır.",
          "Gecikme faizi veya cezai şart makul oranda olmalı; tek taraflı fesih hakkı dengeli tanımlanmalıdır.",
        ],
      },
      {
        title: "Telif ve kullanım hakkı",
        paragraphs: [
          "Eserin mülkiyeti ve lisans kapsamı açıkça devredilmelidir. Portföy kullanımı ve kaynak kodu teslimi ayrıca yazılmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fatura kesmeden çalışmak riskli mi?",
        answer:
          "Vergisel ve hukuki yükümlülükler ayrı konudur; sözleşme ticari ilişkiyi düzenler. Mali müşavirden destek alın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/freelance-yazilim-kontrati",
    ctaLabel: "Freelance kontrat analizi",
  }),
  createRehberPage({
    slug: "gizlilik-sozlesmesi-kvkk",
    h1: "Gizlilik sözleşmesi ve KVKK uyumu",
    metaTitle: "Gizlilik sözleşmesi KVKK rehberi — veri ve NDA",
    metaDescription:
      "Gizlilik sözleşmesi ile KVKK aydınlatma yükümlülükleri farklıdır. İş ortaklığı ve çalışan verisi için pratik uyum rehberi.",
    keywords: ["gizlilik sözleşmesi", "KVKK sözleşme", "veri gizliliği sözleşmesi"],
    intro:
      "Gizlilik taahhüdü, kişisel verilerin hukuka uygun işlenmesinin yerine geçmez. KVKK kapsamında ayrı süreçler gerekir.",
    sections: [
      {
        title: "NDA ile KVKK farkı",
        paragraphs: [
          "NDA ticari sırları korur; KVKK kişisel veri işleme şartlarını düzenler. İkisi birlikte kullanılabilir ancak birbirinin yerine geçmez.",
          "Veri işleyen / veri sorumlusu rolleri sözleşmede net tanımlanmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Çalışan gizlilik sözleşmesi KVKK yerine geçer mi?",
        answer: "Hayır. Aydınlatma, açık rıza (gerekli hallerde) ve teknik-idari tedbirler ayrıca gerekir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/gizlilik-sozlesmesi-nda",
    ctaLabel: "Gizlilik sözleşmesi kontrolü",
  }),
  createRehberPage({
    slug: "mobbing-is-yerinde",
    h1: "İş yerinde mobbing — haklar ve belgeleme",
    metaTitle: "Mobbing nedir? İş yerinde haklar rehberi",
    metaDescription:
      "Sistematik baskı, aşağılama ve dışlama mobbing sayılabilir. Belgeleme, başvuru yolları ve iş sözleşmesi fesih bağlantısı.",
    keywords: ["mobbing", "iş yerinde mobbing", "psikolojik taciz iş hukuku"],
    intro:
      "Mobbing, iş ilişkisinde kişiyi hedef alan sürekli olumsuz davranışlardır. İspat için yazılı kayıt kritiktir.",
    sections: [
      {
        title: "Nasıl belgelenir?",
        paragraphs: [
          "E-posta, mesaj, tanık ve sağlık raporları delil olabilir. Olayları tarih-saat ile not edin.",
          "İç şikayet prosedürü varsa yazılı kullanın; yoksa işverene resmi bildirim düşünün.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mobbing nedeniyle işten çıkabilir miyim?",
        answer:
          "Haklı fesih ve tazminat talepleri somut delile bağlıdır. Hukuki destek alın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  createRehberPage({
    slug: "kira-feshi-hakli-nedenler",
    h1: "Kira sözleşmesi feshi — haklı nedenler",
    metaTitle: "Kira feshi haklı nedenler — kiracı ve mal sahibi",
    metaDescription:
      "Kira borcu, ihtiyaç, ayıp ve sözleşme ihlali gibi fesih sebepleri. TBK çerçevesinde sade özet ve sözleşme analizi.",
    keywords: ["kira feshi", "kira sözleşmesi fesih", "kiracı tahliye sebepleri"],
    intro:
      "Kira ilişkisinin sona ermesi kanunda ve sözleşmede ayrı yollarla düzenlenir. Keyfi fesih geçerli değildir.",
    sections: [
      {
        title: "Kiracı açısından",
        paragraphs: [
          "Kiralananın ayıplı teslimi, tahliye edilmeme veya ağır ihlal hallerinde haklı fesih tartışılabilir.",
          "Bildirim süreleri ve yazılı şekil şartlarına uyulmalıdır.",
        ],
      },
      {
        title: "Mal sahibi açısından",
        paragraphs: [
          "Kira borcu, sözleşmeye aykırı kullanım veya kanuni ihtiyaç gibi sebepler somut delille ileri sürülmelidir.",
          "Tahliye davası veya geçerli taahhüt ayrı prosedürlerdir.",
        ],
      },
    ],
    faqs: [
      {
        question: "3 ay kira ödenmezse ne olur?",
        answer:
          "Kanuni süreçler ve sözleşme hükümleri birlikte uygulanır. Doğrudan kapı değiştirme veya eşya atma hukuka aykırıdır.",
      },
    ],
    ctaHref: "/hukuki-analiz/kira-sozlesmesi-feshi",
  }),
  createRehberPage({
    slug: "aile-konutu-kirasi",
    h1: "Aile konutu kira sözleşmesi — özel kurallar",
    metaTitle: "Aile konutu kirası rehberi — eş onayı ve tahliye",
    metaDescription:
      "Aile konutu olarak kiralanan taşınmazda eş onayı, tahliye taahhüdü ve koruma kuralları. Kiracı ve mal sahibi rehberi.",
    keywords: ["aile konutu kira", "aile konutu kirası", "eş onayı kira"],
    intro:
      "Aile konutu statüsü, kiracıya ek koruma sağlayan kurallar getirir. Sözleşme ve taahhütnameler bu çerçevede okunmalıdır.",
    sections: [
      {
        title: "Eş onayı",
        paragraphs: [
          "Mal sahibi eşinin açık rızası olmadan aile konutunu kiraya veremeyebilir. Rıza yazılı veya sözlü ispatlanabilir.",
          "Kiracı iyiniyetle kiraladıysa bazı hallerde korunur; somut olay önemlidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Aile konutu tahliye taahhütnamesi farklı mı?",
        answer: "Değerlendirme daha sıkı yapılabilir; belgeyi imzalamadan önce uzman görüşü alın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
  createRehberPage({
    slug: "depozito-ne-kadar-alinir",
    h1: "Kira depozitosu ne kadar olabilir?",
    metaTitle: "Depozito ne kadar alınır? Kira depozito limiti rehberi",
    metaDescription:
      "Depozito tutarı, bankada bloke ve iade süreci. Kiracı ve ev sahibi için güncel pratik bilgiler.",
    keywords: ["kira depozitosu ne kadar", "depozito limiti", "depozito bloke"],
    intro:
      "Depozito, kiracının borçlarına karşılık teminattır. Tutar ve iade şekli sözleşmede ve uygulamada sık tartışılır.",
    sections: [
      {
        title: "Tutar ve bloke",
        paragraphs: [
          "Piyasa uygulamasında genelde birkaç aylık kira bedeli talep edilir; aşırı tutarlar müzakere konusudur.",
          "Bloke hesap veya depozito hesabı kullanımı tarafların anlaşmasına bağlıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito faiz işler mi?",
        answer: "Sözleşme ve hesap türüne göre değişir; yazılı hüküm yoksa uyuşmazlık çıkabilir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
    ctaLabel: "Depozito iadesi rehberi",
  }),
  createRehberPage({
    slug: "fazla-mesai-ucreti",
    h1: "Fazla mesai ücreti nasıl hesaplanır?",
    metaTitle: "Fazla mesai ücreti rehberi — İş Kanunu özeti",
    metaDescription:
      "Fazla çalışma, gece ve hafta tatili ücretleri. Çalışan hakları ve iş sözleşmesinde dikkat edilecekler.",
    keywords: ["fazla mesai ücreti", "fazla mesai hesaplama", "mesai ücreti"],
    intro:
      "Fazla mesai, kanunda sınırlı ve ücretlendirilmesi zorunlu bir çalışma biçimidir. Yazılı onay ve kayıt şarttır.",
    sections: [
      {
        title: "Hesaplama mantığı",
        paragraphs: [
          "Normal ücretin belirli oranlarla artırılması esastır. Serbest zaman (comp time) ancak kanuni şartlarda mümkündür.",
          "Puantaj ve bordro kayıtları ispat için kritiktir.",
        ],
      },
    ],
    faqs: [
      {
        question: "‘Yönetici’ olduğum için mesai alamam mıyım?",
        answer:
          "Unvan tek başına yeterli değildir; kanundaki istisna şartları somut işe göre değerlendirilir.",
      },
    ],
    ctaHref: "/rehber/isci-haklari",
    ctaLabel: "İşçi hakları rehberi",
  }),
  createRehberPage({
    slug: "arac-kiralama-sozlesmesi",
    h1: "Araç kiralama sözleşmesi — dikkat edilecek maddeler",
    metaTitle: "Araç kiralama sözleşmesi rehberi — hasar ve depozito",
    metaDescription:
      "Rent-a-car ve uzun dönem araç kiralama: km limiti, hasar, sigorta, depozito ve erken iade. Riskli maddeler özeti.",
    keywords: ["araç kiralama sözleşmesi", "rent a car sözleşme", "oto kiralama kontrat"],
    intro:
      "Araç kiralama sözleşmelerinde küçük puntolu maddeler yüksek faturalara dönüşebilir. Teslim formunu ve fotoğrafları saklayın.",
    sections: [
      {
        title: "Hasar ve sigorta",
        paragraphs: [
          "Muafiyet bedeli, cam-far hasarı ve lastik muafiyeti ayrı yazılmalıdır.",
          "Kaza anında prosedür ve yetkili servis zorunluluğu tek taraflı ağır olabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito kredi kartından ne zaman çekilir?",
        answer: "Sözleşmedeki provizyon ve iade süresine bakın; itiraz için belge toplayın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/arac-kiralama-sozlesmesi",
  }),
  createRehberPage({
    slug: "garanti-belgesi-haklari",
    h1: "Garanti belgesi ve tüketici hakları",
    metaTitle: "Garanti belgesi rehberi — ayıp ve iade hakları",
    metaDescription:
      "Ücretsiz garanti süresi, yetkili servis zorunluluğu ve ayıplı mal. Tüketici rehberi ve sözleşme kontrolü.",
    keywords: ["garanti belgesi", "garanti süresi", "ayıplı mal hakları"],
    intro:
      "Garanti, satıcının ayıp halinde ücretsiz onarım veya değişim taahhüdüdür. Belgedeki kısıtlamalar kanuna aykırı olamaz.",
    sections: [
      {
        title: "Tüketici ne yapabilir?",
        paragraphs: [
          "Ayıp bildirimi zamanında ve yazılı yapılmalıdır. Servis kayıtlarını saklayın.",
          "Garanti dışı bırakılan parçalar veya tümü reddeden genel şartlar sorgulanabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Garanti uzatma ücretli mi olabilir?",
        answer: "İsteğe bağlı uzatılmış garanti ayrı sözleşmedir; zorunlu satılamaz.",
      },
    ],
    ctaHref: "/rehber/tuketici-haklari",
    ctaLabel: "Tüketici hakları",
  }),
  createRehberPage({
    slug: "e-ticaret-iade-haklari",
    h1: "E-ticaret iade ve değişim hakları",
    metaTitle: "Online alışveriş iade rehberi — tüketici hakları",
    metaDescription:
      "Mesafeli satışta iade süresi, kargo ücreti ve istisnalar. Pazaryeri ve mağaza farkları özeti.",
    keywords: ["e-ticaret iade", "online alışveriş iade", "internetten alışveriş iade"],
    intro:
      "Online alışverişte cayma hakkı güçlüdür; ancak her ürün kapsam dışı değildir. Sipariş onay e-postasını saklayın.",
    sections: [
      {
        title: "İade süreci",
        paragraphs: [
          "14 günlük cayma süresine dikkat edin; süre teslimden işlemeye başlar.",
          "İade kargo ücreti sözleşmede kime ait olduğu yazılmalıdır; aksi kanuna aykırı olabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İndirimli ürün iade edilir mi?",
        answer: "Cayma hakkı bedel indiriminden bağımsız olarak genel kurallara tabidir; istisna ürünlere dikkat.",
      },
    ],
    ctaHref: "/rehber/mesafeli-satis-cayma",
  }),
  createRehberPage({
    slug: "yazilim-telif-sozlesmesi",
    h1: "Yazılım telif hakkı ve lisans sözleşmesi",
    metaTitle: "Yazılım telif devri rehberi — lisans ve SaaS",
    metaDescription:
      "Kaynak kodu devri, kullanım lisansı, SaaS hizmet şartları ve bakım. Yazılım sözleşmesi analizi.",
    keywords: ["yazılım telif hakkı", "yazılım lisans sözleşmesi", "kaynak kodu devri"],
    intro:
      "Yazılım satın almak çoğu zaman lisans almaktır. Mülkiyet ve kaynak kodu teslimi açık yazılmazsa uyuşmazlık kaçınılmazdır.",
    sections: [
      {
        title: "Lisans türleri",
        paragraphs: [
          "Süreli, bölgesel, kullanıcı sayısına bağlı ve özel amaçlı lisanslar sözleşmede net olmalıdır.",
          "Açık kaynak bileşenler ve üçüncü taraf kütüphaneler için uyumluluk maddesi eklenmelidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "SaaS sözleşmesinde veri kimin?",
        answer: "Veri sahipliği, yedekleme ve silme (export) hakları ayrı madde olmalıdır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/yazilim-lisans-sozlesmesi",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-damga-vergisi",
    h1: "Kira sözleşmesi damga vergisi rehberi",
    metaTitle: "Kira sözleşmesi damga vergisi — kim öder, nasıl hesaplanır?",
    metaDescription:
      "Kira bedeli üzerinden damga vergisi yükümlülüğü ve ödeme zamanı. Ücretsiz damga vergisi hesaplama aracı.",
    keywords: ["kira sözleşmesi damga vergisi", "damga vergisi kira", "kira kontrat damga"],
    intro:
      "Damga vergisi, kira sözleşmesinin tabi olduğu mali yükümlülüklerden biridir. Oran ve matrah güncel mevzuata göre hesaplanır.",
    sections: [
      {
        title: "Kim öder?",
        paragraphs: [
          "Kanuni düzenleme ve sözleşme hükmü birlikte değerlendirilir; çoğu uygulamada taraflar paylaşır veya kiracı üstlenir.",
          "Ödenmeyen damga vergisi ceza doğurabilir; sözleşme geçerliliği ayrı tartışılır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Damga vergisi ödenmeden sözleşme geçersiz mi?",
        answer: "Geçerlilik ve yaptırım ayrı konulardır; uzman görüşü alın.",
      },
    ],
    ctaHref: "/araclar/damga-vergisi-hesaplama",
    ctaLabel: "Damga vergisi hesapla",
  }),
  createRehberPage({
    slug: "yapay-zeka-sozlesme-kontrolu",
    h1: "Yapay zeka ile sözleşme kontrolü nasıl yapılır?",
    metaTitle: "Yapay zeka sözleşme kontrolü — ücretsiz ön tarama",
    metaDescription:
      "AI ile sözleşme analizi: riskli maddeler, eksik hükümler ve TBK özeti. Clause ile ücretsiz ön kontrol adımları.",
    keywords: [
      "yapay zeka sözleşme kontrolü",
      "ai sözleşme analizi",
      "yapay zeka hukuk",
    ],
    intro:
      "Yapay zeka, uzun sözleşmeleri dakikalar içinde özetleyebilir; ancak avukatlık hizmetinin yerine geçmez. Bilinçli karar için ilk adım olarak kullanılmalıdır.",
    sections: [
      {
        title: "Ne kontrol edilir?",
        paragraphs: [
          "Tek taraflı cezai şartlar, belirsiz tanımlar, otomatik yenileme, geniş feragat ve gizlilik maddeleri öne çıkar.",
          "Kira ve iş sözleşmelerinde artış, fesih ve depozito başlıkları ayrıca taranır.",
        ],
      },
    ],
    faqs: [
      {
        question: "AI analizi mahkemede delil olur mu?",
        answer:
          "Özet bilgilendirme amaçlıdır; resmi hukuki görüş için avukata başvurun.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    ctaLabel: "Ücretsiz AI analiz",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-sure-uzatma",
    h1: "Kira sözleşmesi süre uzatma ve yenileme",
    metaTitle: "Kira sözleşmesi uzatma — otomatik yenileme maddesi",
    metaDescription:
      "Belirli süreli kira, uzama ve yenileme bildirimi. Sözleşmede otomatik yenileme maddesi riskleri.",
    keywords: ["kira sözleşmesi uzatma", "kira yenileme", "otomatik yenileme kira"],
    intro:
      "Süre bitiminde sözleşme sona erebilir veya kanuni/ sözleşmesel uzama hükümleri devreye girebilir. Bildirim sürelerini kaçırmayın.",
    sections: [
      {
        title: "Yenileme vs yeni sözleşme",
        paragraphs: [
          "Yeni dönem için artış oranı ve şartlar yazılı netleştirilmelidir.",
          "Sessiz kalma ile uzama hallerinde kanuni kurallar uygulanır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Süre bitince otomatik yenilenir mi?",
        answer: "Sözleşme metnine ve kira türüne göre değişir; metni okuyun veya analiz ettirin.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  }),
  createRehberPage({
    slug: "tuketici-arabuluculuk",
    h1: "Tüketici uyuşmazlıklarında arabuluculuk",
    metaTitle: "Tüketici arabuluculuk rehberi — başvuru ve süreç",
    metaDescription:
      "Tüketici hakem heyeti ve arabuluculuk yolları. Ayıplı mal ve hizmet şikayetleri için pratik adımlar.",
    keywords: ["tüketici arabuluculuk", "tüketici hakem heyeti", "tüketici şikayet"],
    intro:
      "Tüketici uyuşmazlıklarında dava açmadan önce alternatif çözüm yolları hızlı ve düşük maliyetli olabilir.",
    sections: [
      {
        title: "Başvuru yolları",
        paragraphs: [
          "Tüketici hakem heyetleri belirli parasal sınırlara kadar ücretsiz çözüm sunabilir.",
          "E-devlet ve il/ilçe tüketici kurulları üzerinden başvuru yapılabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Avukat gerekir mi?",
        answer: "Küçük uyuşmazlıklarda çoğu başvuru bireysel yapılır; yüksek bedellerde destek alın.",
      },
    ],
    ctaHref: "/rehber/tuketici-haklari",
  }),
  createRehberPage({
    slug: "isveren-yukumlulukleri",
    h1: "İşverenin temel yükümlülükleri",
    metaTitle: "İşveren yükümlülükleri rehberi — ücret, OHS, eşitlik",
    metaDescription:
      "Ücret ödeme, iş güvenliği, mobbing önleme ve eşit davranma. Çalışanların bilmesi gereken işveren borçları.",
    keywords: ["işveren yükümlülükleri", "işveren borçları", "İş Kanunu işveren"],
    intro:
      "İşveren, işçinin sağlığı, ücreti ve onurunu koruyacak özeni göstermekle yükümlüdür. İhlal fesih ve tazminat doğurabilir.",
    sections: [
      {
        title: "Ücret ve bordro",
        paragraphs: [
          "Asgari ücret altı ücret yasaktır. SGK ve vergi kesintileri şeffaf gösterilmelidir.",
          "Ücret gecikmesinde işçi faiz ve gecikme tazminatı talep edebilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşveren tek taraflı ücret kesebilir mi?",
        answer: "Kesinti ancak kanuni veya yazılı rızaya dayalı hallerde mümkündür.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  createRehberPage({
    slug: "sozlesme-cezai-sart",
    h1: "Sözleşmede cezai şart — ne kadar geçerli?",
    metaTitle: "Cezai şart rehberi — TBK ve indirim",
    metaDescription:
      "Cezai şart ile tazminat farkı, aşırı cezai şart indirimi ve tek taraflı maddeler. Sözleşme analizi önerisi.",
    keywords: ["cezai şart", "sözleşme cezai şart", "cezai şart indirimi"],
    intro:
      "Cezai şart, borcun ifa edilmemesi halinde önceden kararlaştırılan bedeldir. Her tutar mahkemece aynen tahsil edilmeyebilir.",
    sections: [
      {
        title: "Aşırı cezai şart",
        paragraphs: [
          "Hâkim, aşırı gördüğü cezai şartı indirebilir. Özellikle tüketici ve işçi sözleşmelerinde dikkat edilir.",
          "Belirsiz veya gizli cezai şartlar geçersizlik riski taşır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cezai şart ile ceza farkı",
        answer: "Cezai şart özel hukuk borcudur; ceza hukuku yaptırımı değildir.",
      },
    ],
    ctaHref: "/hukuki-analiz/sozlesme-risk-analizi",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-bildirim-sureleri",
    h1: "Kira sözleşmesinde bildirim süreleri",
    metaTitle: "Kira bildirim süreleri — artış ve fesih",
    metaDescription:
      "Kira artışı bildirimi, fesih ihtarı ve süre uzatma için süreler. Kaçırılmaması gereken tarihler.",
    keywords: ["kira bildirim süresi", "kira artış bildirimi süre", "kira fesih süresi"],
    intro:
      "Kira hukukunda birçok hak, süreye bağlıdır. Bildirimin yazılı ve tebliğ edilebilir olması ispat açısından önemlidir.",
    sections: [
      {
        title: "Artış bildirimi",
        paragraphs: [
          "Yeni dönem kira tutarı ve hesaplama yöntemi açık yazılmalıdır.",
          "Süresinde yapılmayan veya hatalı bildirim itiraz konusu olur.",
        ],
      },
    ],
    faqs: [
      {
        question: "WhatsApp mesajı bildirim sayılır mı?",
        answer: "İspat zorluğu vardır; mümkünse noter veya iadeli taahhütlü yazı tercih edin.",
      },
    ],
    ctaHref: "/rehber/kira-artisi-haklari",
  }),
  createRehberPage({
    slug: "uzaktan-calisma-sozlesmesi",
    h1: "Uzaktan çalışma sözleşmesi rehberi",
    metaTitle: "Uzaktan çalışma sözleşmesi — hak ve yükümlülükler",
    metaDescription:
      "Evden çalışma, ekipman, mesai kaydı ve veri güvenliği maddeleri. İş sözleşmesi eki olarak uzaktan çalışma.",
    keywords: ["uzaktan çalışma sözleşmesi", "evden çalışma sözleşmesi", "remote çalışma"],
    intro:
      "Uzaktan çalışma kalıcı hale geldikçe yazılı düzenleme şart. İş yeri dışında çalışma koşulları net olmalıdır.",
    sections: [
      {
        title: "Ekipman ve masraf",
        paragraphs: [
          "İnternet, elektrik ve donanım masraflarının kime ait olduğu yazılmalıdır.",
          "İş kazası ve mesai sınırları uzaktan çalışmada da geçerlidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Uzaktan çalışan fazla mesai yapar mı?",
        answer: "Kayıt tutulmazsa ispat zorlaşır; çalışma saatleri sözleşmede belirtilmeli.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  createRehberPage({
    slug: "kira-sozlesmesi-sablon-riskleri",
    h1: "İnternetten indirilen kira sözleşmesi şablonu riskleri",
    metaTitle: "Kira sözleşmesi şablonu riskleri — ücretsiz form uyarısı",
    metaDescription:
      "Hazır kira kontratı şablonları neden tehlikeli? Eksik maddeler ve güncel olmayan oranlar. AI ile kontrol.",
    keywords: ["kira sözleşmesi şablonu", "kira kontratı örnek word", "ücretsiz kira sözleşmesi"],
    intro:
      "Ücretsiz şablonlar hızlı başlangıç sağlar ancak çoğu güncel mevzuata ve özel durumunuza uygun değildir.",
    sections: [
      {
        title: "Sık eksikler",
        paragraphs: [
          "Depozito iadesi, artış formülü, aile konutu notu ve aidat paylaşımı atlanır.",
          "Tahliye taahhüdü şablonla birlikte sunuluyorsa ayrı değerlendirin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Noter onaylı şablon daha mı güvenli?",
        answer: "Şekil güçlenir; içerik yine okunmalı ve güncellenmelidir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
];
