"use client";

import { BellRing, Reply } from "lucide-react";

const findings = [
  {
    tone: "risk",
    title: "Kira artışı yasal tavanın üzerinde",
    body: "Sözleşmedeki %80 artış, 12 aylık TÜFE ortalamasıyla belirlenen tavanı aşıyor.",
    cite: "TBK m.344",
  },
  {
    tone: "warn",
    title: "Erken çıkışta 3 kira cezai şart",
    body: "Tutar fahiş bulunabilir; imzalamadan önce indirilmesini isteyin.",
    cite: "TBK m.182",
  },
] as const;

/** Örnek sonuç — gerçek tarama ekranının gösterdiklerinden fazlasını vaat etmez. */
export function SampleAnalysisCard() {
  return (
    <figure className="relative w-full max-w-md" aria-label="Örnek tarama sonucu">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Örnek sonuç · kira sözleşmesi</p>
        <p className="mt-1 text-lg font-bold text-slate-900">İmzalamadan önce konuşmanız gereken 2 madde var.</p>

        <div className="mt-4 space-y-3">
          {findings.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-l-4 border-slate-200 p-3.5 ${item.tone === "risk" ? "border-l-red-500" : "border-l-amber-500"}`}
            >
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-snug text-slate-600">{item.body}</p>
              <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 font-serif text-xs text-slate-700">
                {item.cite}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <span className="flex items-center gap-1.5 rounded-xl bg-[#005BEA]/[0.06] px-3 py-2 font-medium text-slate-800">
            <Reply className="h-4 w-4 text-[#005BEA]" aria-hidden /> Cevap taslağı hazır
          </span>
          <span className="flex items-center gap-1.5 rounded-xl bg-[#005BEA]/[0.06] px-3 py-2 font-medium text-slate-800">
            <BellRing className="h-4 w-4 text-[#005BEA]" aria-hidden /> 2 tarih bulundu
          </span>
        </div>
      </div>
    </figure>
  );
}
