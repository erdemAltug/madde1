"use client";

import { FileCheck2, Shield } from "lucide-react";

const findings = [
  {
    title: "Ev Sahibi Zam Talebi",
    body: "Yasal TÜFE sınırının (%65) üzerinde (%100).",
  },
  {
    title: "Cezai Şart",
    body: "4. Madde kiracı aleyhine haksız şart içeriyor.",
  },
] as const;

export function SampleAnalysisCard() {
  return (
    <div className="relative w-full max-w-md">
      <div className="glass-panel relative overflow-hidden rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold tracking-wide text-red-700">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
            aria-hidden
          />
          YÜKSEK RİSK TESPİT EDİLDİ
        </div>

        <div className="space-y-3">
          {findings.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5"
            >
              <p className="text-sm font-bold text-deep-navy">{item.title}</p>
              <p className="mt-1 text-sm font-medium leading-snug text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--cta-primary)]/20 bg-[var(--cta-primary)]/[0.06] p-3.5">
          <FileCheck2
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cta-primary)]"
            aria-hidden
          />
          <p className="text-sm font-semibold italic leading-snug text-deep-navy">
            &ldquo;Kira İtiraz Dilekçesi Otomatik Oluşturuldu.&rdquo;
          </p>
        </div>
      </div>

      <div className="absolute -bottom-3 -right-2 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 shadow-lg shadow-slate-900/10 sm:-right-4">
        <Shield className="h-3.5 w-3.5 text-[var(--cta-primary)]" aria-hidden />
        <span className="text-[11px] font-semibold text-slate-700">
          Veriniz güvende
        </span>
      </div>
    </div>
  );
}
