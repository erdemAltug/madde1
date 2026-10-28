"use client";

import * as React from "react";
import Link from "next/link";
import { BellRing, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { CountdownChip, formatTrDate } from "@/components/assistant/countdown-chip";
import { extractKeyDates, type KeyDate } from "@/lib/assistant/date-extract";
import { addEvents, stashPendingEvents, type NewLegalEvent } from "@/lib/assistant/events";
import { useAuthSession } from "@/hooks/use-auth-session";
import { captureEvent } from "@/lib/analytics/capture";
import { cn } from "@/lib/utils";

type Props = {
  contractText: string;
  analysisId?: string | null;
  className?: string;
};

/**
 * Tarama sonucunda gösterilir: sözleşmeden çıkarılan kritik tarihler + "Hatırlat".
 * Misafir kullanıcıda seçimler saklanır, kayıttan sonra panelde otomatik eklenir.
 */
export function KeyDatesCard({ contractText, analysisId = null, className }: Props) {
  const dates = React.useMemo(() => extractKeyDates(contractText), [contractText]);
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set(dates.map((d) => d.key)));
  const [state, setState] = React.useState<"idle" | "saving" | "saved" | "error">("idle");
  const [authOpen, setAuthOpen] = React.useState(false);
  const { isLoggedIn } = useAuthSession();

  React.useEffect(() => {
    setSelected(new Set(dates.map((d) => d.key)));
    setState("idle");
  }, [dates]);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const chosen: NewLegalEvent[] = dates
    .filter((d) => selected.has(d.key))
    .map((d: KeyDate) => ({
      title: d.title,
      kind: d.kind,
      due_date: d.date,
      notes: d.hint,
      analysis_id: analysisId,
    }));

  const onRemind = async () => {
    if (chosen.length === 0) return;
    captureEvent("reminders_requested", { count: chosen.length, logged_in: isLoggedIn });

    if (!isLoggedIn) {
      stashPendingEvents(chosen);
      setAuthOpen(true);
      return;
    }

    setState("saving");
    const saved = await addEvents(chosen);
    setState(saved ? "saved" : "error");
    if (saved) captureEvent("reminders_saved", { count: saved.length, surface: "scan_result" });
  };

  return (
    <section
      className={cn("rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5", className)}
      aria-labelledby="key-dates-title"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
          <BellRing className="h-[18px] w-[18px]" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 id="key-dates-title" className="text-base font-bold text-slate-900">
            {dates.length > 0 ? "Bu sözleşmedeki önemli tarihler" : "Tarihleri sizin yerinize takip edelim"}
          </h3>
          <p className="mt-0.5 text-sm text-slate-600">
            {dates.length > 0
              ? "Seçtiklerinizi takvime ekleyelim; zamanı gelmeden e-postayla hatırlatalım."
              : "Metinde açık bir tarih bulamadık. Panelden kira yenileme, zam dönemi gibi tarihleri elle ekleyebilirsiniz."}
          </p>
        </div>
      </div>

      {dates.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {dates.map((d) => {
            const on = selected.has(d.key);
            return (
              <li key={d.key}>
                <button
                  type="button"
                  onClick={() => toggle(d.key)}
                  aria-pressed={on}
                  disabled={state === "saved"}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition",
                    on ? "border-[#005BEA]/40 bg-[#005BEA]/[0.04]" : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                      on ? "border-[#005BEA] bg-[#005BEA] text-white" : "border-slate-300 bg-white",
                    )}
                    aria-hidden
                  >
                    {on ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">{d.title}</span>
                      <CountdownChip date={d.date} />
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-700">{formatTrDate(d.date)}</span>
                    <span className="mt-1 block text-xs text-slate-500">{d.hint}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {dates.length > 0 && state !== "saved" ? (
          <Button
            type="button"
            className="h-11 flex-1 rounded-xl bg-[#005BEA] font-semibold text-white hover:bg-[#004BC4]"
            onClick={() => void onRemind()}
            disabled={chosen.length === 0 || state === "saving"}
          >
            <BellRing className="mr-2 h-4 w-4" aria-hidden />
            {state === "saving"
              ? "Kaydediliyor…"
              : isLoggedIn
                ? `${chosen.length} tarihi hatırlat`
                : `${chosen.length} tarihi hatırlat · ücretsiz hesap`}
          </Button>
        ) : null}
        {state === "saved" ? (
          <Button asChild className="h-11 flex-1 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
            <Link href="/panel">
              <Check className="mr-2 h-4 w-4" aria-hidden />
              Takvime eklendi · Panele git
            </Link>
          </Button>
        ) : null}
        {dates.length === 0 ? (
          <Button asChild variant="outline" className="h-11 flex-1 rounded-xl font-semibold">
            <Link href={isLoggedIn ? "/panel#takvim" : "/giris?next=/panel"}>
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              Tarih ekle
            </Link>
          </Button>
        ) : null}
      </div>
      {state === "error" ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          Tarihler kaydedilemedi. Biraz sonra tekrar deneyin.
        </p>
      ) : null}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
}
