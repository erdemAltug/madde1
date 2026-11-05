/**
 * Asistan RAG kalite kontrolü — canlıdaki hattın aynısı (lib/asistan/answer.ts), giriş gerekmez.
 *
 *   npx tsx --env-file=.env.local scripts/eval-asistan.ts
 *   npx tsx --env-file=.env.local scripts/eval-asistan.ts "kiracım 3 aydır kira ödemiyor"
 *
 * "holdout" soruları planlayıcının örneklerinde geçmez — ezberi değil genellemeyi ölçer.
 */
import { resolveLegalModelCandidates } from "@/lib/ai/models";
import { answerLegalQuestion } from "@/lib/asistan/answer";
import { verifyCitations } from "@/lib/rag";

type Case = { q: string; expect: string[]; holdout?: boolean };

/** Cevapta beklenen maddelerden en az biri, doğrulanmış olarak geçmeli */
const CASES: Case[] = [
  { q: "Kiracım 3 aydır kirayı ödemiyor ve evden çıkmıyor, tahliye için dilekçe yazar mısın?", expect: ["TBK m.315", "İİK m.269"] },
  { q: "Ev sahibim yenilemede %60 zam istiyor, ödemek zorunda mıyım?", expect: ["TBK m.344"] },
  { q: "4 yıldır çalıştığım işten haklı sebep olmadan çıkarıldım, kıdem ve ihbar alabilir miyim?", expect: ["1475 s. İşK m.14", "İşK m.17"] },
  { q: "İnternetten aldığım ürünü 5 gün sonra iade etmek istiyorum, satıcı kabul etmiyor.", expect: ["TKHK m.48"] },
  { q: "Ev sahibi oğlu evlenecek diye beni çıkarmak istiyor, çıkmak zorunda mıyım?", expect: ["TBK m.350"] },
  { holdout: true, q: "Patronum 2 aydır maaşımı yatırmıyor, işi bırakırsam tazminat alır mıyım?", expect: ["İşK m.24", "İşK m.34"] },
  { holdout: true, q: "Komşum apartmanda sürekli gürültü yapıyor, yönetim bir şey yapabilir mi?", expect: ["KMK m.18", "KMK m.33"] },
  { holdout: true, q: "Bana haksız yere icra takibi başlatıldı, ödeme emrine kaç gün içinde itiraz etmeliyim?", expect: ["İİK m.62", "İİK m.168"] },
  { holdout: true, q: "Yıllık izin hakkım kaç gün, 6 yıldır aynı yerde çalışıyorum?", expect: ["İşK m.53"] },
  { holdout: true, q: "Kiraladığım evin kombisi bozuldu, ev sahibi yaptırmıyor. Kendim yaptırıp kiradan düşebilir miyim?", expect: ["TBK m.306", "TBK m.305", "TBK m.304"] },
];

async function run(c: Case, candidates: ReturnType<typeof resolveLegalModelCandidates>) {
  const t0 = Date.now();
  const r = await answerLegalQuestion({
    candidates,
    message: c.q,
    retrievalQuery: c.q,
    messages: [{ role: "user", content: c.q }],
  });
  const hit = c.expect.filter((e) => verifyCitations(r.text, [e]).grounded.length > 0);
  const pass = (c.expect.length === 0 || hit.length > 0) && r.ungrounded.length === 0;
  console.log("\n================================================");
  console.log(`${c.holdout ? "[holdout] " : ""}SORU:`, c.q);
  console.log("PLAN:", r.plan.map((p) => `${p.short} ${p.maddeNo}`).join(", ") || "-");
  console.log("KAYNAKLAR:", r.citations.join(" | ") || "-", r.regenerated ? "(yeniden yazıldı)" : "");
  console.log("CEVAP (ilk 600):\n" + r.text.slice(0, 600));
  console.log(`ALINTI ✓: ${r.quotesVerified.join(", ") || "-"}  ✗: ${r.quotesFailed.join(", ") || "-"}`);
  console.log(`BEKLENEN: ${c.expect.join(" / ") || "-"} → ${pass ? "✅" : "❌"}  doğrulanamayan: ${r.ungrounded.join(", ") || "-"}  (${Date.now() - t0} ms)`);
  return pass;
}

async function main() {
  const candidates = resolveLegalModelCandidates();
  const arg = process.argv.slice(2).join(" ").trim();
  const cases: Case[] = arg ? [{ q: arg, expect: [] }] : CASES;
  let ok = 0;
  let hOk = 0;
  for (const c of cases) {
    const pass = await run(c, candidates);
    if (pass) ok++;
    if (pass && c.holdout) hOk++;
  }
  if (!arg) {
    const h = cases.filter((c) => c.holdout).length;
    console.log(`\nSONUÇ: ${ok}/${cases.length}  (örnek: ${ok - hOk}/${cases.length - h}, holdout: ${hOk}/${h})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
