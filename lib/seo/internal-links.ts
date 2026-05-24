/**
 * Merkezi iç linkleme haritası — B2C hukuk SEO için konu kümeleri.
 */

export type InternalLink = {
  href: string;
  label: string;
  description?: string;
};

/** Tüm rehber sayfaları — footer ve hub için */
export const REHBER_HUB_LINKS: InternalLink[] = [
  {
    href: "/rehber/kiraci-haklari",
    label: "Kiracı hakları rehberi",
    description: "Kira, depozito, tahliye ve artış haklarınız.",
  },
  {
    href: "/rehber/isci-haklari",
    label: "İşçi hakları rehberi",
    description: "Fesih, tazminat, izin ve ücret hakları.",
  },
  {
    href: "/rehber/tuketici-haklari",
    label: "Tüketici hakları",
    description: "Cayma, iade ve mesafeli satış.",
  },
  {
    href: "/rehber/sozlesme-imzalamadan-once",
    label: "Sözleşme imzalamadan önce",
    description: "Herkes için kontrol listesi.",
  },
  {
    href: "/rehber/depozito-iadesi",
    label: "Depozito iadesi",
    description: "Ne zaman, nasıl geri alınır?",
  },
  {
    href: "/rehber/kira-artisi-haklari",
    label: "Kira artışı hakları",
    description: "Oran, bildirim ve itiraz.",
  },
  {
    href: "/rehber/isten-cikarilinca-ne-yapilir",
    label: "İşten çıkarılınca ne yapılır?",
    description: "Adım adım hak arama rehberi.",
  },
  {
    href: "/rehber/kidem-ihbar-tazminati",
    label: "Kıdem ve ihbar tazminatı",
    description: "Kim, ne kadar alır?",
  },
  {
    href: "/rehber/tahliye-sureci",
    label: "Tahliye süreci",
    description: "Kiracı ve ev sahibi için yol haritası.",
  },
  {
    href: "/rehber/mesafeli-satis-cayma",
    label: "Cayma hakkı rehberi",
    description: "14 gün kuralı ve istisnalar.",
  },
];

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
};

const ALL_LINKS: InternalLink[] = [
  ...REHBER_HUB_LINKS,
  ...SOZLESME_ANALIZI_FEATURED,
  ...HUKUKI_ANALIZ_LINKS,
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
