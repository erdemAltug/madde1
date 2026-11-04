/**
 * Hukuki içerik inceleyicisi (YMYL güven sinyali). Gerçek, izin vermiş bir avukat
 * olmadan doldurmayın — sahte inceleyici Google yönergelerine ve reklam kurallarına aykırıdır.
 * Doldurulunca rehber sayfalarında "İnceleyen" satırı ve Article JSON-LD'de reviewedBy görünür.
 */
export type LegalReviewer = {
  name: string; // ör. "Av. Ayşe Yılmaz"
  credential: string; // ör. "İstanbul Barosu"
  url?: string; // profil / baro sicil / LinkedIn
};

export const LEGAL_REVIEWER: LegalReviewer | null = null;
