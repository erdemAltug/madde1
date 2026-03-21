"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function RentIncreaseCalculator() {
  const [current, setCurrent] = React.useState("25000");
  const [rate, setRate] = React.useState("25");

  const cur = Number(current.replace(",", ".")) || 0;
  const r = Number(rate.replace(",", ".")) || 0;
  const next = cur * (1 + r / 100);

  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <TrendingUp className="h-4 w-4 text-primary" />
          Kira artış oranı
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid gap-2">
          <Label htmlFor="kira-mevcut">Mevcut aylık kira (TL)</Label>
          <Input
            id="kira-mevcut"
            inputMode="decimal"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="kira-oran">Yıllık artış (%)</Label>
          <Input
            id="kira-oran"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2">
          <p className="text-xs text-muted-foreground">Tahmini yeni kira</p>
          <p className="text-lg font-semibold tabular-nums text-foreground">
            {next > 0
              ? `${next.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`
              : "—"}
          </p>
        </div>
        <p className="text-[11px] leading-snug text-muted-foreground">
          TÜFE tavanı, süre ve sözleşme türüne göre sonuç değişir; resmi oran ve
          hukuki kontrol için uzman görüşü gerekebilir.
        </p>
      </CardContent>
    </Card>
  );
}
