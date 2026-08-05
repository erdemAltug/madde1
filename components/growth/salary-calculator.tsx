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

const PRESETS = [MIN_GROSS_2026, 50_000, 75_000, 100_000, 150_000] as const;

type SalaryRow = {
  month: (typeof MONTHS)[number];
  gross: number;
  sgk: number;
  unemployment: number;
  incomeTax: number;
  stampTax: number;
  net: number;
  cumulativeTaxBase: number;
  bracketRate: number;
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

function formatCompactTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function bracketRate(base: number): number {
  if (base <= 190_000) return 0.15;
  if (base <= 400_000) return 0.2;
  if (base <= 1_500_000) return 0.27;
  if (base <= 5_300_000) return 0.35;
  return 0.4;
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
    const stampTax = Math.max(0, gross * STAMP_TAX_RATE - STAMP_TAX_EXEMPTION);
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
      bracketRate: bracketRate(cumulativeTaxBase),
    };
  });
}

function sumBy(rows: SalaryRow[], pick: (row: SalaryRow) => number): number {
  return rows.reduce((total, row) => total + pick(row), 0);
}

function SummaryCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-[#005BEA]/25 bg-[#005BEA]/5 p-4"
          : "rounded-xl border border-slate-200 bg-slate-50 p-4"
      }
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold tabular-nums text-madde-ink sm:text-xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function SalaryCalculator({
  analyticsToolId,
}: {
  analyticsToolId?: FreeToolId;
}) {
  const [grossInput, setGrossInput] = React.useState("50.000");
  const trackedRef = React.useRef(false);

  const gross = parseNumber(grossInput);
  const valid = gross >= MIN_GROSS_2026;
  const rows = React.useMemo(
    () => (valid ? calculateSalaryRows(gross) : []),
    [gross, valid],
  );

  const track = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: "tool_page",
    });
  }, [analyticsToolId]);

  const totals = React.useMemo(() => {
    if (!rows.length) return null;
    const net = sumBy(rows, (r) => r.net);
    const sgk = sumBy(rows, (r) => r.sgk + r.unemployment);
    const tax = sumBy(rows, (r) => r.incomeTax + r.stampTax);
    return {
      gross: sumBy(rows, (r) => r.gross),
      net,
      sgk,
      tax,
      averageNet: net / rows.length,
      firstNet: rows[0].net,
      lastNet: rows[rows.length - 1].net,
    };
  }, [rows]);

  const netDrop = totals ? totals.firstNet - totals.lastNet : 0;

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Banknote className="h-5 w-5 text-[#005BEA]" />
          2026 brütten nete maaş hesaplama
        </CardTitle>
        <p className="text-xs leading-relaxed text-slate-500">
          Brüt ücretinizi girin; Ocak&apos;tan Aralık&apos;a kadar tüm yılın
          kesintileri ve net maaşı tek tabloda çıkar.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
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
              className="h-12 max-w-xs rounded-xl border-2 border-slate-200 text-lg font-bold tabular-nums focus-visible:border-[#005BEA]"
            />
            {!valid ? (
              <p className="text-xs font-medium text-amber-700">
                Tam ay çalışan için 2026 brüt asgari ücret en az{" "}
                {formatTry(MIN_GROSS_2026)} olmalıdır.
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const active = valid && Math.round(gross) === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setGrossInput(
                      new Intl.NumberFormat("tr-TR").format(preset),
                    );
                    track();
                  }}
                  className={
                    active
                      ? "rounded-full border border-[#005BEA] bg-[#005BEA] px-3 py-1.5 text-xs font-semibold text-white"
                      : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-[#005BEA] hover:text-[#005BEA]"
                  }
                >
                  {preset === MIN_GROSS_2026
                    ? "Asgari ücret"
                    : formatCompactTry(preset)}
                </button>
              );
            })}
          </div>
        </div>

        {totals ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                label="Yıllık net toplam"
                value={formatTry(totals.net)}
                hint="12 ay boyunca elinize geçen tahmini toplam"
                accent
              />
              <SummaryCard
                label="Ortalama aylık net"
                value={formatTry(totals.averageNet)}
                hint={`Ocak ${formatCompactTry(totals.firstNet)} → Aralık ${formatCompactTry(totals.lastNet)}`}
              />
              <SummaryCard
                label="Yıllık SGK + işsizlik"
                value={formatTry(totals.sgk)}
                hint="Çalışan payı %14 + %1"
              />
              <SummaryCard
                label="Yıllık vergi"
                value={formatTry(totals.tax)}
                hint="Gelir + damga vergisi"
              />
            </div>

            {netDrop > 1 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                Vergi dilimi etkisiyle net maaşınız yıl içinde{" "}
                <strong className="tabular-nums">{formatTry(netDrop)}</strong>{" "}
                azalıyor. Ocak neti ile Aralık neti arasındaki bu fark, brüt
                ücret değişmese bile kümülatif matrahın büyümesinden kaynaklanır.
              </div>
            ) : null}

            <div className="hidden overflow-hidden rounded-xl border border-slate-200 sm:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2.5 font-semibold">Ay</th>
                      <th className="px-3 py-2.5 font-semibold">Brüt</th>
                      <th className="px-3 py-2.5 font-semibold">SGK</th>
                      <th className="px-3 py-2.5 font-semibold">İşsizlik</th>
                      <th className="px-3 py-2.5 font-semibold">
                        Gelir vergisi
                      </th>
                      <th className="px-3 py-2.5 font-semibold">Damga</th>
                      <th className="px-3 py-2.5 font-semibold">Dilim</th>
                      <th className="px-3 py-2.5 font-semibold">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50/70">
                        <td className="px-3 py-2 font-semibold">{row.month}</td>
                        <td className="px-3 py-2 tabular-nums">
                          {formatTry(row.gross)}
                        </td>
                        <td className="px-3 py-2 tabular-nums">
                          {formatTry(row.sgk)}
                        </td>
                        <td className="px-3 py-2 tabular-nums">
                          {formatTry(row.unemployment)}
                        </td>
                        <td className="px-3 py-2 tabular-nums">
                          {formatTry(row.incomeTax)}
                        </td>
                        <td className="px-3 py-2 tabular-nums">
                          {formatTry(row.stampTax)}
                        </td>
                        <td className="px-3 py-2">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 tabular-nums">
                            %{Math.round(row.bracketRate * 100)}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-bold tabular-nums text-madde-ink">
                          {formatTry(row.net)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                    <tr>
                      <td className="px-3 py-2.5 font-bold">Yıllık toplam</td>
                      <td className="px-3 py-2.5 font-semibold tabular-nums">
                        {formatTry(totals.gross)}
                      </td>
                      <td className="px-3 py-2.5 font-semibold tabular-nums">
                        {formatTry(sumBy(rows, (r) => r.sgk))}
                      </td>
                      <td className="px-3 py-2.5 font-semibold tabular-nums">
                        {formatTry(sumBy(rows, (r) => r.unemployment))}
                      </td>
                      <td className="px-3 py-2.5 font-semibold tabular-nums">
                        {formatTry(sumBy(rows, (r) => r.incomeTax))}
                      </td>
                      <td className="px-3 py-2.5 font-semibold tabular-nums">
                        {formatTry(sumBy(rows, (r) => r.stampTax))}
                      </td>
                      <td className="px-3 py-2.5" />
                      <td className="px-3 py-2.5 font-bold tabular-nums text-madde-ink">
                        {formatTry(totals.net)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="space-y-2 sm:hidden">
              {rows.map((row) => (
                <details
                  key={row.month}
                  className="rounded-xl border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-700">
                      {row.month}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 tabular-nums">
                        %{Math.round(row.bracketRate * 100)}
                      </span>
                      <span className="text-sm font-bold tabular-nums text-madde-ink">
                        {formatTry(row.net)}
                      </span>
                    </span>
                  </summary>
                  <dl className="space-y-1.5 border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <dt>Brüt</dt>
                      <dd className="tabular-nums">{formatTry(row.gross)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>SGK</dt>
                      <dd className="tabular-nums">{formatTry(row.sgk)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>İşsizlik</dt>
                      <dd className="tabular-nums">
                        {formatTry(row.unemployment)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Gelir vergisi</dt>
                      <dd className="tabular-nums">
                        {formatTry(row.incomeTax)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Damga vergisi</dt>
                      <dd className="tabular-nums">
                        {formatTry(row.stampTax)}
                      </dd>
                    </div>
                  </dl>
                </details>
              ))}
              <div className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-bold text-slate-700">
                  Yıllık net toplam
                </span>
                <span className="text-sm font-bold tabular-nums text-madde-ink">
                  {formatTry(totals.net)}
                </span>
              </div>
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
