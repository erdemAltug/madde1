"use client";

import * as React from "react";
import { Copy, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToolContractScanCta } from "@/components/growth/tool-contract-scan-cta";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

function parseNumber(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", ".")) || 0;
}

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildMessage(paid: number, deducted: number, refund: number): string {
  return `Merhaba,

Kiralananı teslim ettim. Ödediğim depozito ${formatTry(paid)}. Bildirdiğiniz kesinti ${formatTry(deducted)}.

Olağan kullanımdan doğan yıpranma kesinti gerekçesi değildir. Kesinti kalemlerinin fatura ve tutanakla gösterilmesini, kalan ${formatTry(refund)} tutarın iadesini rica ederim.

Bu mesaj bilgilendirme amaçlı bir taslaktır.

Saygılarımla`;
}

export function DepozitoIadeAraci() {
  const [paidInput, setPaidInput] = React.useState("50000");
  const [deductedInput, setDeductedInput] = React.useState("15000");
  const [copied, setCopied] = React.useState(false);
  const [barDismissed, setBarDismissed] = React.useState(false);
  const trackedRef = React.useRef(false);

  const paid = parseNumber(paidInput);
  const deducted = parseNumber(deductedInput);
  const valid = paid > 0;
  const refund = Math.max(0, paid - deducted);
  const message = valid ? buildMessage(paid, deducted, refund) : "";

  const track = () => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: "depozito_iade_page",
      surface: "tool_page",
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Home className="h-5 w-5 text-[#005BEA]" />
            Depozito iadesi
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Ne yatırdığını ve ne kesildiğini yaz. Asistan iade tutarını ve ev
            sahibine mesajı çıkarsın. Dosya hesapta kalır; sonraki yazışma
            buradan devam eder.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="depozito-paid">Yatırdığın depozito (TL)</Label>
              <Input
                id="depozito-paid"
                inputMode="decimal"
                value={paidInput}
                onChange={(e) => {
                  setPaidInput(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depozito-cut">Ev sahibinin kestiği (TL)</Label>
              <Input
                id="depozito-cut"
                inputMode="decimal"
                value={deductedInput}
                onChange={(e) => {
                  setDeductedInput(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums"
              />
            </div>
          </div>

          {valid ? (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  İstenen iade
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                  {formatTry(refund)}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Olağan yıpranma kesinti değildir. Faturası olmayan kalemi
                  mesajda ayrıca sor.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-800">
                    Ev sahibine mesaj
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                    onClick={copy}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Kopyalandı" : "Kopyala"}
                  </Button>
                </div>
                <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
                  {message}
                </pre>
              </div>
              <ToolContractScanCta
                source="/haklarim/depozito-haklarim"
                href="/giris?kayit=1&next=/asistan"
                highlight={`İade talebin ${formatTry(refund)}.`}
                title="Bu yazışma asistanında kalsın."
                body="Sözleşmedeki depozito maddesini tarar, cevaba göre bir sonraki metni aynı dosyada yazarız."
                ctaLabel="Dosyayı asistanıma al"
              />
            </>
          ) : null}
          <p className="text-xs leading-relaxed text-slate-500">
            Bilgilendirme amaçlıdır, avukatlık değildir. Süre ve kesinti
            kalemleri sözleşmeye göre değişir.
          </p>
        </CardContent>
      </Card>
      <ToolResultSignupBar
        source="/haklarim/depozito-haklarim"
        visible={valid && !barDismissed}
        onDismiss={() => setBarDismissed(true)}
      />
    </>
  );
}
