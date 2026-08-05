"use client";

import * as React from "react";
import { BriefcaseBusiness } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const MIN_GROSS_2026 = 33_030;
const MAX_GROSS_BENEFIT_2026 = MIN_GROSS_2026 * 0.8;
const STAMP_TAX_RATE = 0.00759;

function parseNumber(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", ".")) || 0;
}

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function benefitDays(premiumDays: number): number {
  if (premiumDays >= 1080) return 300;
  if (premiumDays >= 900) return 240;
  if (premiumDays >= 600) return 180;
  return 0;
}

export function UnemploymentCalculator() {
  const [averageGross, setAverageGross] = React.useState("45000");
  const [premiumDays, setPremiumDays] = React.useState("900");
  const trackedRef = React.useRef(false);

  const gross = parseNumber(averageGross);
  const days = parseNumber(premiumDays);
  const durationDays = benefitDays(days);
  const grossBenefit = Math.min(gross * 0.4, MAX_GROSS_BENEFIT_2026);
  const stampTax = grossBenefit * STAMP_TAX_RATE;
  const netBenefit = Math.max(0, grossBenefit - stampTax);

  const track = React.useCallback(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: "unemployment_benefit_page",
      surface: "tool_page",
    });
  }, []);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <BriefcaseBusiness className="h-5 w-5 text-[#005BEA]" />
          2026 işsizlik maaşı tahmini
        </CardTitle>
        <p className="text-xs leading-relaxed text-slate-500">
          Son dört aylık ortalama prime esas kazancın %40&apos;ı; brüt asgari
          ücretin %80&apos;i tavanıyla.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="unemployment-gross">
              Son 4 ay ortalama brüt kazanç (TL)
            </Label>
            <Input
              id="unemployment-gross"
              inputMode="decimal"
              value={averageGross}
              onChange={(event) => {
                setAverageGross(event.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unemployment-days">
              Son 3 yıldaki prim gününüz
            </Label>
            <Input
              id="unemployment-days"
              inputMode="numeric"
              value={premiumDays}
              onChange={(event) => {
                setPremiumDays(event.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Aylık net tahmin
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
              {gross > 0 ? formatTry(netBenefit) : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ödeme süresi
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
              {durationDays > 0 ? `${durationDays} gün` : "Koşul sağlanmıyor"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tahmini toplam
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
              {durationDays > 0
                ? formatTry(netBenefit * (durationDays / 30))
                : "—"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Prim günü tek başına yeterli değildir. Feshin nedeni, son 120 günlük
          hizmet akdi koşulu, başvuru zamanı ve İŞKUR kayıtları hak kazanmayı
          etkiler. Araç yalnızca tutar ve süre tahmini yapar.
        </div>
      </CardContent>
    </Card>
  );
}
