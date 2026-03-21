"use client";

import * as React from "react";
import { Stamp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/** Basitleştirilmiş örnek: sözleşme yazısı üzerinden kabaca damga matrahı. */
export function StampTaxCalculator() {
  const [monthly, setMonthly] = React.useState("25000");
  const [months, setMonths] = React.useState("12");
  const [perMille, setPerMille] = React.useState("1.89");

  const m = Number(monthly.replace(",", ".")) || 0;
  const mo = Number(months.replace(",", ".")) || 0;
  const pm = Number(perMille.replace(",", ".")) || 0;
  const base = m * mo;
  const tax = base * (pm / 1000);

  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Stamp className="h-4 w-4 text-primary" />
          Damga vergisi (özet)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid gap-2">
          <Label htmlFor="dv-aylık">Aylık kira / bedel (TL)</Label>
          <Input
            id="dv-aylık"
            inputMode="decimal"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="dv-ay">Süre (ay)</Label>
            <Input
              id="dv-ay"
              inputMode="numeric"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dv-oran">Oran (‰)</Label>
            <Input
              id="dv-oran"
              inputMode="decimal"
              value={perMille}
              onChange={(e) => setPerMille(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2">
          <p className="text-xs text-muted-foreground">Yaklaşık matrah</p>
          <p className="text-sm font-medium tabular-nums">
            {base > 0
              ? `${base.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`
              : "—"}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Tahmini damga</p>
          <p className="text-lg font-semibold tabular-nums text-primary">
            {tax > 0
              ? `${tax.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL`
              : "—"}
          </p>
        </div>
        <p className="text-[11px] leading-snug text-muted-foreground">
          Tarife ve istisnalar işlem türüne göre değişir; bu hesap yalnızca
          kabaca yönlendirme içindir.
        </p>
      </CardContent>
    </Card>
  );
}
