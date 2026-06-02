import { createRehberPage } from "@/lib/seo/rehber-factory";
import type { BlogPostConfig } from "@/lib/seo/rehber-types";

function blog(
  input: Parameters<typeof createRehberPage>[0] & {
    excerpt: string;
    publishedAt: string;
  },
): BlogPostConfig {
  return { ...createRehberPage(input), excerpt: input.excerpt, publishedAt: input.publishedAt };
}

const POSTS: BlogPostConfig[] = [
  blog({
    slug: "kira-sozlesmesi-riskli-maddeler-2026",
    h1: "2026'da kira sözleşmesinde en riskli 7 madde",
    metaTitle: "Kira sözleşmesi riskli maddeler 2026 — kontrol listesi",
    metaDescription:
      "Artış, depozito, tahliye taahhüdü ve tek taraflı cezai şartlar. İmzalamadan önce ücretsiz AI taraması.",
    keywords: ["kira sözleşmesi riskleri", "riskli kira maddeleri", "kira kontratı 2026"],
    excerpt: "Kira sözleşmesinde en sık uyuşmazlık çıkaran maddeleri ve korunma yollarını özetliyoruz.",
    publishedAt: "2026-06-01",
    intro:
      "Her yıl binlerce kiracı ve mal sahibi, sözleşmedeki bir-iki cümle yüzünden mahkemelik oluyor. Bu yazıda 2026 pratiğinde en sık gördüğümüz riskli başlıkları topladık.",
    sections: [
      {
        title: "Belirsiz artış formülü",
        paragraphs: [
          "‘Piyasa koşullarına göre’ gibi ifadeler hangi oranın uygulanacağını belirsiz bırakır.",
          "Yasal tavan ve bildirim süreleri ayrıca kontrol edilmelidir.",
        ],
      },
      {
        title: "Geniş tahliye taahhüdü",
        paragraphs: [
          "Ayrı belge olarak sunulan taahhütnameler, kira sözleşmesinden daha ağır sonuç doğurabilir.",
          "İmzalamadan önce metni Clause ile ücretsiz ön tarayabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşmeyi sonradan düzeltebilir miyim?",
        answer: "Tarafların anlaşmasıyla ek protokol mümkün olabilir; mevcut hükümler geçerliliğini korur.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ctaLabel: "Kira sözleşmesi analizi",
  }),
  blog({
    slug: "yapay-zeka-sozlesme-analizi-nasil-calisir",
    h1: "Yapay zeka sözleşme analizi nasıl çalışır?",
    metaTitle: "AI sözleşme analizi nasıl çalışır? — Clause rehberi",
    metaDescription:
      "Metin yükleme, risk özeti, TBK bağlamı ve gizlilik. Türkiye için legal AI assistant kullanım adımları.",
    keywords: ["yapay zeka sözleşme analizi", "ai sözleşme nasıl", "legal ai nasıl çalışır"],
    excerpt: "AI sözleşme analizinin adımlarını ve sınırlarını anlatıyoruz — avukat yerine geçmez.",
    publishedAt: "2026-05-28",
    intro:
      "Yapay zeka, uzun hukuki metinleri saniyeler içinde özetleyebilir. Clause bu süreci Türkçe ve TBK bağlamında sunar.",
    sections: [
      {
        title: "Üç adım",
        paragraphs: [
          "Sözleşme metnini yapıştırın veya örnek metinle deneyin.",
          "Risk özeti ve eksik madde uyarılarını okuyun; gerekirse detaylı analiz açın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Verilerim saklanır mı?",
        answer: "Güvenlik politikamızda analiz sonrası kalıcı saklama yapılmadığı belirtilir; güncel metni okuyun.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
  }),
  blog({
    slug: "tahliye-taahhutnamesi-7-hata",
    h1: "Tahliye taahhütnamesinde 7 kritik hata",
    metaTitle: "Tahliye taahhütnamesi hataları — kiracı rehberi",
    metaDescription:
      "Boşluk bırakma, baskı, aile konutu ve süre hataları. Ücretsiz AI ön kontrol aracı.",
    keywords: ["tahliye taahhütnamesi hataları", "tahliye taahhütnamesi geçersiz"],
    excerpt: "Kiracıların en sık düştüğü tahliye taahhütnamesi tuzakları.",
    publishedAt: "2026-05-25",
    intro: "Tek sayfalık bir belge, yıllarca süren tahliye davasına dönüşebilir.",
    sections: [
      {
        title: "Boş alan bırakmak",
        paragraphs: [
          "Tarih veya süre sonradan doldurulacaksa irade sakatlanmış sayılabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Taahhütnamesi olmadan tahliye olur mu?",
        answer: "Kanuni diğer yollar (kira borcu, süre bitimi vb.) ayrı değerlendirilir.",
      },
    ],
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
  }),
  blog({
    slug: "is-sozlesmesi-imzalamadan-once-5-soru",
    h1: "İş sözleşmesi imzalamadan önce 5 soru",
    metaTitle: "İş sözleşmesi imzalamadan önce sorulacak 5 soru",
    metaDescription:
      "Rekabet yasağı, gizlilik, ücret, fesih ve deneme süresi. Çalışanlar için pratik liste.",
    keywords: ["iş sözleşmesi imzalamadan", "iş sözleşmesi sorular"],
    excerpt: "İşe başlamadan önce sözleşmede mutlaka netleştirmeniz gereken başlıklar.",
    publishedAt: "2026-05-22",
    intro: "İlk iş gününden önce beş dakikalık kontrol, yıllarca sürecek yükümlülükleri şekillendirir.",
    sections: [
      {
        title: "Rekabet ve gizlilik",
        paragraphs: [
          "İşten ayrıldıktan sonra kaç yıl, hangi sektörde çalışamayacağınız yazıyor mu?",
        ],
      },
    ],
    faqs: [
      {
        question: "Deneme süresi kaç ay olabilir?",
        answer: "İş Kanunu ve toplu iş sözleşmesi sınırlarına tabidir; sözleşmeyi okuyun.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  blog({
    slug: "tbk-kira-artisi-2026-pratik",
    h1: "TBK ve kira artışı — 2026 pratik özeti",
    metaTitle: "Kira artışı TBK 2026 — kiracı ve mal sahibi",
    metaDescription:
      "Konut kira artış tavanı, bildirim ve itiraz. Ücretsiz kira artış hesaplama aracı.",
    keywords: ["TBK kira artışı", "kira artışı 2026", "konut kira artış oranı"],
    excerpt: "Kira artışında kanuni çerçeve ve hesaplama aracı bağlantısı.",
    publishedAt: "2026-05-20",
    intro: "Kira artışı hem kiracı hem mal sahibi için yılın en stresli konusudur.",
    sections: [
      {
        title: "Bildirim şartı",
        paragraphs: [
          "Yeni tutar ve gerekçe yazılı iletilmelidir; süre kaçırılmamalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hesaplayıcı yasal tavsiye midir?",
        answer: "Hayır; tahmini bilgi sunar, kesin sonuç için uzman görüşü alın.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  }),
  blog({
    slug: "depozito-iadesi-reddedildi",
    h1: "Depozito iadesi reddedildi — ne yapmalı?",
    metaTitle: "Depozito iadesi reddedildi — kiracı adımları",
    metaDescription:
      "Kesinti gerekçesi, tutanak ve yazışma. Depozito uyuşmazlığında izlenecek yol.",
    keywords: ["depozito iadesi reddedildi", "depozito geri alamıyorum"],
    excerpt: "Mal sahibi depozitoyu keserse kiracının toplayacağı deliller.",
    publishedAt: "2026-05-18",
    intro: "Tahliye sonrası depozito tartışması çok yaygındır; belge eksikliği kaybettirir.",
    sections: [
      {
        title: "Delil toplama",
        paragraphs: [
          "Giriş ve çıkış tutanağı, fotoğraflar ve e-posta yazışmalarını arşivleyin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hemen dava açmalı mıyım?",
        answer: "Önce yazılı ihtar ve arabuluculuk/uzlaşma yolları değerlendirilebilir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
  }),
  blog({
    slug: "freelance-sozlesme-turkiye-ipuclari",
    h1: "Türkiye'de freelance sözleşme ipuçları",
    metaTitle: "Freelance sözleşme Türkiye — ödeme ve telif",
    metaDescription:
      "Serbest çalışan sözleşmesinde kapsam, revizyon ve ödeme. Yazılım ve tasarım için pratik öneriler.",
    keywords: ["freelance sözleşme türkiye", "serbest çalışan kontrat"],
    excerpt: "Freelance işlerde en sık yaşanan ödeme ve kapsam sorunları.",
    publishedAt: "2026-05-15",
    intro: "‘Zaten anlaştık’ cümlesi mahkemede zayıf delildir.",
    sections: [
      {
        title: "Kapsamı kilitleyin",
        paragraphs: [
          "Revizyon sayısı, teslim formatı ve ek iş ücreti yazılmazsa süreç uzar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözlü anlaşma yeterli mi?",
        answer: "İspat zorluğu yüksektir; yazılı sözleşme şiddetle önerilir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/freelance-yazilim-kontrati",
  }),
  blog({
    slug: "kvkk-aydinlatma-metni-zorunlu-mu",
    h1: "KVKK aydınlatma metni ne zaman zorunlu?",
    metaTitle: "KVKK aydınlatma metni zorunluluğu — KOBİ rehberi",
    metaDescription:
      "Web sitesi, çalışan ve müşteri verisi için aydınlatma yükümlülüğü. Gizlilik sözleşmesi farkı.",
    keywords: ["KVKK aydınlatma metni", "aydınlatma zorunlu mu"],
    excerpt: "Aydınlatma ile gizlilik sözleşmesi arasındaki fark.",
    publishedAt: "2026-05-12",
    intro: "Kişisel veri işleyen her işletme, hangi hallerde ne yapacağını bilmelidir.",
    sections: [
      {
        title: "Temel yükümlülük",
        paragraphs: [
          "Veri sorumlusu, ilgili kişiyi aydınlatmakla yükümlüdür; metin erişilebilir olmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hazır şablon yeterli mi?",
        answer: "Faaliyete özel uyarlanmalıdır; şablon başlangıç noktasıdır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi",
  }),
  blog({
    slug: "legal-ai-turkiye-karsilastirma",
    h1: "Legal AI Türkiye — ne beklemeli?",
    metaTitle: "Legal AI Türkiye karşılaştırması — Clause perspektifi",
    metaDescription:
      "Türkçe sözleşme analizi, mevzuat bağlamı ve ücretsiz ön tarama. Legal tech seçerken kriterler.",
    keywords: ["legal AI Türkiye", "hukuk yapay zeka türkiye", "legal tech türkiye"],
    excerpt: "Türkiye pazarında legal AI aracı seçerken dikkat edilecekler.",
    publishedAt: "2026-05-10",
    intro: "Global araçlar Türkçe TBK ve Yargıtay bağlamında zayıf kalabilir.",
    sections: [
      {
        title: "Dil ve mevzuat",
        paragraphs: [
          "Modelin Türkçe sözleşme ve güncel kanun özetlerini anlayıp anlamadığını test edin.",
        ],
      },
    ],
    faqs: [
      {
        question: "AI avukatın yerini alır mı?",
        answer: "Hayır; bilgilendirme ve ön tarama içindir.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/legal-ai-turkiye",
  }),
  blog({
    slug: "ucretsiz-sozlesme-analizi-araclari",
    h1: "Ücretsiz sözleşme analizi araçları — 2026",
    metaTitle: "Ücretsiz sözleşme analizi araçları karşılaştırması",
    metaDescription:
      "AI ön tarama, hesaplayıcılar ve rehberler. Clause ücretsiz kira, iş ve ticari sözleşme kontrolü.",
    keywords: ["ücretsiz sözleşme analizi", "ücretsiz kontrat kontrol"],
    excerpt: "Ücretsiz başlayabileceğiniz sözleşme kontrol yolları.",
    publishedAt: "2026-05-08",
    intro: "Hukuki destek almadan önce metni anlamak için ücretsiz araçlar kullanılabilir.",
    sections: [
      {
        title: "AI ön tarama",
        paragraphs: [
          "Clause ile metni yapıştırarak risk özetini dakikalar içinde alabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ücretsiz analiz sınırsız mı?",
        answer: "Beta döneminde günlük limit uygulanabilir; güncel koşulları siteden kontrol edin.",
      },
    ],
    ctaHref: "/#dene",
  }),
  blog({
    slug: "kobi-sozlesme-yonetimi",
    h1: "KOBİ'ler için sözleşme yönetimi",
    metaTitle: "KOBİ sözleşme yönetimi — şablon ve AI",
    metaDescription:
      "Tedarik, kira, iş ve gizlilik sözleşmelerini KOBİ ölçeğinde yönetme. Tekrarlayan riskleri azaltma.",
    keywords: ["KOBİ sözleşme yönetimi", "şirket sözleşme arşivi"],
    excerpt: "Küçük işletmelerin sözleşme kaosunu azaltma rehberi.",
    publishedAt: "2026-05-05",
    intro: "KOBİ'lerde sözleşmeler e-posta eklerinde kaybolur; risk birikir.",
    sections: [
      {
        title: "Merkezi arşiv",
        paragraphs: [
          "İmzalı PDF'leri tek klasörde toplayın; yenileme tarihlerini takvimleyin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Her sözleşme için avukat şart mı?",
        answer: "Rutin sözleşmelerde AI ön tarama + kritik olanlarda avukat modeli maliyetlidir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/ticari-sozlesme",
  }),
  blog({
    slug: "mesafeli-satis-iptal-rehberi",
    h1: "Mesafeli satış iptal rehberi — cayma hakkı",
    metaTitle: "Mesafeli satış iptal — 14 gün cayma",
    metaDescription:
      "Online alışveriş iptali, iade kargo ve istisnai ürünler. Tüketici rehberi.",
    keywords: ["mesafeli satış iptal", "cayma hakkı iptal"],
    excerpt: "Cayma hakkını kullanırken dikkat edilecekler.",
    publishedAt: "2026-05-03",
    intro: "Cayma hakkı güçlü olsa da süre ve ürün türü sınırları vardır.",
    sections: [
      {
        title: "İptal bildirimi",
        paragraphs: [
          "Satıcının belirttiği kanala yazılı bildirim yapın; onay e-postasını saklayın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kullanılmış ürün iade edilir mi?",
        answer: "Ürünün deneme dışı kullanımı cayma hakkını etkileyebilir.",
      },
    ],
    ctaHref: "/rehber/mesafeli-satis-cayma",
  }),
  blog({
    slug: "is-kanunu-fesih-sureleri-ozet",
    h1: "İş Kanunu fesih süreleri — kısa özet",
    metaTitle: "İş sözleşmesi fesih süreleri — ihbar süreleri",
    metaDescription:
      "Belirsiz süreli iş sözleşmesinde ihbar süreleri ve kıdem. Çalışan özeti.",
    keywords: ["ihbar süresi", "iş sözleşmesi fesih süresi", "işten çıkarma süresi"],
    excerpt: "Fesih ve ihbar sürelerine hızlı bakış.",
    publishedAt: "2026-05-01",
    intro: "İş ilişkisinin sona ermesinde süreler hak kaybına yol açabilir.",
    sections: [
      {
        title: "İhbar süreleri",
        paragraphs: [
          "Kıdeme göre artan ihbar süreleri İş Kanunu'nda düzenlenmiştir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İhbar tazminatı ile kıdem farkı",
        answer: "Farklı hukuki başlıklardır; her ikisi de koşullara bağlıdır.",
      },
    ],
    ctaHref: "/rehber/kidem-ihbar-tazminati",
  }),
  blog({
    slug: "dijital-imza-sozlesme-guvenligi",
    h1: "Dijital imza ve sözleşme güvenliği",
    metaTitle: "Dijital imza sözleşme — e-imza geçerliliği",
    metaDescription:
      "E-imza, ıslak imza ve elektronik onay farkları. Online sözleşme imzalarken dikkat.",
    keywords: ["dijital imza sözleşme", "e-imza sözleşme geçerliliği"],
    excerpt: "Elektronik imzanın sözleşmedeki yeri.",
    publishedAt: "2026-04-28",
    intro: "Dijitalleşme hızlandıkça imza türleri karışıyor.",
    sections: [
      {
        title: "E-imza",
        paragraphs: [
          "Nitelikli elektronik imza, elle atılan imza ile aynı sonucu doğurabilir; şekil şartlarına dikkat.",
        ],
      },
    ],
    faqs: [
      {
        question: "WhatsApp onayı bağlayıcı mı?",
        answer: "Somut olay ve ispat koşullarına bağlıdır; yazılı sözleşme tercih edilir.",
      },
    ],
    ctaHref: "/rehber/sozlesme-imzalamadan-once",
  }),
  blog({
    slug: "yapay-zeka-kira-sozlesmesi-blog",
    h1: "Yapay zeka ile kira sözleşmesi taraması",
    metaTitle: "Yapay zeka kira sözleşmesi analizi — Clause",
    metaDescription:
      "Kira kontratını AI ile tarama: artış, depozito, tahliye. Ücretsiz deneme.",
    keywords: ["yapay zeka kira sözleşmesi", "ai kira kontratı"],
    excerpt: "Kira sözleşmesinde AI taramanın pratik faydası.",
    publishedAt: "2026-04-25",
    intro: "Kira sözleşmeleri uzun ve teknik dille yazılır; AI özet sunar.",
    sections: [
      {
        title: "Ne çıkar?",
        paragraphs: [
          "Risk skoru, eksik madde uyarısı ve madde bazlı özet tek ekranda sunulabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mal sahibi de kullanabilir mi?",
        answer: "Evet; her iki taraf bilinçli karar için ön tarama yapabilir.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi",
  }),
];

export const BLOG_POSTS: Record<string, BlogPostConfig> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export const BLOG_SLUGS = POSTS.map((p) => p.slug);

export function getBlogPost(slug: string): BlogPostConfig | undefined {
  return BLOG_POSTS[slug];
}
