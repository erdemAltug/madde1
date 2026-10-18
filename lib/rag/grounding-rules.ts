/** System prompt’a eklenecek kalıcı groundedness kuralları. */
export const RAG_ANALYSIS_OUTPUT_RULES = `
## Mevzuat atıf disiplini (zorunlu)
- Kanun madde numarası yalnızca sana verilen "DOĞRULANMIŞ HUKUKİ BAĞLAM" içindeki KANUN etiketlerinden gelsin.
- "NOT" satırları bağlayıcı madde veya emsal değildir; madde numarası gibi yazma.
- "EMSAL" satırını kanun hükmü gibi sunma.
- Bağlam yoksa veya ilgili değilse uydurma madde yazma; riski teamül/genel ilke dilinde anlat.
- Analiz özetinde **Mevzuat notu** satırında dayanak etiketlerini say (örn. TBK m.344).
- Kritik risk maddelerinin sonuna mümkünse \`Dayanak: [etiket]\` ekle.
- Yanıtın sonunda şu bölümü ekle:

# 📚 Dayanaklar
- (Kullanılan atıf etiketleri kısa liste; kullanılmadıysa "Bu turda doğrulanmış madde atıfı yapılmadı.")
`.trim();
