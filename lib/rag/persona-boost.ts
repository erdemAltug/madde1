import type { PersonaId } from "@/lib/personas";

/** Retrieval recall’ı artırmak için persona odaklı arama sorguları (kanun metni uydurmaz). */
export function personaBoostQueries(persona: PersonaId): string[] {
  switch (persona) {
    case "tenant":
      return [
        "konut ve çatılı işyeri kira bedelinin belirlenmesi artışı TBK",
        "kira sözleşmesi tahliye ve fesih kiracı hakları",
        "kira güvence bedeli depozito iadesi",
        "kiralananın ayıplı olması ve kiraya verenin borçları",
      ];
    case "job_seeker":
      return [
        "iş sözleşmesi fesih bildirimi ihbar süresi İş Kanunu",
        "kıdem tazminatı hak kazanma koşulları",
        "fazla çalışma ücreti fazla mesai",
        "ücret ödeme borcu maaş kesintisi rekabet yasağı",
      ];
    case "freelancer":
      return [
        "eser sözleşmesi ayıp ve teslim TBK",
        "hizmet sözleşmesi ücret ödeme gecikme",
        "fikri mülkiyet hak devri telif",
        "cezai şart orantısızlık TBK",
      ];
    default:
      return [
        "genel işlem koşulları denetimi TBK",
        "sözleşmenin yorumu ve dürüstlük kuralı",
        "cezai şart ve aşırı yararlanma",
      ];
  }
}

/** Supabase category filtresi — veri setindeki kategori adları gevşek eşleşebilir; null = filtre yok. */
export function personaCategoryFilter(_persona: PersonaId): string | null {
  return null;
}
