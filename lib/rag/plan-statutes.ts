import { generateText } from "ai";
import { resolveLegalModelCandidates } from "@/lib/ai/models";
import type { StatuteRef } from "@/lib/rag/query-signals";

/** Veritabanında resmi metni bulunan kanunlar — planlayıcı yalnız bunlardan seçer. */
export const INDEXED_LAWS: Record<string, string> = {
  "6098": "TBK",
  "4857": "İşK",
  "6502": "TKHK",
  "2004": "İİK",
  "6100": "HMK",
  "4721": "TMK",
  "6698": "KVKK",
  "634": "KMK",
  "7036": "İMK",
  "6325": "HUAK",
  "1475": "1475 s. İşK",
  "4447": "İSK",
  "5510": "SGK",
  "6102": "TTK",
};

const PLANNER_SYSTEM = `Sen bir Türk hukuku araştırma planlayıcısısın. Kullanıcının sorusunu yanıtlamak için DOĞRUDAN uygulanacak kanun maddelerini belirle.
Yalnızca şu kanunlardan seç: 6098 TBK, 4857 İş Kanunu, 6502 TKHK, 2004 İİK, 6100 HMK, 4721 TMK, 6698 KVKK, 634 Kat Mülkiyeti, 7036 İş Mahkemeleri, 6325 Arabuluculuk, 1475 (yalnız m.14 kıdem), 4447 İşsizlik Sigortası, 5510 SGK, 6102 TTK.
Örnekler:
- kiracı kirayı ödemiyor → TBK 315, İİK 269, İİK 269/a
- kira artışı / zam → TBK 344
- ev sahibi kendisi/çocuğu/yakını için evi istiyor → TBK 350 (yeni malik ise TBK 351)
- tahliye taahhüdü → TBK 352
- depozito → TBK 342
- işten çıkarılma, kıdem/ihbar → 1475 m.14 (kıdem burada, 4857'de değil), İşK 17, İşK 18, İşK 25
- mesafeli satış iade / cayma → TKHK 48; ayıplı mal → TKHK 8, TKHK 11
- işsizlik maaşı → 4447 m.50, 4447 m.51
Önce olayın hukuki niteliğini belirle, sonra o niteliği düzenleyen maddeyi seç. Emin olmadığın maddeyi yazma. En fazla 6 madde.
Yalnızca JSON döndür: {"refs":[{"kanun":"6098","madde":"315"}]}`;

/**
 * Sorudan önce "hangi maddeler gerekir?" planı. Çıkan maddeler veritabanında
 * birebir aranır; modelin hafızası yalnız arama ipucu olur, dayanak resmi metindir.
 */
export async function planStatuteRefs(question: string): Promise<StatuteRef[]> {
  const q = question.trim().slice(0, 1500);
  if (q.length < 8) return [];
  // Doğru maddeyi seçmek cevabın kalitesini belirler: hızlı değil güçlü model
  const model = resolveLegalModelCandidates()[0];
  if (!model) return [];
  try {
    const res = await generateText({
      model,
      system: PLANNER_SYSTEM,
      prompt: q,
      temperature: 0,
      maxOutputTokens: 300,
    });
    const raw = (res.text || "").match(/\{[\s\S]*\}/)?.[0];
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { refs?: Array<{ kanun?: unknown; madde?: unknown }> };
    const out: StatuteRef[] = [];
    const seen = new Set<string>();
    for (const r of parsed.refs ?? []) {
      const kanunNo = String(r.kanun ?? "").replace(/\D/g, "");
      const maddeNo = String(r.madde ?? "").trim().toLocaleLowerCase("tr-TR").replace(/^m(adde)?\.?\s*/, "");
      const short = INDEXED_LAWS[kanunNo];
      if (!short || !/^(geçici |ek )?\d{1,4}(\/[a-zçğıöşü])?$/u.test(maddeNo)) continue;
      const key = `${kanunNo}:${maddeNo}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ kanunNo, maddeNo, short });
      if (out.length >= 6) break;
    }
    return out;
  } catch (err) {
    console.error("[rag/plan]", err instanceof Error ? err.message.slice(0, 200) : err);
    return [];
  }
}
