export type CreditPackageId = "starter" | "pro" | "business";

export const CREDIT_PACKAGES: Record<
  CreditPackageId,
  {
    label: string;
    priceLabel: string;
    credits: number;
    unlimitedDays?: number;
    /** Kart altı kısa açıklama */
    blurb: string;
    /** Token cost for display */
    tokenCost: number;
    /** Token cost description */
    tokenDescription: string;
    /** Öne çıkan paket */
    featured?: boolean;
    /** Badge metni */
    badge?: string;
  }
> = {
  starter: {
    label: "Gündelik",
    priceLabel: "69,99 TL",
    credits: 5,
    blurb: "Temel risk özeti ve hızlı kontrol.",
    tokenCost: 0,
    tokenDescription: "5 Analiz Tokenı / Ay",
    featured: false,
    badge: undefined,
  },
  pro: {
    label: "Profesyonel",
    priceLabel: "149,99 TL",
    credits: 50,
    blurb: "Detaylı mevzuat analizi, AI mütalaası, dilekçe taslağı hazırlama.",
    tokenCost: 0,
    tokenDescription: "50 Analiz Tokenı / Ay",
    featured: true,
    badge: "AVUKATLARIN TERCİHİ",
  },
  business: {
    label: "Kurumsal",
    priceLabel: "Teklif Alın",
    credits: 0,
    unlimitedDays: 30,
    blurb: "Çoklu kullanıcı paneli, API erişimi ve kurumsal raporlama.",
    tokenCost: 0,
    tokenDescription: "Sınırsız Analiz Tokenı",
    featured: false,
    badge: undefined,
  },
};

export const FAIR_USE_DISCLAIMER =
  "Adil kullanım politikası geçerlidir; olağandışı otomasyon veya kötüye kullanımda hesap kısıtlanabilir.";

/** Token costs for different analysis types */
export const TOKEN_COSTS = {
  quickSummary: 1,
  detailedLegalAnalysis: 3,
  aiOpinionAndDraft: 5,
} as const;

export type TokenCostType = keyof typeof TOKEN_COSTS;

/** Get human-readable token cost description */
export function getTokenCostDescription(type: TokenCostType): string {
  const costs = {
    quickSummary: "Bu analiz için 1 token harcanacaktır.",
    detailedLegalAnalysis: "Bu analiz için 3 token harpanacaktır.",
    aiOpinionAndDraft: "Bu analiz için 5 token harpanacaktır.",
  };
  return costs[type];
}
