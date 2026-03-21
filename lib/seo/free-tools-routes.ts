/**
 * Kanonik ücretsiz araç URL’leri (uzun kuyruk slug’lar) + site haritası / footer.
 */
export const KIRA_ARTIS_TOOL_PATH =
  "/araclar/kira-sozlesmesi-artis-orani-hesaplama" as const;
export const DAMGA_VERGISI_TOOL_PATH =
  "/araclar/damga-vergisi-hesaplama" as const;
export const TAHLIYE_TOOL_PATH =
  "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol" as const;

/** Eski URL’ler next.config redirect ile buraya yönlendirilir */
export const KIRA_ARTIS_LEGACY_PATH = "/araclar/kira-artis-hesaplama" as const;
export const TAHLIYE_LEGACY_PATH =
  "/araclar/tahliye-taahhutnamesi-kontrolu" as const;

export type FreeToolNavItem = {
  href: string;
  label: string;
  description: string;
};

export const FREE_TOOLS_NAV: FreeToolNavItem[] = [
  {
    href: KIRA_ARTIS_TOOL_PATH,
    label: "Kira sözleşmesi artış oranı hesaplama",
    description: "TBK bağlamında tahmini yeni kira — ücretsiz hesaplayıcı.",
  },
  {
    href: DAMGA_VERGISI_TOOL_PATH,
    label: "Damga vergisi hesaplama",
    description: "Kira ve sözleşme bedeli üzerinden kabaca damga tahmini.",
  },
  {
    href: TAHLIYE_TOOL_PATH,
    label: "Tahliye taahhütnamesi yapay zeka ön kontrol",
    description: "Usul ve içerik riskleri için hızlı AI taraması.",
  },
];

export const FREE_TOOLS_SITEMAP_PATHS = [
  KIRA_ARTIS_TOOL_PATH,
  DAMGA_VERGISI_TOOL_PATH,
  TAHLIYE_TOOL_PATH,
] as const;
