/**
 * Sitede görünen tek fiyat kaynağı. Fiyat değişirse yalnız burası değişir.
 * Hatırlatıcılar bilerek ücretsiz planda: kullanıcıyı geri getiren mekanizma ödeme duvarının arkasında değil.
 */
export const PLUS_PRICE_LABEL = "199 ₺/ay";

export const FREE_PLAN_FEATURES = [
  "Tüm hesaplama araçları ve Haklarım Kontrolü",
  "Sözleşme ön taraması ve risk özeti",
  "Hukuki takvim ve hatırlatıcılar (e-posta + bildirim)",
  "Sözleşme cüzdanı ve hukuk asistanı",
  "Sürüm karşılaştırma ve cevap taslakları",
] as const;

export const PLUS_PLAN_FEATURES = [
  "Günlük tarama sınırı yok",
  "Madde madde detaylı rapor ve PDF",
  "İhtarname ve resmi yazı taslakları",
  "Sözleşme iyileştirme önerileri",
  "Öncelikli asistan yanıtları",
] as const;
