"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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

export function RentIncreaseCalculator({
  cardClassName,
  embedded,
  vivid,
  bentoCompact,
  analyticsToolId,
  analyticsSurface,
}: {
  cardClassName?: string;
  embedded?: boolean;
  vivid?: boolean;
  /** Bento ızgarasında düşük yükseklik + iki sütun girdi */
  bentoCompact?: boolean;
  analyticsToolId?: FreeToolId;
  analyticsSurface?: "bento" | "tool_page";
} = {}) {
  const [current, setCurrent] = React.useState("25000");
  const [rate, setRate] = React.useState("25");
  const trackedRef = React.useRef(false);

  const trackFirstUse = React.useCallback(() => {
    if (!analyticsToolId || trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: analyticsSurface ?? "tool_page",
    });
  }, [analyticsToolId, analyticsSurface]);

  const cur = Number(current.replace(",", ".")) || 0;
  const r = Number(rate.replace(",", ".")) || 0;
  const next = cur * (1 + r / 100);
  const delta = next - cur;
  const hasResult = cur > 0 && r >= 0 && next > 0;

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
            <TrendingUp className="h-4 w-4 text-[#005BEA]" />
            Kira artış oranı
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent
        className={cn(
          "text-sm",
          bentoCompact && embedded ? "space-y-2.5 pt-0" : "space-y-3",
          embedded && !bentoCompact && "pt-0",
        )}
      >
        <div
          className={cn(
            "grid gap-2",
            bentoCompact && embedded && "grid-cols-1 gap-3 sm:grid-cols-2",
          )}
        >
          <div className="grid gap-1.5">
            <Label
              htmlFor="kira-mevcut"
              className={cn(
                vivid &&
                  "text-xs font-bold uppercase tracking-wide text-slate-500",
              )}
            >
              Mevcut aylık kira (TL)
            </Label>
            <Input
              id="kira-mevcut"
              inputMode="decimal"
              value={current}
              onChange={(e) => {
                trackFirstUse();
                setCurrent(e.target.value);
              }}
              className={cn(vivid && inputVivid)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label
              htmlFor="kira-oran"
              className={cn(
                vivid &&
                  "text-xs font-bold uppercase tracking-wide text-slate-500",
              )}
            >
              Yıllık artış (%)
            </Label>
            <Input
              id="kira-oran"
              inputMode="decimal"
              value={rate}
              onChange={(e) => {
                trackFirstUse();
                setRate(e.target.value);
              }}
              className={cn(vivid && inputVivid)}
            />
          </div>
        </div>
        <div
          className={cn(
            "rounded-xl border-2 transition-colors duration-300",
            bentoCompact && embedded ? "px-3 py-2.5" : "px-4 py-3",
            vivid
              ? "border-[#005BEA]/20 bg-gradient-to-br from-slate-50/80 to-white shadow-inner"
              : "border-blue-100 bg-blue-50/80",
          )}
        >
          {bentoCompact && embedded ? (
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Tahmini yeni kira
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hasResult ? String(Math.round(next)) : "empty"}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "text-lg font-extrabold tabular-nums tracking-tight sm:text-xl",
                      hasResult && vivid
                        ? "text-[#00E676] drop-shadow-[0_0_12px_rgba(0,230,118,0.35)]"
                        : hasResult
                          ? "text-blue-900"
                          : "text-slate-400",
                    )}
                  >
                    {hasResult
                      ? `${next.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`
                      : "—"}
                  </motion.p>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                {hasResult ? (
                  <motion.p
                    key={String(Math.round(delta))}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-bold tabular-nums text-slate-600"
                  >
                    +{delta.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}{" "}
                    TL / ay
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Tahmini yeni kira
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={hasResult ? String(Math.round(next)) : "empty"}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "mt-1 text-xl font-extrabold tabular-nums tracking-tight",
                    hasResult && vivid
                      ? "text-[#00E676] drop-shadow-[0_0_12px_rgba(0,230,118,0.35)]"
                      : hasResult
                        ? "text-blue-900"
                        : "text-slate-400",
                  )}
                >
                  {hasResult
                    ? `${next.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`
                    : "—"}
                </motion.p>
              </AnimatePresence>
            </>
          )}
        </div>
        {bentoCompact && embedded ? (
          <>
            <p className="sr-only">
              TÜFE tavanı, süre ve sözleşme türüne göre sonuç değişir; resmi oran
              ve hukuki kontrol için uzman görüşü gerekebilir.
            </p>
            <p className="text-[10px] font-medium leading-snug text-muted-foreground">
              TÜFE, süre ve sözleşme türüne göre değişir; tam sayfada detay ve
              yasal çerçeve.
            </p>
          </>
        ) : (
          <p className="text-[11px] font-medium leading-snug text-muted-foreground">
            TÜFE tavanı, süre ve sözleşme türüne göre sonuç değişir; resmi oran ve
            hukuki kontrol için uzman görüşü gerekebilir.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
