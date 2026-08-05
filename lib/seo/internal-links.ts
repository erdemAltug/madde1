/**
 * Merkezi iç linkleme haritası — B2C hukuk SEO için konu kümeleri.
 */

import { REHBER_SLUGS, getRehberConfig } from "@/lib/seo/rehber-pages";
import { BLOG_SLUGS, getBlogPost } from "@/lib/seo/blog-posts";

export type InternalLink = {
  href: string;
  label: string;
  description?: string;
};

function shortRehberLabel(cfg: NonNullable<ReturnType<typeof getRehberConfig>>): string {
  const fromH1 = cfg.h1.split("—")[0]?.trim();
  const fromTitle = cfg.metaTitle.split("—")[0]?.trim();
  const raw = fromH1 || fromTitle || cfg.h1;
  return raw.length > 52 ? `${raw.slice(0, 49)}…` : raw;
}

/** Tüm rehber sayfaları — footer ve hub için (dinamik) */
export const REHBER_HUB_LINKS: InternalLink[] = REHBER_SLUGS.map((slug) => {
  const cfg = getRehberConfig(slug)!;
  return {
    href: `/rehber/${slug}`,
    label: shortRehberLabel(cfg),
    description: cfg.metaDescription.slice(0, 90),
  };
});

const BLOG_HUB_LINKS: InternalLink[] = BLOG_SLUGS.map((slug) => {
  const post = getBlogPost(slug)!;
  return {
    href: `/blog/${slug}`,
    label: shortRehberLabel(post),
    description: post.metaDescription.slice(0, 90),
  };
});

/** Popüler sözleşme analizi sayfaları — footer ve iç linkler */
export const SOZLESME_ANALIZI_FEATURED: InternalLink[] = [
  {
    href: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    label: "Kira sözleşmesi analizi",
    description: "Artış, depozito, tahliye maddeleri.",
  },
  {
    href: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    label: "İş sözleşmesi riskleri",
    description: "Fesih, ücret, rekabet yasağı.",
  },
  {
    href: "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
    label: "Mesafeli satış sözleşmesi",
    description: "Cayma ve iade maddeleri.",
  },
  {
    href: "/sozlesme-analizi/freelance-yazilim-kontrati",
    label: "Freelance yazılım kontratı",
    description: "Telif, teslim, ödeme.",
  },
  {
    href: "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi",
    label: "KVKK aydınlatma metni",
    description: "Veri işleme uyumu.",
  },
  {
    href: "/sozlesme-analizi/kredi-sozlesmesi-on-analiz",
    label: "Kredi sözleşmesi",
    description: "Faiz, temerrüt, erken kapama.",
  },
  {
    href: "/sozlesme-analizi/ev-satis-sozlesmesi",
    label: "Ev satış sözleşmesi",
    description: "Kapora, tapu, ayıp.",
  },
  {
    href: "/sozlesme-analizi/uyelik-sozlesmesi-dijital",
    label: "Dijital üyelik sözleşmesi",
    description: "Abonelik ve otomatik yenileme.",
  },
];

/** Yapay zeka + hukuk SEO kümesi */
export const YAPAY_ZEKA_HUKUK_LINKS: InternalLink[] = [
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani",
    label: "Yapay zeka hukuk asistanı",
    description: "Ücretsiz ön tarama ve risk özeti.",
  },
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    label: "Yapay zeka sözleşme analizi",
    description: "AI ile kontrat risk taraması.",
  },
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi",
    label: "Yapay zeka kira sözleşmesi",
    description: "TBK bağlamında kira analizi.",
  },
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-is-sozlesmesi",
    label: "Yapay zeka iş sözleşmesi",
    description: "Fesih ve tazminat riskleri.",
  },
  {
    href: "/yapay-zeka-hukuk/legal-ai-turkiye",
    label: "Legal AI Türkiye",
    description: "Hukuk teknolojisi rehberi.",
  },
  {
    href: "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
    label: "Ücretsiz yapay zeka hukuk",
    description: "Günlük ücretsiz ön kontrol.",
  },
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-tahliye-taahhutnamesi",
    label: "AI tahliye taahhütnamesi",
    description: "Usul ve içerik kontrolü.",
  },
  {
    href: "/yapay-zeka-hukuk/yapay-zeka-avukat-mi",
    label: "Yapay zeka avukat mı?",
    description: "Doğru beklenti rehberi.",
  },
];

/** Hukuki analiz / problem sayfaları */
export const HUKUKI_ANALIZ_LINKS: InternalLink[] = [
  {
    href: "/hukuki-analiz/kira-sozlesmesi-feshi",
    label: "Kira sözleşmesi feshi",
    description: "Süre, ihbar ve tahliye.",
  },
  {
    href: "/hukuki-analiz/is-cikarilma-tazminat",
    label: "İşten çıkarılma ve tazminat",
    description: "Haksız fesih hakları.",
  },
  {
    href: "/hukuki-analiz/tahliye-taahhutnamesi",
    label: "Tahliye taahhütnamesi",
    description: "Geçerlilik ve sonuçlar.",
  },
  {
    href: "/hukuki-analiz/sozlesme-risk-analizi",
    label: "Sözleşme risk analizi",
    description: "Riskli maddeleri anlama.",
  },
  {
    href: "/hukuki-analiz/depozito-anlasmazligi",
    label: "Depozito anlaşmazlığı",
    description: "İade ve kesinti uyuşmazlığı.",
  },
  {
    href: "/hukuki-analiz/haksiz-fesih",
    label: "Haksız fesih",
    description: "İş ve kira sözleşmelerinde.",
  },
  {
    href: "/hukuki-analiz/kira-borcu-takibi",
    label: "Kira borcu takibi",
    description: "İcra ve tahsil süreci.",
  },
  {
    href: "/hukuki-analiz/abonelik-iptal-anlasmazligi",
    label: "Abonelik iptal anlaşmazlığı",
    description: "Dijital üyelik hakları.",
  },
  {
    href: "/hukuki-analiz/ucret-kesintisi-anlasmazligi",
    label: "Ücret kesintisi anlaşmazlığı",
    description: "Maaş kesintisi hakları.",
  },
];

const SOZLESME_CLUSTER_MAP: Record<string, string[]> = {
  "kira-sozlesmesi-analizi": [
    "/rehber/kiraci-haklari",
    "/rehber/kira-artisi-haklari",
    "/rehber/depozito-iadesi",
    "/rehber/tahliye-sureci",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/hukuki-analiz/kira-sozlesmesi-feshi",
    "/hukuki-analiz/tahliye-taahhutnamesi",
  ],
  "is-sozlesmesi-riskleri": [
    "/rehber/isci-haklari",
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/rehber/kidem-ihbar-tazminati",
    "/hukuki-analiz/is-cikarilma-tazminat",
    "/hukuki-analiz/haksiz-fesih",
    "/sozlesme-analizi/calisan-adi-sozlesmesi",
    "/sozlesme-analizi/stajyer-sozlesmesi",
  ],
  "mesafeli-satis-sozlesmesi": [
    "/rehber/tuketici-haklari",
    "/rehber/mesafeli-satis-cayma",
    "/rehber/sozlesme-imzalamadan-once",
  ],
  "freelance-yazilim-kontrati": [
    "/rehber/sozlesme-imzalamadan-once",
    "/sozlesme-analizi/yazilim-lisans-sozlesmesi",
    "/sozlesme-analizi/gizlilik-sozlesmesi-nda",
  ],
  "ev-satis-sozlesmesi": [
    "/rehber/sozlesme-imzalamadan-once",
    "/araclar/damga-vergisi-hesaplama",
  ],
  "kredi-sozlesmesi-on-analiz": [
    "/rehber/tuketici-haklari",
    "/rehber/sozlesme-imzalamadan-once",
  ],
  "uyelik-sozlesmesi-dijital": [
    "/rehber/tuketici-haklari",
    "/rehber/mesafeli-satis-cayma",
    "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi",
  ],
};

const REHBER_CLUSTER_MAP: Record<string, string[]> = {
  "kiraci-haklari": ["/rehber/kira-artisi-haklari", "/rehber/depozito-iadesi", "/rehber/tahliye-sureci", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "isci-haklari": ["/rehber/isten-cikarilinca-ne-yapilir", "/rehber/kidem-ihbar-tazminati", "/rehber/fazla-mesai-ucreti", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "tuketici-haklari": ["/rehber/mesafeli-satis-cayma", "/rehber/e-ticaret-iade-haklari", "/rehber/tuketici-sikayet-hatti-rehber", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "sozlesme-imzalamadan-once": ["/rehber/sozlesme-cezai-sart", "/rehber/sozlesme-iptal-cayma-farki", "/rehber/yapay-zeka-sozlesme-kontrolu", "/hukuki-analiz/sozlesme-risk-analizi"],
  "depozito-iadesi": ["/rehber/depozito-ne-kadar-alinir", "/rehber/kibris-kira-depozito-anlasmazligi", "/hukuki-analiz/depozito-anlasmazligi", "/blog/depozito-iadesi-yazili-ihtar-ornek"],
  "kira-artisi-haklari": ["/rehber/kiraci-haklari", "/rehber/is-yeri-ticari-kira-rehberi", "/araclar/kira-sozlesmesi-artis-orani-hesaplama", "/blog/kira-artisi-2026-hesaplama-rehberi-blog"],
  "isten-cikarilinca-ne-yapilir": ["/rehber/kidem-ihbar-tazminati", "/rehber/iscinin-hakli-fesih-hakki", "/hukuki-analiz/is-cikarilma-tazminat", "/araclar/ihbar-tazminati-hesaplama"],
  "kidem-ihbar-tazminati": ["/rehber/isten-cikarilinca-ne-yapilir", "/rehber/iscinin-hakli-fesih-hakki", "/araclar/kidem-tazminati-hesaplama", "/araclar/ihbar-tazminati-hesaplama"],
  "tahliye-sureci": ["/rehber/tahliye-taahhutnamesi-rehberi", "/rehber/kira-feshi-hakli-nedenler", "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol", "/hukuki-analiz/tahliye-taahhutnamesi"],
  "mesafeli-satis-cayma": ["/rehber/online-alisveris-14-gun-cayma", "/rehber/e-ticaret-iade-haklari", "/rehber/tuketici-haklari", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "tahliye-taahhutnamesi-rehberi": ["/rehber/tahliye-sureci", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/hukuki-analiz/tahliye-taahhutnamesi", "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol"],
  "kira-sozlesmesi-ornek-maddeler": ["/rehber/kira-sozlesmesi-sablon-riskleri", "/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-cezai-sart", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "is-sozlesmesi-belirsiz-maddeler": ["/rehber/isci-haklari", "/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/is-sozlesmesi-ucret-kesintisi", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "freelance-sozlesme-rehberi": ["/rehber/hizmet-sozlesmesi-rehberi", "/rehber/yazilim-telif-sozlesmesi", "/blog/freelance-sozlesme-fatura-rehberi", "/sozlesme-analizi/freelance-yazilim-kontrati"],
  "gizlilik-sozlesmesi-kvkk": ["/rehber/kvkk-calisan-verisi", "/rehber/gizlilik-istihdam-sozlesmesi", "/blog/kvkk-aydinlatma-metni-zorunlu-mu", "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi"],
  "mobbing-is-yerinde": ["/rehber/isci-haklari", "/rehber/iscinin-hakli-fesih-hakki", "/rehber/isten-cikarilinca-ne-yapilir", "/hukuki-analiz/haksiz-fesih"],
  "kira-feshi-hakli-nedenler": ["/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/tahliye-sureci", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/hukuki-analiz/kira-sozlesmesi-feshi"],
  "aile-konutu-kirasi": ["/rehber/kira-sozlesmesi-bosanma", "/rehber/miras-kira-sozlesmesi-devri", "/rehber/kiraci-haklari", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "depozito-ne-kadar-alinir": ["/rehber/depozito-iadesi", "/rehber/kira-garanti-mektubu", "/rehber/kefil-sorumlulugu-kira", "/blog/depozito-kesinti-ornekleri"],
  "fazla-mesai-ucreti": ["/rehber/isci-haklari", "/rehber/is-sozlesmesi-ucret-kesintisi", "/rehber/iscinin-hakli-fesih-hakki", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "arac-kiralama-sozlesmesi": ["/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-cezai-sart", "/rehber/otomatik-yenileme-sozlesme", "/hukuki-analiz/sozlesme-risk-analizi"],
  "garanti-belgesi-haklari": ["/rehber/tuketici-haklari", "/rehber/e-ticaret-iade-haklari", "/rehber/tuketici-sikayet-hatti-rehber", "/blog/tuketici-hakem-heyeti-basvuru-blog"],
  "e-ticaret-iade-haklari": ["/rehber/mesafeli-satis-cayma", "/rehber/online-alisveris-14-gun-cayma", "/rehber/pazaryeri-tuketici-sikayet", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "yazilim-telif-sozlesmesi": ["/rehber/freelance-sozlesme-rehberi", "/rehber/hizmet-sozlesmesi-rehberi", "/blog/freelance-sozlesme-turkiye-ipuclari", "/sozlesme-analizi/freelance-yazilim-kontrati"],
  "kira-sozlesmesi-damga-vergisi": ["/rehber/is-yeri-ticari-kira-rehberi", "/rehber/kira-sozlesmesi-ornek-maddeler", "/araclar/damga-vergisi-hesaplama", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "yapay-zeka-sozlesme-kontrolu": ["/rehber/ucretsiz-sozlesme-analizi-nasil", "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi", "/blog/yapay-zeka-sozlesme-analizi-nasil-calisir", "/blog/sozlesme-madde-madde-analiz"],
  "kira-sozlesmesi-sure-uzatma": ["/rehber/otomatik-yenileme-sozlesme", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/kiraci-haklari"],
  "tuketici-arabuluculuk": ["/rehber/tuketici-sikayet-hatti-rehber", "/rehber/pazaryeri-tuketici-sikayet", "/rehber/tuketici-haklari", "/blog/tuketici-hakem-heyeti-basvuru-blog"],
  "isveren-yukumlulukleri": ["/rehber/is-kazasi-isveren-yukumluluk", "/rehber/kvkk-calisan-verisi", "/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/isci-haklari"],
  "sozlesme-cezai-sart": ["/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-iptal-cayma-farki", "/rehber/is-sozlesmesi-belirsiz-maddeler", "/hukuki-analiz/sozlesme-risk-analizi"],
  "kira-sozlesmesi-bildirim-sureleri": ["/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/kira-sozlesmesi-sure-uzatma", "/rehber/tahliye-sureci", "/hukuki-analiz/kira-sozlesmesi-feshi"],
  "uzaktan-calisma-sozlesmesi": ["/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/kvkk-calisan-verisi", "/blog/is-sozlesmesi-remote-calisan", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "kira-sozlesmesi-sablon-riskleri": ["/rehber/kira-sozlesmesi-ornek-maddeler", "/rehber/sozlesme-imzalamadan-once", "/blog/kira-sozlesmesi-riskli-maddeler-2026", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "aidat-ve-kira-faturasi": ["/rehber/kiraci-haklari", "/rehber/kira-artisi-haklari", "/rehber/kira-borcu-takibi-icra", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "deneme-suresi-rehberi": ["/rehber/isci-haklari", "/rehber/isten-cikarilinca-ne-yapilir", "/rehber/is-sozlesmesi-belirsiz-maddeler", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "is-kazasi-isveren-yukumluluk": ["/rehber/isveren-yukumlulukleri", "/rehber/isci-haklari", "/rehber/iscinin-hakli-fesih-hakki", "/hukuki-analiz/haksiz-fesih"],
  "gizlilik-istihdam-sozlesmesi": ["/rehber/kvkk-calisan-verisi", "/rehber/uzaktan-calisma-sozlesmesi", "/rehber/gizlilik-sozlesmesi-kvkk", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "kira-garanti-mektubu": ["/rehber/kefil-sorumlulugu-kira", "/rehber/depozito-ne-kadar-alinir", "/rehber/is-yeri-ticari-kira-rehberi", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "otomatik-yenileme-sozlesme": ["/rehber/kira-sozlesmesi-sure-uzatma", "/rehber/abonelik-iptal-dijital-hizmet", "/rehber/sozlesme-iptal-cayma-farki", "/sozlesme-analizi/uyelik-sozlesmesi-dijital"],
  "uyusmazlik-cozumu-tahkim": ["/rehber/tuketici-arabuluculuk", "/rehber/ticari-sozlesmesi-kobi-rehberi", "/rehber/sozlesme-cezai-sart", "/hukuki-analiz/sozlesme-risk-analizi"],
  "pazaryeri-tuketici-sikayet": ["/rehber/tuketici-sikayet-hatti-rehber", "/rehber/e-ticaret-iade-haklari", "/rehber/online-alisveris-14-gun-cayma", "/blog/tuketici-sikayet-2026-adim-adim"],
  "kira-sozlesmesi-bosanma": ["/rehber/aile-konutu-kirasi", "/rehber/miras-kira-sozlesmesi-devri", "/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/kiraci-haklari"],
  "iscinin-hakli-fesih-hakki": ["/rehber/isten-cikarilinca-ne-yapilir", "/rehber/kidem-ihbar-tazminati", "/rehber/is-sozlesmesi-ucret-kesintisi", "/hukuki-analiz/haksiz-fesih"],
  "staj-sozlesmesi-rehberi": ["/rehber/deneme-suresi-rehberi", "/rehber/isci-haklari", "/rehber/is-sozlesmesi-belirsiz-maddeler", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "kvkk-calisan-verisi": ["/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/gizlilik-sozlesmesi-kvkk", "/rehber/uzaktan-calisma-sozlesmesi", "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi"],
  "ticari-sozlesmesi-kobi-rehberi": ["/rehber/hizmet-sozlesmesi-rehberi", "/rehber/uyusmazlik-cozumu-tahkim", "/blog/kobi-sozlesme-yonetimi", "/hukuki-analiz/sozlesme-risk-analizi"],
  "hizmet-sozlesmesi-rehberi": ["/rehber/eser-sozlesmesi-rehberi", "/rehber/freelance-sozlesme-rehberi", "/rehber/ticari-sozlesmesi-kobi-rehberi", "/hukuki-analiz/sozlesme-risk-analizi"],
  "eser-sozlesmesi-rehberi": ["/rehber/hizmet-sozlesmesi-rehberi", "/rehber/yazilim-telif-sozlesmesi", "/rehber/sozlesme-cezai-sart", "/hukuki-analiz/sozlesme-risk-analizi"],
  "sponsorluk-sozlesmesi-rehberi": ["/rehber/hizmet-sozlesmesi-rehberi", "/rehber/ticari-sozlesmesi-kobi-rehberi", "/rehber/sozlesme-cezai-sart", "/hukuki-analiz/sozlesme-risk-analizi"],
  "kira-sozlesmesi-evcil-hayvan": ["/rehber/kiraci-haklari", "/rehber/kira-sozlesmesi-ornek-maddeler", "/rehber/kira-sozlesmesi-sablon-riskleri", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "sozlesme-iptal-cayma-farki": ["/rehber/sozlesme-imzalamadan-once", "/rehber/otomatik-yenileme-sozlesme", "/rehber/mesafeli-satis-cayma", "/hukuki-analiz/sozlesme-risk-analizi"],
  "google-yapay-zeka-hukuk-arama": ["/rehber/yapay-zeka-hukuk-guvenilir-mi", "/rehber/hukuki-danismanlik-ucretsiz-secenekler", "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani", "/blog/clause-vs-genel-ai-chat"],
  "kibris-kira-depozito-anlasmazligi": ["/rehber/depozito-iadesi", "/rehber/depozito-ne-kadar-alinir", "/hukuki-analiz/depozito-anlasmazligi", "/blog/depozito-iadesi-reddedildi"],
  "gunluk-hukuk-ihtiyaclari": ["/rehber/hukuki-danismanlik-ucretsiz-secenekler", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani", "/blog/gunluk-hukuk-isleri-yapay-zeka-2026"],
  "kira-borcu-takibi-icra": ["/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/kefil-sorumlulugu-kira", "/hukuki-analiz/kira-borcu-takibi", "/blog/kira-borcu-ne-zaman-tahliye"],
  "kira-sozlesmesi-fesih-bildirimi": ["/rehber/kira-feshi-hakli-nedenler", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/rehber/tahliye-sureci", "/hukuki-analiz/kira-sozlesmesi-feshi"],
  "kefil-sorumlulugu-kira": ["/rehber/kira-garanti-mektubu", "/rehber/kira-borcu-takibi-icra", "/rehber/depozito-ne-kadar-alinir", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "abonelik-iptal-dijital-hizmet": ["/rehber/otomatik-yenileme-sozlesme", "/rehber/online-alisveris-14-gun-cayma", "/hukuki-analiz/abonelik-iptal-anlasmazligi", "/sozlesme-analizi/uyelik-sozlesmesi-dijital"],
  "ucretsiz-sozlesme-analizi-nasil": ["/rehber/yapay-zeka-sozlesme-kontrolu", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/neden-clause-ucretsiz-sozlesme-analizi"],
  "is-sozlesmesi-ucret-kesintisi": ["/rehber/isci-haklari", "/rehber/fazla-mesai-ucreti", "/rehber/iscinin-hakli-fesih-hakki", "/hukuki-analiz/ucret-kesintisi-anlasmazligi"],
  "tuketici-sikayet-hatti-rehber": ["/rehber/tuketici-haklari", "/rehber/pazaryeri-tuketici-sikayet", "/rehber/tuketici-arabuluculuk", "/blog/tuketici-sikayet-2026-adim-adim"],
  "online-alisveris-14-gun-cayma": ["/rehber/mesafeli-satis-cayma", "/rehber/e-ticaret-iade-haklari", "/rehber/pazaryeri-tuketici-sikayet", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "yapay-zeka-hukuk-guvenilir-mi": ["/rehber/google-yapay-zeka-hukuk-arama", "/rehber/ucretsiz-sozlesme-analizi-nasil", "/yapay-zeka-hukuk/yapay-zeka-avukat-mi", "/blog/gunluk-hukuk-sorulari-yapay-zeka"],
  "miras-kira-sozlesmesi-devri": ["/rehber/aile-konutu-kirasi", "/rehber/kira-sozlesmesi-bosanma", "/rehber/kira-sozlesmesi-sure-uzatma", "/hukuki-analiz/kira-sozlesmesi-feshi"],
  "is-yeri-ticari-kira-rehberi": ["/rehber/kira-sozlesmesi-damga-vergisi", "/rehber/kira-garanti-mektubu", "/rehber/kira-artisi-haklari", "/araclar/damga-vergisi-hesaplama"],
  "hukuki-danismanlik-ucretsiz-secenekler": ["/rehber/gunluk-hukuk-ihtiyaclari", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/ucretsiz-hukuk-asistani-2026-karsilastirma"],
  "yillik-izin-haklari-2026": [
    "/rehber/isci-haklari",
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/araclar/kidem-tazminati-hesaplama",
  ],
  "ihbar-suresi-hesaplama-rehberi": [
    "/araclar/ihbar-tazminati-hesaplama",
    "/rehber/kidem-ihbar-tazminati",
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/blog/kidem-mi-ihbar-mi-fark-nedir",
  ],
  "kidem-tazminati-adim-adim": [
    "/araclar/kidem-tazminati-hesaplama",
    "/araclar/ihbar-tazminati-hesaplama",
    "/rehber/kidem-ihbar-tazminati",
    "/hukuki-analiz/is-cikarilma-tazminat",
  ],
  "tuketici-hakem-heyeti-basvuru-rehberi": [
    "/rehber/tuketici-haklari",
    "/rehber/tuketici-sikayet-hatti-rehber",
    "/blog/tuketici-sikayet-2026-adim-adim",
    "/rehber/mesafeli-satis-cayma",
  ],
  "kira-kontrat-kontrol-listesi-2026": [
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/rehber/kiraci-haklari",
    "/rehber/sozlesme-imzalamadan-once",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  ],
  "maas-gecikmesi-ne-yapmali": [
    "/rehber/isci-haklari",
    "/rehber/is-sozlesmesi-ucret-kesintisi",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/hukuki-analiz/ucret-kesintisi-anlasmazligi",
  ],
  "zorunlu-arabuluculuk-is-davasi": [
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/rehber/isci-haklari",
    "/hukuki-analiz/is-cikarilma-tazminat",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
  ],
  "fazla-mesai-reddetme-ve-ucret": [
    "/rehber/fazla-mesai-ucreti",
    "/rehber/isci-haklari",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/rehber/is-sozlesmesi-ucret-kesintisi",
  ],
  "ev-sahibi-keyfi-tahliye-edemez": [
    "/rehber/tahliye-sureci",
    "/rehber/kiraci-haklari",
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/hukuki-analiz/tahliye-taahhutnamesi",
  ],
  "dijital-abonelik-otomatik-yenileme-iptal": [
    "/rehber/abonelik-iptal-dijital-hizmet",
    "/rehber/otomatik-yenileme-sozlesme",
    "/sozlesme-analizi/uyelik-sozlesmesi-dijital",
    "/hukuki-analiz/abonelik-iptal-anlasmazligi",
  ],
  "is-sozlesmesi-imza-oncesi-15-kontrol": [
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/rehber/isci-haklari",
    "/rehber/sozlesme-imzalamadan-once",
    "/blog/is-sozlesmesi-imzalamadan-once-5-soru",
  ],
  "ucretsiz-hukuk-yardimi-ve-ai": [
    "/rehber/gunluk-hukuk-ihtiyaclari",
    "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
    "/araclar",
    "/#dene",
  ],
  "e-devlet-uyap-dava-dosyasi-sorgulama": [
    "/rehber/gunluk-hukuk-ihtiyaclari",
    "/rehber/icra-takibi-geldi-ne-yapmaliyim",
    "/rehber/zorunlu-arabuluculuk-is-davasi",
    "/haklarim",
  ],
  "icra-takibi-geldi-ne-yapmaliyim": [
    "/rehber/e-devlet-uyap-dava-dosyasi-sorgulama",
    "/rehber/maas-haczi-ne-kadar-kesilir",
    "/rehber/kira-borcu-takibi-icra",
    "/hukuki-analiz/kira-borcu-takibi",
  ],
  "maas-haczi-ne-kadar-kesilir": [
    "/rehber/icra-takibi-geldi-ne-yapmaliyim",
    "/rehber/isci-haklari",
    "/rehber/maas-gecikmesi-ne-yapmali",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
  ],
  "istifa-dilekcesi-verirken-dikkat": [
    "/rehber/isci-haklari",
    "/rehber/iscinin-hakli-fesih-hakki",
    "/rehber/kidem-tazminati-adim-adim",
    "/araclar/ihbar-tazminati-hesaplama",
  ],
  "isveren-maastan-kesinti-yapabilir-mi": [
    "/rehber/is-sozlesmesi-ucret-kesintisi",
    "/rehber/maas-gecikmesi-ne-yapmali",
    "/hukuki-analiz/ucret-kesintisi-anlasmazligi",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
  ],
  "kira-depozitosu-bankaya-yatirma": [
    "/rehber/depozito-iadesi",
    "/rehber/depozito-ne-kadar-alinir",
    "/hukuki-analiz/depozito-anlasmazligi",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
  ],
  "ev-sahibi-eve-izinsiz-girebilir-mi": [
    "/rehber/kiraci-haklari",
    "/rehber/ev-sahibi-keyfi-tahliye-edemez",
    "/rehber/tahliye-sureci",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
  ],
  "kiraci-kombi-bozulursa-kim-oder": [
    "/rehber/kiraci-haklari",
    "/rehber/aidat-ve-kira-faturasi",
    "/rehber/kira-kontrat-kontrol-listesi-2026",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
  ],
  "internetten-alinan-urun-iade-edilmezse": [
    "/rehber/online-alisveris-14-gun-cayma",
    "/rehber/mesafeli-satis-cayma",
    "/rehber/ayipli-mal-para-iadesi-hakki",
    "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
  ],
  "ayipli-mal-para-iadesi-hakki": [
    "/rehber/garanti-belgesi-haklari",
    "/rehber/tuketici-haklari",
    "/rehber/telefon-garanti-servis-suresi",
    "/rehber/tuketici-sikayet-hatti-rehber",
  ],
  "telefon-garanti-servis-suresi": [
    "/rehber/garanti-belgesi-haklari",
    "/rehber/ayipli-mal-para-iadesi-hakki",
    "/rehber/tuketici-haklari",
    "/blog/tuketici-sikayet-2026-adim-adim",
  ],
  "kargo-kayip-hasar-tuketici-haklari": [
    "/rehber/tuketici-haklari",
    "/rehber/internetten-alinan-urun-iade-edilmezse",
    "/rehber/mesafeli-satis-cayma",
    "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
  ],
};

const YAPAY_ZEKA_CLUSTER_MAP: Record<string, string[]> = {
  "yapay-zeka-hukuk-asistani": [
    "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
    "/",
  ],
  "yapay-zeka-sozlesme-analizi": [
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi",
    "/rehber/sozlesme-imzalamadan-once",
  ],
  "yapay-zeka-kira-sozlesmesi": [
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/rehber/kiraci-haklari",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/blog/kira-takip-raporu-yapay-zeka-analizi",
  ],
  "yapay-zeka-is-sozlesmesi": [
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/rehber/isci-haklari",
    "/rehber/isten-cikarilinca-ne-yapilir",
  ],
  "legal-ai-turkiye": [
    "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani",
    "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    "/guvenlik",
  ],
  "ucretsiz-yapay-zeka-hukuk": ["/#dene", "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani", "/araclar"],
  "yapay-zeka-tahliye-taahhutnamesi": [
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/rehber/tahliye-sureci",
    "/hukuki-analiz/tahliye-taahhutnamesi",
  ],
  "yapay-zeka-avukat-mi": [
    "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani",
    "/rehber/sozlesme-imzalamadan-once",
    "/",
  ],
};

const ALL_LINKS: InternalLink[] = [
  ...REHBER_HUB_LINKS,
  ...BLOG_HUB_LINKS,
  ...SOZLESME_ANALIZI_FEATURED,
  ...HUKUKI_ANALIZ_LINKS,
  ...YAPAY_ZEKA_HUKUK_LINKS,
  {
    href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    label: "Kira artış hesaplama",
    description: "Ücretsiz hesaplayıcı.",
  },
  {
    href: "/araclar/damga-vergisi-hesaplama",
    label: "Damga vergisi hesaplama",
    description: "Sözleşme matrahı tahmini.",
  },
  {
    href: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    label: "Tahliye taahhütnamesi kontrol",
    description: "AI ön tarama.",
  },
  { href: "/araclar", label: "Tüm ücretsiz araçlar", description: "Hesaplayıcı ve kontrol araçları." },
  {
    href: "/araclar/kidem-tazminati-hesaplama",
    label: "Kıdem tazminatı hesaplama",
    description: "Ücretsiz tahmini hesap.",
  },
  {
    href: "/araclar/ihbar-tazminati-hesaplama",
    label: "İhbar tazminatı hesaplama",
    description: "İhbar süresi tahmini.",
  },
  { href: "/haklarim", label: "Haklarım", description: "Senaryoya göre hukuki haklar." },
  { href: "/hakkimizda", label: "Hakkımızda", description: "Clause ve misyon." },
  { href: "/rehber", label: "Hukuk rehberleri", description: "Herkes için anlaşılır rehberler." },
  { href: "/blog", label: "Clause blog", description: "Sözleşme ve hukuk yazıları." },
  {
    href: "/yapay-zeka-hukuk",
    label: "Yapay zeka hukuk",
    description: "AI hukuk asistanı ve sözleşme analizi.",
  },
  { href: "/", label: "Clause — sözleşme analizi", description: "Ücretsiz AI ön tarama." },
];

function resolveLinks(hrefs: string[]): InternalLink[] {
  const seen = new Set<string>();
  const result: InternalLink[] = [];
  for (const href of hrefs) {
    if (seen.has(href)) continue;
    seen.add(href);
    const found = ALL_LINKS.find((l) => l.href === href);
    if (found) result.push(found);
  }
  return result;
}

export function getRelatedLinksForSozlesme(slug: string): InternalLink[] {
  const cluster = SOZLESME_CLUSTER_MAP[slug];
  if (cluster) return resolveLinks(cluster);
  return resolveLinks([
    "/rehber/sozlesme-imzalamadan-once",
    "/hukuki-analiz/sozlesme-risk-analizi",
    "/araclar",
  ]);
}

export function getRelatedLinksForRehber(slug: string): InternalLink[] {
  const cluster = REHBER_CLUSTER_MAP[slug];
  if (cluster) return resolveLinks(cluster);
  return resolveLinks([
    "/rehber/sozlesme-imzalamadan-once",
    "/blog",
    "/araclar",
    "/",
  ]);
}

const BLOG_CLUSTER_MAP: Record<string, string[]> = {
  "kira-sozlesmesi-riskli-maddeler-2026": ["/rehber/kira-sozlesmesi-sablon-riskleri", "/rehber/kira-sozlesmesi-ornek-maddeler", "/rehber/kiraci-haklari", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "yapay-zeka-sozlesme-analizi-nasil-calisir": ["/rehber/yapay-zeka-sozlesme-kontrolu", "/rehber/ucretsiz-sozlesme-analizi-nasil", "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi", "/blog/sozlesme-madde-madde-analiz"],
  "tahliye-taahhutnamesi-7-hata": ["/rehber/tahliye-taahhutnamesi-rehberi", "/rehber/tahliye-sureci", "/hukuki-analiz/tahliye-taahhutnamesi", "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol"],
  "is-sozlesmesi-imzalamadan-once-5-soru": ["/rehber/is-sozlesmesi-belirsiz-maddeler", "/rehber/sozlesme-imzalamadan-once", "/rehber/isci-haklari", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "tbk-kira-artisi-2026-pratik": ["/rehber/kira-artisi-haklari", "/rehber/kiraci-haklari", "/araclar/kira-sozlesmesi-artis-orani-hesaplama", "/blog/kira-artisi-2026-hesaplama-rehberi-blog"],
  "depozito-iadesi-reddedildi": ["/rehber/depozito-iadesi", "/rehber/depozito-ne-kadar-alinir", "/rehber/kibris-kira-depozito-anlasmazligi", "/hukuki-analiz/depozito-anlasmazligi"],
  "freelance-sozlesme-turkiye-ipuclari": ["/rehber/freelance-sozlesme-rehberi", "/rehber/yazilim-telif-sozlesmesi", "/blog/freelance-sozlesme-fatura-rehberi", "/sozlesme-analizi/freelance-yazilim-kontrati"],
  "kvkk-aydinlatma-metni-zorunlu-mu": ["/rehber/gizlilik-sozlesmesi-kvkk", "/rehber/kvkk-calisan-verisi", "/rehber/gizlilik-istihdam-sozlesmesi", "/sozlesme-analizi/kvkk-aydinlatma-metni-analizi"],
  "legal-ai-turkiye-karsilastirma": ["/rehber/yapay-zeka-hukuk-guvenilir-mi", "/rehber/google-yapay-zeka-hukuk-arama", "/yapay-zeka-hukuk/legal-ai-turkiye", "/blog/clause-vs-genel-ai-chat"],
  "ucretsiz-sozlesme-analizi-araclari": ["/rehber/ucretsiz-sozlesme-analizi-nasil", "/rehber/yapay-zeka-sozlesme-kontrolu", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/araclar"],
  "kobi-sozlesme-yonetimi": ["/rehber/ticari-sozlesmesi-kobi-rehberi", "/rehber/hizmet-sozlesmesi-rehberi", "/rehber/uyusmazlik-cozumu-tahkim", "/hukuki-analiz/sozlesme-risk-analizi"],
  "mesafeli-satis-iptal-rehberi": ["/rehber/mesafeli-satis-cayma", "/rehber/online-alisveris-14-gun-cayma", "/rehber/e-ticaret-iade-haklari", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "is-kanunu-fesih-sureleri-ozet": ["/rehber/isten-cikarilinca-ne-yapilir", "/rehber/kidem-ihbar-tazminati", "/rehber/iscinin-hakli-fesih-hakki", "/hukuki-analiz/is-cikarilma-tazminat"],
  "dijital-imza-sozlesme-guvenligi": ["/rehber/sozlesme-imzalamadan-once", "/rehber/yapay-zeka-sozlesme-kontrolu", "/rehber/gizlilik-sozlesmesi-kvkk", "/hukuki-analiz/sozlesme-risk-analizi"],
  "yapay-zeka-kira-sozlesmesi-blog": ["/rehber/kira-sozlesmesi-sablon-riskleri", "/rehber/yapay-zeka-sozlesme-kontrolu", "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "sozlesme-madde-madde-analiz": ["/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-cezai-sart", "/rehber/yapay-zeka-sozlesme-kontrolu", "/hukuki-analiz/sozlesme-risk-analizi"],
  "kira-sozlesmesi-ilk-kez-kiraci": ["/rehber/kiraci-haklari", "/rehber/kira-sozlesmesi-ornek-maddeler", "/rehber/depozito-ne-kadar-alinir", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "is-sozlesmesi-remote-calisan": ["/rehber/uzaktan-calisma-sozlesmesi", "/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/kvkk-calisan-verisi", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "depozito-kesinti-ornekleri": ["/rehber/depozito-iadesi", "/rehber/depozito-ne-kadar-alinir", "/hukuki-analiz/depozito-anlasmazligi", "/blog/depozito-iadesi-yazili-ihtar-ornek"],
  "tbk-609-kira-ozet-blog": ["/rehber/kiraci-haklari", "/rehber/kira-feshi-hakli-nedenler", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/hukuki-analiz/kira-sozlesmesi-feshi"],
  "ucretsiz-hukuki-danismanlik-ai": ["/rehber/hukuki-danismanlik-ucretsiz-secenekler", "/rehber/gunluk-hukuk-ihtiyaclari", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/ucretsiz-hukuk-asistani-2026-karsilastirma"],
  "sozlesme-imza-oncesi-checklist-blog": ["/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-cezai-sart", "/rehber/sozlesme-iptal-cayma-farki", "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi"],
  "ticari-sozlesme-ai-tarama": ["/rehber/ticari-sozlesmesi-kobi-rehberi", "/rehber/yapay-zeka-sozlesme-kontrolu", "/blog/kobi-sozlesme-yonetimi", "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi"],
  "tahliye-davasi-sure-rehber-blog": ["/rehber/tahliye-sureci", "/rehber/tahliye-taahhutnamesi-rehberi", "/rehber/kira-sozlesmesi-bildirim-sureleri", "/hukuki-analiz/tahliye-taahhutnamesi"],
  "tuketici-hakem-heyeti-basvuru-blog": ["/rehber/tuketici-sikayet-hatti-rehber", "/rehber/tuketici-arabuluculuk", "/rehber/pazaryeri-tuketici-sikayet", "/rehber/tuketici-haklari"],
  "clause-vs-genel-ai-chat": ["/rehber/yapay-zeka-hukuk-guvenilir-mi", "/rehber/google-yapay-zeka-hukuk-arama", "/yapay-zeka-hukuk/yapay-zeka-avukat-mi", "/yapay-zeka-hukuk/legal-ai-turkiye"],
  "kira-artisi-2026-ne-kadar": ["/rehber/kira-artisi-haklari", "/rehber/is-yeri-ticari-kira-rehberi", "/araclar/kira-sozlesmesi-artis-orani-hesaplama", "/blog/kira-artisi-2026-hesaplama-rehberi-blog"],
  "kira-takip-raporu-yapay-zeka-analizi": ["/rehber/kiraci-haklari", "/rehber/yapay-zeka-sozlesme-kontrolu", "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "kira-borcu-ne-zaman-tahliye": ["/rehber/kira-borcu-takibi-icra", "/rehber/kira-sozlesmesi-fesih-bildirimi", "/rehber/tahliye-sureci", "/hukuki-analiz/kira-borcu-takibi"],
  "kira-artisi-itiraz-nasil-yapilir": ["/rehber/kira-artisi-haklari", "/rehber/kiraci-haklari", "/araclar/kira-sozlesmesi-artis-orani-hesaplama", "/blog/tbk-kira-artisi-2026-pratik"],
  "depozito-iade-suresi-ne-kadar": ["/rehber/depozito-iadesi", "/rehber/depozito-ne-kadar-alinir", "/hukuki-analiz/depozito-anlasmazligi", "/blog/depozito-iadesi-yazili-ihtar-ornek"],
  "gunluk-hukuk-sorulari-yapay-zeka": ["/rehber/gunluk-hukuk-ihtiyaclari", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani", "/blog/gunluk-hukuk-isleri-yapay-zeka-2026"],
  "kibris-kira-sozlesmesi-7-tuzak": ["/rehber/kibris-kira-depozito-anlasmazligi", "/rehber/kira-sozlesmesi-sablon-riskleri", "/rehber/depozito-iadesi", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "online-abonelik-iptal-hakki-2026": ["/rehber/abonelik-iptal-dijital-hizmet", "/rehber/otomatik-yenileme-sozlesme", "/hukuki-analiz/abonelik-iptal-anlasmazligi", "/sozlesme-analizi/uyelik-sozlesmesi-dijital"],
  "is-sozlesmesi-rekabet-yasagi-tuzaklari": ["/rehber/is-sozlesmesi-belirsiz-maddeler", "/rehber/gizlilik-istihdam-sozlesmesi", "/rehber/iscinin-hakli-fesih-hakki", "/sozlesme-analizi/is-sozlesmesi-riskleri"],
  "kira-sozlesmesi-ev-sahibi-kontrol-listesi": ["/rehber/kira-sozlesmesi-ornek-maddeler", "/rehber/kira-sozlesmesi-sablon-riskleri", "/rehber/kefil-sorumlulugu-kira", "/sozlesme-analizi/kira-sozlesmesi-analizi"],
  "ucretsiz-hukuk-asistani-2026-karsilastirma": ["/rehber/hukuki-danismanlik-ucretsiz-secenekler", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/legal-ai-turkiye-karsilastirma"],
  "tuketici-cayma-hakki-istisnalar": ["/rehber/mesafeli-satis-cayma", "/rehber/online-alisveris-14-gun-cayma", "/rehber/e-ticaret-iade-haklari", "/sozlesme-analizi/mesafeli-satis-sozlesmesi"],
  "freelance-sozlesme-fatura-rehberi": ["/rehber/freelance-sozlesme-rehberi", "/rehber/hizmet-sozlesmesi-rehberi", "/rehber/yazilim-telif-sozlesmesi", "/sozlesme-analizi/freelance-yazilim-kontrati"],
  "yapay-zeka-sozlesme-analizi-ucretsiz-rehber": ["/rehber/ucretsiz-sozlesme-analizi-nasil", "/rehber/yapay-zeka-sozlesme-kontrolu", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/ucretsiz-sozlesme-analizi-araclari"],
  "gunluk-hukuk-isleri-yapay-zeka-2026": ["/rehber/gunluk-hukuk-ihtiyaclari", "/rehber/hukuki-danismanlik-ucretsiz-secenekler", "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani", "/araclar"],
  "kira-artisi-2026-hesaplama-rehberi-blog": ["/rehber/kira-artisi-haklari", "/rehber/kiraci-haklari", "/araclar/kira-sozlesmesi-artis-orani-hesaplama", "/blog/kira-artisi-2026-ne-kadar"],
  "isten-cikarildim-ilk-7-gun": ["/rehber/isten-cikarilinca-ne-yapilir", "/rehber/kidem-ihbar-tazminati", "/araclar/kidem-tazminati-hesaplama", "/araclar/ihbar-tazminati-hesaplama"],
  "depozito-iadesi-yazili-ihtar-ornek": ["/rehber/depozito-iadesi", "/rehber/depozito-ne-kadar-alinir", "/rehber/kibris-kira-depozito-anlasmazligi", "/hukuki-analiz/depozito-anlasmazligi"],
  "sozlesme-okumadan-imzalamayin-kontrol": ["/rehber/sozlesme-imzalamadan-once", "/rehber/sozlesme-cezai-sart", "/rehber/yapay-zeka-sozlesme-kontrolu", "/hukuki-analiz/sozlesme-risk-analizi"],
  "kidem-mi-ihbar-mi-fark-nedir": ["/rehber/kidem-ihbar-tazminati", "/rehber/isten-cikarilinca-ne-yapilir", "/araclar/kidem-tazminati-hesaplama", "/araclar/ihbar-tazminati-hesaplama"],
  "tuketici-sikayet-2026-adim-adim": ["/rehber/tuketici-sikayet-hatti-rehber", "/rehber/pazaryeri-tuketici-sikayet", "/rehber/tuketici-arabuluculuk", "/blog/tuketici-hakem-heyeti-basvuru-blog"],
  "neden-clause-ucretsiz-sozlesme-analizi": ["/rehber/ucretsiz-sozlesme-analizi-nasil", "/rehber/yapay-zeka-hukuk-guvenilir-mi", "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk", "/blog/yapay-zeka-sozlesme-analizi-ucretsiz-rehber"],
};

export function getRelatedLinksForBlog(slug: string): InternalLink[] {
  const cluster = BLOG_CLUSTER_MAP[slug];
  if (cluster) return resolveLinks(cluster);
  return resolveLinks([
    "/rehber/sozlesme-imzalamadan-once",
    "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    "/araclar",
    "/#dene",
  ]);
}

export function getRelatedLinksForHukukiAnaliz(slug: string): InternalLink[] {
  const defaults: Record<string, string[]> = {
    "kira-sozlesmesi-feshi": [
      "/rehber/kiraci-haklari",
      "/rehber/tahliye-sureci",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
      "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    ],
    "is-cikarilma-tazminat": [
      "/rehber/isten-cikarilinca-ne-yapilir",
      "/rehber/kidem-ihbar-tazminati",
      "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ],
    "tahliye-taahhutnamesi": [
      "/rehber/tahliye-sureci",
      "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ],
    "sozlesme-risk-analizi": [
      "/rehber/sozlesme-imzalamadan-once",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
      "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ],
    "depozito-anlasmazligi": [
      "/rehber/depozito-iadesi",
      "/rehber/kibris-kira-depozito-anlasmazligi",
      "/rehber/kiraci-haklari",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ],
    "haksiz-fesih": [
      "/rehber/isten-cikarilinca-ne-yapilir",
      "/rehber/kiraci-haklari",
      "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ],
    "kira-borcu-takibi": [
      "/rehber/kira-borcu-takibi-icra",
      "/rehber/kiraci-haklari",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
      "/blog/kira-borcu-ne-zaman-tahliye",
    ],
    "abonelik-iptal-anlasmazligi": [
      "/rehber/abonelik-iptal-dijital-hizmet",
      "/sozlesme-analizi/uyelik-sozlesmesi-dijital",
      "/rehber/tuketici-haklari",
    ],
    "ucret-kesintisi-anlasmazligi": [
      "/rehber/is-sozlesmesi-ucret-kesintisi",
      "/rehber/isci-haklari",
      "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ],
  };
  return resolveLinks(defaults[slug] ?? ["/rehber", "/araclar", "/"]);
}

export function getRelatedLinksForYapayZekaHukuk(slug: string): InternalLink[] {
  const cluster = YAPAY_ZEKA_CLUSTER_MAP[slug];
  if (cluster) return resolveLinks(cluster);
  return resolveLinks(["/yapay-zeka-hukuk", "/rehber", "/"]);
}

const HAKLARIM_CLUSTER_MAP: Record<string, string[]> = {
  "isten-atildim-haklarim": [
    "/araclar/kidem-tazminati-hesaplama",
    "/araclar/ihbar-tazminati-hesaplama",
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/hukuki-analiz/is-cikarilma-tazminat",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
  ],
  "kiraci-haklarim": [
    "/rehber/kiraci-haklari",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/haklarim/depozito-haklarim",
  ],
  "tuketici-haklarim": [
    "/rehber/tuketici-haklari",
    "/rehber/online-alisveris-14-gun-cayma",
    "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
  ],
  "depozito-haklarim": [
    "/rehber/depozito-iadesi",
    "/hukuki-analiz/depozito-anlasmazligi",
    "/rehber/kibris-kira-depozito-anlasmazligi",
  ],
  "kira-artisi-haklarim": [
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/rehber/kira-artisi-haklari",
    "/blog/kira-artisi-itiraz-nasil-yapilir",
  ],
  "freelance-haklarim": [
    "/sozlesme-analizi/freelance-yazilim-kontrati",
    "/rehber/freelance-sozlesme-rehberi",
    "/blog/freelance-sozlesme-fatura-rehberi",
  ],
  "is-sozlesmesi-haklarim": [
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/rehber/isci-haklari",
    "/rehber/is-sozlesmesi-ucret-kesintisi",
  ],
  "evden-cikarilma-haklarim": [
    "/rehber/tahliye-sureci",
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/hukuki-analiz/tahliye-taahhutnamesi",
  ],
};

export function getRelatedLinksForHaklarim(slug: string): InternalLink[] {
  const cluster = HAKLARIM_CLUSTER_MAP[slug];
  if (cluster) return resolveLinks(cluster);
  return resolveLinks(["/haklarim", "/rehber", "/araclar", "/"]);
}
