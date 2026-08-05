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
  const [averageGross, setAverageGross] = React.useState("45.000");
  const [premiumDays, setPremiumDays] = React.useState("900");
  const trackedRef = React.useRef(false);

  const gross = parseNumber(averageGross);
  const days = parseNumber(premiumDays);
  const durationDays = benefitDays(days);
  const grossBenefit = Math.min(gross * 0.4, MAX_GROSS_BENEFIT_2026);
  const stampTax = grossBenefit * STAMP_TAX_RATE;
  const netBenefit = Math.max(0, grossBenefit - stampTax);
  const monthCount = durationDays / 30;
  const cappedByCeiling = gross * 0.4 > MAX_GROSS_BENEFIT_2026;
  const schedule = React.useMemo(
    () =>
      Array.from({ length: Math.round(monthCount) }, (_, index) => ({
        index: index + 1,
        net: netBenefit,
        cumulative: netBenefit * (index + 1),
      })),
    [monthCount, netBenefit],
  );

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

        {schedule.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <p className="text-xs font-bold text-slate-700">
                Ödeme takvimi ({schedule.length} ay)
              </p>
              {cappedByCeiling ? (
                <p className="text-[11px] font-semibold text-amber-700">
                  Tavan uygulandı
                </p>
              ) : null}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px] text-left text-xs">
                <thead className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-2 font-semibold">Ödeme</th>
                    <th className="px-4 py-2 font-semibold">Net tutar</th>
                    <th className="px-4 py-2 font-semibold">Kümülatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.map((item) => (
                    <tr key={item.index} className="hover:bg-slate-50/70">
                      <td className="px-4 py-2 font-semibold">
                        {item.index}. ay
                      </td>
                      <td className="px-4 py-2 tabular-nums">
                        {formatTry(item.net)}
                      </td>
                      <td className="px-4 py-2 font-semibold tabular-nums text-madde-ink">
                        {formatTry(item.cumulative)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Prim günü tek başına yeterli değildir. Feshin nedeni, son 120 günlük
          hizmet akdi koşulu, başvuru zamanı ve İŞKUR kayıtları hak kazanmayı
          etkiler. Araç yalnızca tutar ve süre tahmini yapar.
        </div>
      </CardContent>
    </Card>
  );
}
