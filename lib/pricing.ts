/**
 * Sitede görünen tek fiyat kaynağı. Fiyat veya paket değişirse yalnız burası değişir.
 *
 * Şu an ödeme alınmıyor: ücretli paketlere tıklanınca talep toplanır (/api/plan-interest)
 * ve ekibe e-posta gider. Talep gelince ödeme altyapısı açılacak.
 */
export type PlanId = "free" | "single" | "personal" | "business";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  audience: string;
  features: readonly string[];
  cta: string;
  highlighted?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    id: "free",
    name: "Ücretsiz",
    price: "0 ₺",
    period: "her zaman",
    audience: "Haklarını merak eden herkes",
    features: [
      "Tüm hesaplayıcılar ve Haklarım Kontrolü",
      "Ayda 5 asistan sorusu",
      "Ayda 1 sözleşme ön taraması (özet)",
      "1 sözleşme için tarih hatırlatıcısı",
    ],
    cta: "Hesap aç",
  },
  {
    id: "single",
    name: "Tek Seferlik",
    price: "149 ₺",
    period: "bir kez",
    audience: "Şu an tek bir sorunu olanlar",
    features: [
      "7 gün boyunca sınırsız asistan",
      "1 sözleşme için detaylı rapor + PDF",
      "1 dilekçe veya ihtarname taslağı",
      "Abonelik yok, yenilenmez",
    ],
    cta: "Paketi seç",
  },
  {
    id: "personal",
    name: "Bireysel",
    price: "199 ₺",
    period: "/ay",
    audience: "Kiracı, çalışan, serbest çalışan",
    features: [
      "Sınırsız asistan sorusu",
      "Sınırsız sözleşme taraması ve detaylı rapor",
      "Sınırsız dilekçe ve ihtarname taslağı",
      "Sözleşme taslağı oluşturma",
      "Tüm sözleşmeler için hatırlatıcı",
    ],
    cta: "Paketi seç",
    highlighted: true,
  },
  {
    id: "business",
    name: "Şirketim",
    price: "799 ₺",
    period: "/ay",
    audience: "Küçük işletme, esnaf, girişim",
    features: [
      "Bireysel paketteki her şey",
      "5 kullanıcıya kadar ekip",
      "Ortak sözleşme klasörü",
      "Şirketinize özel sözleşme şablonları",
      "Öncelikli destek",
    ],
    cta: "Paketi seç",
  },
];

export const PAID_PLAN_IDS = ["single", "personal", "business"] as const;
export type PaidPlanId = (typeof PAID_PLAN_IDS)[number];

export function planById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

/** Geriye uyumluluk: SSS ve deneme şeridi Bireysel fiyatını gösterir */
export const PLUS_PRICE_LABEL = "199 ₺/ay";
