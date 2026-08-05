"use client";

import * as React from "react";
import { Banknote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents, type FreeToolId } from "@/lib/analytics/events";

const MIN_GROSS_2026 = 33_030;
const SGK_CEILING_2026 = 297_270;
const SGK_EMPLOYEE_RATE = 0.14;
const UNEMPLOYMENT_EMPLOYEE_RATE = 0.01;
const STAMP_TAX_RATE = 0.00759;
const STAMP_TAX_EXEMPTION = 250.7;

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;

const INCOME_TAX_EXEMPTIONS_2026 = [
  4_211.33,
  4_211.33,
  4_211.33,
  4_211.33,
  4_211.33,
  4_211.33,
  4_537.75,
  5_615.1,
  5_615.1,
  5_615.1,
  5_615.1,
  5_615.1,
] as const;

type SalaryRow = {
  month: (typeof MONTHS)[number];
  gross: number;
  sgk: number;
  unemployment: number;
  incomeTax: number;
  stampTax: number;
  net: number;
  cumulativeTaxBase: number;
};

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

function cumulativeIncomeTax(base: number): number {
  if (base <= 190_000) return base * 0.15;
  if (base <= 400_000) return 28_500 + (base - 190_000) * 0.2;
  if (base <= 1_500_000) return 70_500 + (base - 400_000) * 0.27;
  if (base <= 5_300_000) return 367_500 + (base - 1_500_000) * 0.35;
  return 1_697_500 + (base - 5_300_000) * 0.4;
}

function calculateSalaryRows(gross: number): SalaryRow[] {
  let cumulativeTaxBase = 0;
  let previousCumulativeTax = 0;

  return MONTHS.map((month, index) => {
    const sgkBase = Math.min(gross, SGK_CEILING_2026);
    const sgk = sgkBase * SGK_EMPLOYEE_RATE;
    const unemployment = sgkBase * UNEMPLOYMENT_EMPLOYEE_RATE;
    const monthlyTaxBase = Math.max(0, gross - sgk - unemployment);
    cumulativeTaxBase += monthlyTaxBase;

    const cumulativeTax = cumulativeIncomeTax(cumulativeTaxBase);
    const calculatedMonthlyTax = cumulativeTax - previousCumulativeTax;
    previousCumulativeTax = cumulativeTax;

    const incomeTax = Math.max(
      0,
      calculatedMonthlyTax - INCOME_TAX_EXEMPTIONS_2026[index],
    );
    const stampTax = Math.max(
      0,
      gross * STAMP_TAX_RATE - STAMP_TAX_EXEMPTION,
    );
    const net = gross - sgk - unemployment - incomeTax - stampTax;

    return {
      month,
      gross,
      sgk,
      unemployment,
      incomeTax,
      stampTax,
      net,
      cumulativeTaxBase,
    };
  });
}

export function SalaryCalculator({
  analyticsToolId,
}: {
  analyticsToolId?: FreeToolId;
}) {
  const [grossInput, setGrossInput] = React.useState("50000");
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const trackedRef = React.useRef(false);

  const gross = parseNumber(grossInput);
  const valid = gross >= MIN_GROSS_2026;
  const rows = React.useMemo(
    () => (valid ? calculateSalaryRows(gross) : []),
    [gross, valid],
  );
  const row = rows[selectedMonth];

  const track = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: "tool_page",
    });
  }, [analyticsToolId]);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Banknote className="h-5 w-5 text-[#005BEA]" />
          2026 brütten nete maaş hesaplama
        </CardTitle>
        <p className="text-xs leading-relaxed text-slate-500">
          Kümülatif gelir vergisi, SGK tavanı ve asgari ücret istisnası dahil
          tahmini bordro.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salary-gross">Aylık brüt ücret (TL)</Label>
            <Input
              id="salary-gross"
              inputMode="decimal"
              value={grossInput}
              onChange={(event) => {
                setGrossInput(event.target.value);
                track();
              }}
              className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
            />
            {!valid ? (
              <p className="text-xs font-medium text-amber-700">
                Tam ay çalışan için 2026 brüt asgari ücret en az{" "}
                {formatTry(MIN_GROSS_2026)} olmalıdır.
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary-month">Görüntülenecek ay</Label>
            <select
              id="salary-month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(Number(event.target.value))}
              className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold focus:border-[#005BEA] focus:outline-none"
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index}>
                  {month} 2026
                </option>
              ))}
            </select>
          </div>
        </div>

        {row ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Net maaş
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
                  {formatTry(row.net)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  SGK + işsizlik
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
                  {formatTry(row.sgk + row.unemployment)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vergiler
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-madde-ink">
                  {formatTry(row.incomeTax + row.stampTax)}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">Ay</th>
                    <th className="px-3 py-2.5 font-semibold">Brüt</th>
                    <th className="px-3 py-2.5 font-semibold">SGK</th>
                    <th className="px-3 py-2.5 font-semibold">İşsizlik</th>
                    <th className="px-3 py-2.5 font-semibold">Gelir vergisi</th>
                    <th className="px-3 py-2.5 font-semibold">Damga</th>
                    <th className="px-3 py-2.5 font-semibold">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((salaryRow, index) => (
                    <tr
                      key={salaryRow.month}
                      className={index === selectedMonth ? "bg-indigo-50/60" : ""}
                    >
                      <td className="px-3 py-2 font-semibold">
                        {salaryRow.month}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {formatTry(salaryRow.gross)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {formatTry(salaryRow.sgk)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {formatTry(salaryRow.unemployment)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {formatTry(salaryRow.incomeTax)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {formatTry(salaryRow.stampTax)}
                      </td>
                      <td className="px-3 py-2 font-bold tabular-nums text-madde-ink">
                        {formatTry(salaryRow.net)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        <p className="text-xs leading-relaxed text-slate-500">
          Hesap; aynı brüt ücretin 12 ay boyunca devam ettiği, tam ay çalışıldığı
          ve standart çalışan kesintilerinin uygulandığı varsayımıyla tahmin
          üretir. Prim, engellilik indirimi, özel istisna, BES, yemek/yol ve
          önceki işverenden taşınan matrah sonucu değiştirebilir.
        </p>
      </CardContent>
    </Card>
  );
}
