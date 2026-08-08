"use client";

import Link from "next/link";
import { CheckCircle2, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type Props = {
  teaser: TeaserData;
  isLoggedIn?: boolean;
  onAnalyzeAgain: () => void;
};

function riskPercentFromTeaser(data: TeaserData): number {
  if (typeof data.securityScore === "number" && !Number.isNaN(data.securityScore)) {
    return Math.min(100, Math.max(5, 100 - Math.round(data.securityScore)));
  }
  return Math.min(
    95,
    Math.max(35, data.criticalRiskCount * 18 + data.missingClauseCount * 10),
  );
}

const SAFE_UNLOCKED =
  "Depozito iade süresi yasal sınırlarda.";

const FALLBACK_LOCKED = [
  "4. Maddede haksız cezai şart ve tahliye taahhüdü tespit edildi.",
  "Tek taraflı fesih ve artış oranı kiracı aleyhine düzenlenmiş.",
] as const;

export function StepResults({ teaser, isLoggedIn, onAnalyzeAgain }: Props) {
  const riskPct = riskPercentFromTeaser(teaser);
  const locked = [
    teaser.categoryTitles[0]
      ? `${teaser.categoryTitles[0]} — kritik madde riski.`
      : FALLBACK_LOCKED[0],
    teaser.categoryTitles[1]
      ? `${teaser.categoryTitles[1]} — sözleşme aleyhinize işliyor olabilir.`
      : FALLBACK_LOCKED[1],
  ];

  return (
    <div className="space-y-5">
      <div
        className={cn(
          "rounded-2xl border px-4 py-4",
          riskPct >= 60
            ? "border-red-200 bg-red-50"
            : riskPct >= 40
              ? "border-amber-200 bg-amber-50"
              : "border-emerald-200 bg-emerald-50",
        )}
      >
        <p className="text-sm font-bold leading-snug text-deep-navy sm:text-base">
          {riskPct >= 60 ? "🔴" : riskPct >= 40 ? "🟡" : "🟢"} %{riskPct}{" "}
          {riskPct >= 60
            ? "Yüksek Riskli Maddeler Bulundu"
            : riskPct >= 40
              ? "Orta Seviye Risk Tespit Edildi"
              : "Düşük Riskli Görünüm"}
        </p>
        <p className="mt-1 text-xs font-medium text-slate-600">
          {teaser.criticalRiskCount} kritik risk
          {teaser.missingClauseCount > 0
            ? ` · ${teaser.missingClauseCount} eksik madde`
            : null}
        </p>
      </div>

      <ul className="space-y-2.5">
        <li className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/90 px-3.5 py-3">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
            aria-hidden
          />
          <p className="text-sm font-semibold text-emerald-950">
            <span aria-hidden>🟢 </span>
            {SAFE_UNLOCKED}
          </p>
        </li>

        {locked.map((text, i) => (
          <li
            key={text}
            className="relative overflow-hidden rounded-xl border border-red-200/80 bg-red-50/50 px-3.5 py-3"
          >
            <div className="flex items-start gap-3 select-none">
              <Lock
                className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                aria-hidden
              />
              <p className="text-sm font-medium text-red-950/80 blur-[5px]">
                [Kilitli Risk #{i + 1}]: {text}
              </p>
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-white/40 to-white/10"
              aria-hidden
            />
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        className="h-14 w-full rounded-xl bg-[var(--cta-primary)] text-base font-bold text-white shadow-[0_0_28px_rgba(37,99,235,0.5)] transition-all hover:scale-[1.01] hover:bg-[#1d4ed8] hover:shadow-[0_0_36px_rgba(37,99,235,0.6)]"
        asChild
      >
        <Link
          href={isLoggedIn ? "/analiz" : "/giris?kayit=1"}
          onClick={() =>
            captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_CLICKED, {
              source: "wizard_teaser_results",
            })
          }
        >
          <Unlock className="mr-1 h-4 w-4" aria-hidden />
          {isLoggedIn
            ? "Tüm Riskleri Gör"
            : "Ücretsiz Kayıt Ol & Tüm Riskleri Gör"}
        </Link>
      </Button>

      <button
        type="button"
        onClick={onAnalyzeAgain}
        className="w-full text-center text-sm font-semibold text-slate-500 hover:text-deep-navy"
      >
        Başka bir sözleşme tara
      </button>

      <p className="text-center text-[11px] leading-relaxed text-slate-400">
        Özet tahmindir; hukuki danışmanlık yerine geçmez.
      </p>
    </div>
  );
}
