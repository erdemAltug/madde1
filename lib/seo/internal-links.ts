/**
 * Merkezi iç linkleme haritası — B2C hukuk SEO için konu kümeleri.
 */

import { REHBER_SLUGS, getRehberConfig } from "@/lib/seo/rehber-pages";

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
  "kiraci-haklari": [
    "/rehber/kira-artisi-haklari",
    "/rehber/depozito-iadesi",
    "/rehber/tahliye-sureci",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/hukuki-analiz/kira-sozlesmesi-feshi",
  ],
  "isci-haklari": [
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/rehber/kidem-ihbar-tazminati",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/hukuki-analiz/is-cikarilma-tazminat",
  ],
  "tuketici-haklari": [
    "/rehber/mesafeli-satis-cayma",
    "/rehber/sozlesme-imzalamadan-once",
    "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
  ],
  "sozlesme-imzalamadan-once": [
    "/rehber/kiraci-haklari",
    "/rehber/isci-haklari",
    "/rehber/tuketici-haklari",
    "/hukuki-analiz/sozlesme-risk-analizi",
  ],
  "depozito-iadesi": [
    "/rehber/kiraci-haklari",
    "/rehber/tahliye-sureci",
    "/hukuki-analiz/depozito-anlasmazligi",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
  ],
  "kira-artisi-haklari": [
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    "/rehber/kiraci-haklari",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
  ],
  "isten-cikarilinca-ne-yapilir": [
    "/rehber/kidem-ihbar-tazminati",
    "/rehber/isci-haklari",
    "/hukuki-analiz/is-cikarilma-tazminat",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
  ],
  "kidem-ihbar-tazminati": [
    "/rehber/isten-cikarilinca-ne-yapilir",
    "/rehber/isci-haklari",
    "/hukuki-analiz/is-cikarilma-tazminat",
  ],
  "tahliye-sureci": [
    "/rehber/kiraci-haklari",
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/hukuki-analiz/tahliye-taahhutnamesi",
    "/hukuki-analiz/kira-sozlesmesi-feshi",
  ],
  "mesafeli-satis-cayma": [
    "/rehber/tuketici-haklari",
    "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
  ],
  "tahliye-taahhutnamesi-rehberi": [
    "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    "/rehber/tahliye-sureci",
    "/hukuki-analiz/tahliye-taahhutnamesi",
  ],
  "deneme-suresi-rehberi": [
    "/rehber/isci-haklari",
    "/sozlesme-analizi/is-sozlesmesi-riskleri",
    "/rehber/isten-cikarilinca-ne-yapilir",
  ],
  "yapay-zeka-sozlesme-kontrolu": [
    "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    "/blog/yapay-zeka-sozlesme-analizi-nasil-calisir",
    "/#dene",
  ],
  "aidat-ve-kira-faturasi": [
    "/rehber/kiraci-haklari",
    "/sozlesme-analizi/kira-sozlesmesi-analizi",
    "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  ],
  "otomatik-yenileme-sozlesme": [
    "/rehber/sozlesme-imzalamadan-once",
    "/rehber/tuketici-haklari",
    "/hukuki-analiz/sozlesme-risk-analizi",
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
      "/rehber/kiraci-haklari",
      "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ],
    "haksiz-fesih": [
      "/rehber/isten-cikarilinca-ne-yapilir",
      "/rehber/kiraci-haklari",
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
