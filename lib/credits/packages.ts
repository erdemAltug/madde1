export type CreditPackageId = "single" | "monthly";

export const CREDIT_PACKAGES: Record<
  CreditPackageId,
  {
    label: string;
    priceLabel: string;
    credits: number;
    unlimitedDays?: number;
    /** Kart altı kısa açıklama */
    blurb: string;
  }
> = {
  single: {
    label: "Tek seferlik analiz",
    priceLabel: "4,99 TL",
    credits: 1,
    blurb: "Sadece 4,99 TL — tek sözleşme için tam detay ve düzeltme önerileri.",
  },
  monthly: {
    label: "Aylık Standart",
    priceLabel: "99 TL",
    credits: 0,
    unlimitedDays: 30,
    blurb: "Ay boyunca kesintisiz analiz & iyileştirme. Adil kullanım politikası geçerlidir.",
  },
};

export const FAIR_USE_DISCLAIMER =
  "Adil kullanım politikası geçerlidir; olağandışı otomasyon veya kötüye kullanımda hesap kısıtlanabilir.";
