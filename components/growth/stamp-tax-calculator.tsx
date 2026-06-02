"use client";

import * as React from "react";
import { Stamp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import type { FreeToolId } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const inputVivid =
  "rounded-xl border-2 border-slate-200/90 bg-white font-semibold tabular-nums shadow-sm transition-all placeholder:font-normal placeholder:text-slate-400 focus-visible:border-[#005BEA] focus-visible:ring-2 focus-visible:ring-[#005BEA]/25";

/** Basitleştirilmiş örnek: sözleşme yazısı üzerinden kabaca damga matrahı. */
export function StampTaxCalculator({
  cardClassName,
  embedded,
  vivid,
  analyticsToolId,
  analyticsSurface,
}: {
  cardClassName?: string;
  embedded?: boolean;
  vivid?: boolean;
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
} = {}) {
  const [monthly, setMonthly] = React.useState("25000");
  const [months, setMonths] = React.useState("12");
  const [perMille, setPerMille] = React.useState("1.89");
  const trackedRef = React.useRef(false);

  const trackFirstUse = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: analyticsSurface ?? "tool_page",
      tool_input_monthly: monthly,
      tool_input_months: months,
      tool_input_per_mille: perMille,
    });
  }, [analyticsToolId, analyticsSurface, monthly, months, perMille]);

  const m = Number(monthly.replace(",", ".")) || 0;
  const mo = Number(months.replace(",", ".")) || 0;
  const pm = Number(perMille.replace(",", ".")) || 0;
  const base = m * mo;
  const tax = base * (pm / 1000);
  const hasTax = tax > 0;

  return (
    <Card
      className={cn(
        "border-slate-200 bg-white shadow-sm",
        cardClassName,
      )}
    >
      {!embedded ? (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Stamp className="h-4 w-4 text-[#005BEA]" />
            Damga vergisi (özet)
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className={cn("space-y-3 text-sm", embedded && "pt-0")}>
        <div className="grid gap-2">
          <Label
            htmlFor="dv-aylık"
            className={cn(vivid && "text-xs font-bold uppercase tracking-wide text-slate-500")}
          >
            Aylık kira / bedel (TL)
          </Label>
          <Input
            id="dv-aylık"
            inputMode="decimal"
            value={monthly}
            onChange={(e) => {
              trackFirstUse();
              setMonthly(e.target.value);
            }}
            className={cn(vivid && inputVivid)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label
              htmlFor="dv-ay"
              className={cn(vivid && "text-xs font-bold uppercase tracking-wide text-slate-500")}
            >
              Süre (ay)
            </Label>
            <Input
              id="dv-ay"
              inputMode="numeric"
              value={months}
              onChange={(e) => {
                trackFirstUse();
                setMonths(e.target.value);
              }}
              className={cn(vivid && inputVivid)}
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="dv-oran"
              className={cn(vivid && "text-xs font-bold uppercase tracking-wide text-slate-500")}
            >
              Oran (‰)
            </Label>
            <Input
              id="dv-oran"
              inputMode="decimal"
              value={perMille}
              onChange={(e) => {
                trackFirstUse();
                setPerMille(e.target.value);
              }}
              className={cn(vivid && inputVivid)}
            />
          </div>
        </div>
        <div
          className={cn(
            "rounded-xl border-2 px-4 py-3",
            vivid
              ? "border-[#005BEA]/20 bg-gradient-to-br from-slate-50/80 to-white shadow-inner"
              : "border-slate-200 bg-slate-50",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Yaklaşık matrah
          </p>
          <p className="text-sm font-bold tabular-nums text-slate-800">
            {base > 0
              ? `${base.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`
              : "—"}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Tahmini damga
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={hasTax ? tax.toFixed(2) : "empty"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "text-xl font-extrabold tabular-nums tracking-tight",
                hasTax && vivid
                  ? "text-[#00E676] drop-shadow-[0_0_12px_rgba(0,230,118,0.35)]"
                  : hasTax
                    ? "text-blue-800"
                    : "text-slate-400",
              )}
            >
              {hasTax
                ? `${tax.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL`
                : "—"}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="text-[11px] font-medium leading-snug text-muted-foreground">
          Tarife ve istisnalar işlem türüne göre değişir; bu hesap yalnızca
          kabaca yönlendirme içindir.
        </p>
      </CardContent>
    </Card>
  );
}
