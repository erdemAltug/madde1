"use client";

import * as React from "react";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import type { FreeToolId } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const inputClass =
  "rounded-xl border-2 border-slate-200/90 bg-white font-semibold tabular-nums shadow-sm transition-all placeholder:font-normal placeholder:text-slate-400 focus-visible:border-[#005BEA] focus-visible:ring-2 focus-visible:ring-[#005BEA]/25";

function parseNum(s: string) {
  return Number(s.replace(",", ".")) || 0;
}

function formatTry(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);
}

export function KidemTazminatiCalculator({
  analyticsToolId,
  analyticsSurface,
}: {
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
}) {
  const [gross, setGross] = React.useState("45000");
  const [years, setYears] = React.useState("5");
  const trackedRef = React.useRef(false);

  const grossMonthly = parseNum(gross);
  const workYears = parseNum(years);
  const daily = grossMonthly > 0 ? grossMonthly / 30 : 0;
  const estimated = workYears > 0 ? workYears * 30 * daily : 0;
  const hasResult = grossMonthly > 0 && workYears > 0;

  const track = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: analyticsSurface ?? "tool_page",
    });
  }, [analyticsToolId, analyticsSurface]);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Briefcase className="h-4 w-4 text-[#005BEA]" />
          Kıdem tazminatı tahmini
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="kidem-brut">Brüt aylık ücret (₺)</Label>
            <Input
              id="kidem-brut"
              inputMode="decimal"
              value={gross}
              onChange={(e) => {
                setGross(e.target.value);
                track();
              }}
              className={cn("mt-1.5", inputClass)}
            />
          </div>
          <div>
            <Label htmlFor="kidem-yil">Çalışma süresi (yıl)</Label>
            <Input
              id="kidem-yil"
              inputMode="decimal"
              value={years}
              onChange={(e) => {
                setYears(e.target.value);
                track();
              }}
              className={cn("mt-1.5", inputClass)}
            />
          </div>
        </div>

        {hasResult ? (
          <div className="rounded-xl border border-[#005BEA]/20 bg-indigo-50/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tahmini kıdem tazminatı
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
              {formatTry(estimated)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Her tam yıl için 30 günlük brüt ücret formülü (bilgilendirme). Kıdem tavanı, kısmi
              yıl ve fesih türü sonucu değiştirir.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

/** İş Kanunu 17 — ihbar süreleri (hafta) */
export function noticeWeeksForTenure(years: number): number {
  const months = years * 12;
  if (months < 6) return 2;
  if (months < 18) return 4;
  if (months < 36) return 6;
  return 8;
}

export function IhbarTazminatiCalculator({
  analyticsToolId,
  analyticsSurface,
}: {
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
}) {
  const [gross, setGross] = React.useState("45000");
  const [years, setYears] = React.useState("3");
  const trackedRef = React.useRef(false);

  const grossMonthly = parseNum(gross);
  const workYears = parseNum(years);
  const weeks = noticeWeeksForTenure(workYears);
  const daily = grossMonthly > 0 ? grossMonthly / 30 : 0;
  const estimated = daily * weeks * 7;
  const hasResult = grossMonthly > 0 && workYears >= 0;

  const track = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: analyticsSurface ?? "tool_page",
    });
  }, [analyticsToolId, analyticsSurface]);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Briefcase className="h-4 w-4 text-[#005BEA]" />
          İhbar tazminatı tahmini
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="ihbar-brut">Brüt aylık ücret (₺)</Label>
            <Input
              id="ihbar-brut"
              inputMode="decimal"
              value={gross}
              onChange={(e) => {
                setGross(e.target.value);
                track();
              }}
              className={cn("mt-1.5", inputClass)}
            />
          </div>
          <div>
            <Label htmlFor="ihbar-yil">Çalışma süresi (yıl)</Label>
            <Input
              id="ihbar-yil"
              inputMode="decimal"
              value={years}
              onChange={(e) => {
                setYears(e.target.value);
                track();
              }}
              className={cn("mt-1.5", inputClass)}
            />
          </div>
        </div>

        {hasResult ? (
          <div className="rounded-xl border border-[#005BEA]/20 bg-indigo-50/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tahmini ihbar tazminatı
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
              {formatTry(estimated)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Kanuni ihbar süresi: {weeks} hafta. Bildirimsiz fesih varsayımıyla kabaca hesap;
              somut olayda farklılık gösterebilir.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
