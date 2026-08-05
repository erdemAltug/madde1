"use client";

import * as React from "react";
import { Clock, CalendarDays } from "lucide-react";
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

/** Kabaca aylık brüt / 225 saat (yaygın pratik yaklaşım) */
function hourlyFromMonthly(grossMonthly: number) {
  return grossMonthly > 0 ? grossMonthly / 225 : 0;
}

export function FazlaMesaiCalculator({
  analyticsToolId,
  analyticsSurface,
}: {
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
}) {
  const [gross, setGross] = React.useState("45000");
  const [hours, setHours] = React.useState("20");
  const trackedRef = React.useRef(false);

  const grossMonthly = parseNum(gross);
  const overtimeHours = parseNum(hours);
  const hourly = hourlyFromMonthly(grossMonthly);
  const estimated = hourly * 1.5 * overtimeHours;
  const hasResult = grossMonthly > 0 && overtimeHours > 0;

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
          <Clock className="h-4 w-4 text-[#005BEA]" />
          Fazla mesai ücreti tahmini
        </CardTitle>
        <p className="text-xs font-medium text-slate-500">
          Saatlik ücret × 1,5 × fazla mesai saati (bilgilendirme amaçlı tahmin)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fm-gross">Brüt aylık ücret (TL)</Label>
            <Input
              id="fm-gross"
              inputMode="decimal"
              value={gross}
              onChange={(e) => {
                setGross(e.target.value);
                track();
              }}
              className={cn(inputClass)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fm-hours">Fazla mesai saati</Label>
            <Input
              id="fm-hours"
              inputMode="decimal"
              value={hours}
              onChange={(e) => {
                setHours(e.target.value);
                track();
              }}
              className={cn(inputClass)}
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tahmini fazla mesai ücreti
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
            {hasResult ? formatTry(estimated) : "—"}
          </p>
          {hasResult ? (
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Yaklaşık saatlik: {formatTry(hourly)} · Zamlı (×1,5):{" "}
              {formatTry(hourly * 1.5)}. Gece, tatil ve yazılı anlaşma sonucu
              değiştirebilir.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function annualLeaveDays(years: number) {
  if (years < 1) return 0;
  if (years < 5) return 14;
  if (years < 15) return 20;
  return 26;
}

export function YillikIzinCalculator({
  analyticsToolId,
  analyticsSurface,
}: {
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
}) {
  const [gross, setGross] = React.useState("45000");
  const [years, setYears] = React.useState("4");
  const [unused, setUnused] = React.useState("5");
  const trackedRef = React.useRef(false);

  const grossMonthly = parseNum(gross);
  const workYears = parseNum(years);
  const unusedDays = parseNum(unused);
  const entitled = annualLeaveDays(workYears);
  const daily = grossMonthly > 0 ? grossMonthly / 30 : 0;
  const unusedPay = daily * unusedDays;
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
          <CalendarDays className="h-4 w-4 text-[#005BEA]" />
          Yıllık izin süresi ve ücret tahmini
        </CardTitle>
        <p className="text-xs font-medium text-slate-500">
          Kıdeme göre asgari izin günü + kullanılmayan gün ücreti (tahmini)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="yi-gross">Brüt aylık ücret (TL)</Label>
            <Input
              id="yi-gross"
              inputMode="decimal"
              value={gross}
              onChange={(e) => {
                setGross(e.target.value);
                track();
              }}
              className={cn(inputClass)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yi-years">Kıdem (yıl)</Label>
            <Input
              id="yi-years"
              inputMode="decimal"
              value={years}
              onChange={(e) => {
                setYears(e.target.value);
                track();
              }}
              className={cn(inputClass)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yi-unused">Kullanılmayan gün</Label>
            <Input
              id="yi-unused"
              inputMode="decimal"
              value={unused}
              onChange={(e) => {
                setUnused(e.target.value);
                track();
              }}
              className={cn(inputClass)}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tahmini asgari izin
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
              {hasResult ? `${entitled} gün` : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Kullanılmayan gün ücreti
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
              {hasResult && unusedDays > 0 ? formatTry(unusedPay) : "—"}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-600">
          Asgari süreler genel çerçevedir; yaş, iş sözleşmesi veya TİS daha
          elverişli hak tanıyabilir. Sonuç hukuki görüş değildir.
        </p>
      </CardContent>
    </Card>
  );
}
