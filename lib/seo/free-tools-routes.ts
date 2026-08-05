/**
 * Kanonik ücretsiz araç URL’leri (uzun kuyruk slug’lar) + site haritası / footer.
 */
export const KIRA_ARTIS_TOOL_PATH =
  "/araclar/kira-sozlesmesi-artis-orani-hesaplama" as const;
export const DAMGA_VERGISI_TOOL_PATH =
  "/araclar/damga-vergisi-hesaplama" as const;
export const TAHLIYE_TOOL_PATH =
  "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol" as const;
export const KIDEM_TAZMINATI_TOOL_PATH =
  "/araclar/kidem-tazminati-hesaplama" as const;
export const IHBAR_TAZMINATI_TOOL_PATH =
  "/araclar/ihbar-tazminati-hesaplama" as const;
export const FAZLA_MESAI_TOOL_PATH =
  "/araclar/fazla-mesai-ucreti-hesaplama" as const;
export const YILLIK_IZIN_TOOL_PATH =
  "/araclar/yillik-izin-hesaplama" as const;
export const BRUT_NET_MAAS_TOOL_PATH =
  "/araclar/brut-net-maas-hesaplama" as const;
export const ISSIZLIK_MAASI_TOOL_PATH =
  "/araclar/issizlik-maasi-hesaplama" as const;

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
    href: KIDEM_TAZMINATI_TOOL_PATH,
    label: "Kıdem tazminatı hesaplama",
    description: "Brüt maaş ve kıdeme göre tahmini kıdem tazminatı.",
  },
  {
    href: IHBAR_TAZMINATI_TOOL_PATH,
    label: "İhbar tazminatı hesaplama",
    description: "İhbar süresine göre tahmini ihbar tazminatı.",
  },
  {
    href: FAZLA_MESAI_TOOL_PATH,
    label: "Fazla mesai ücreti hesaplama",
    description: "Brüt ücret ve saat ile tahmini zamlı fazla mesai ücreti.",
  },
  {
    href: YILLIK_IZIN_TOOL_PATH,
    label: "Yıllık izin hesaplama",
    description: "Kıdeme göre izin günü ve kullanılmayan gün ücreti tahmini.",
  },
  {
    href: BRUT_NET_MAAS_TOOL_PATH,
    label: "Brüt net maaş hesaplama 2026",
    description: "12 aylık SGK, vergi dilimi ve net maaş bordro tahmini.",
  },
  {
    href: ISSIZLIK_MAASI_TOOL_PATH,
    label: "İşsizlik maaşı hesaplama 2026",
    description: "Aylık ödenek, ödeme süresi ve toplam tahmini.",
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
  KIDEM_TAZMINATI_TOOL_PATH,
  IHBAR_TAZMINATI_TOOL_PATH,
  FAZLA_MESAI_TOOL_PATH,
  YILLIK_IZIN_TOOL_PATH,
  BRUT_NET_MAAS_TOOL_PATH,
  ISSIZLIK_MAASI_TOOL_PATH,
  DAMGA_VERGISI_TOOL_PATH,
  TAHLIYE_TOOL_PATH,
] as const;
