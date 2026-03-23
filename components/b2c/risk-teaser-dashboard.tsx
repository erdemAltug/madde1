"use client";

import * as React from "react";
import { AlertTriangle, FileWarning, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type TeaserData = {
  criticalRiskCount: number;
  missingClauseCount: number;
  categoryTitles: string[];
  /** 0–100: düşük = riskli (güven skoru) */
  securityScore?: number;
};

function clampScore(n: number) {
  return Math.min(100, Math.max(0, Math.round(n)));
}

function deriveSecurityScore(data: TeaserData): number {
  if (typeof data.securityScore === "number" && !Number.isNaN(data.securityScore)) {
    return clampScore(data.securityScore);
  }
  return clampScore(
    100 -
      data.criticalRiskCount * 12 -
      data.missingClauseCount * 8,
  );
}

type Props = {
  data: TeaserData | null;
  loading?: boolean;
  className?: string;
  /** Risk etiketine tıklanınca — kilitli alanı vurgulamak için */
  onCategoryInteract?: () => void;
};

export function RiskTeaserDashboard({
  data,
  loading,
  className,
  onCategoryInteract,
}: Props) {
  if (loading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-madde-blue/20 bg-gradient-to-br from-madde-blue/[0.06] via-white to-slate-50/80 p-5 shadow-lg shadow-madde-blue/10",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-madde-blue">
          <Sparkles className="h-4 w-4 animate-pulse" />
          Güven skoru hesaplanıyor…
        </div>
      </div>
    );
  }

  if (!data) return null;

  const score = deriveSecurityScore(data);
  const low = score < 55;
  const mid = score >= 55 && score < 75;

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-white p-5 shadow-lg shadow-slate-900/[0.06] sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={cn(
            "relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full shadow-inner ring-4 ring-offset-2 ring-offset-white",
            low &&
              "bg-gradient-to-br from-[#FF1744] via-[#ff4569] to-[#FF1744] ring-[#FF1744]/35",
            mid &&
              "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 ring-amber-400/40",
            !low &&
              !mid &&
              "bg-gradient-to-br from-[#00E676] via-[#00c853] to-[#00E676] ring-[#00E676]/35",
          )}
        >
          <div className="text-center text-white drop-shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">
              Güven
            </p>
            <p className="text-3xl font-black tabular-nums tracking-tighter">
              %{score}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-madde-blue">
            Ücretsiz ön tarama 
          </p>
          <p className="mt-2 text-xl font-bold leading-snug tracking-tight text-madde-ink sm:text-2xl">
            <span className="text-[#FF1744]">
              {data.criticalRiskCount} kritik risk
            </span>{" "}
            bulundu
            {data.missingClauseCount > 0 ? (
              <>
                {" "}
                ·{" "}
                <span className="text-amber-700">
                  {data.missingClauseCount} eksik madde
                </span>
              </>
            ) : null}
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
            Paranı koru: detaylı çözüm ve düzeltme metni kilitli. Tek tıkla
            açmak için{" "}
            <span className="font-semibold text-madde-ink">4,99 TL</span>.
          </p>
        </div>
      </div>

      {data.categoryTitles.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {data.categoryTitles.map((t) => (
            <li key={t}>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-semibold text-madde-ink shadow-sm transition hover:border-madde-blue/40 hover:bg-madde-blue/[0.04] hover:shadow-md active:scale-[0.98]"
                onClick={() => onCategoryInteract?.()}
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#FF1744]" />
                {t}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
        <FileWarning className="h-3.5 w-3.5 shrink-0" />
        Özet tahmindir; kesin hukuki sonuç değildir. Şüphede avukata danış.
      </p>
    </div>
  );
}
