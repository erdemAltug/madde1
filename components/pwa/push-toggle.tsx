"use client";

import * as React from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { disablePush, enablePush, getPushState, type PushState } from "@/lib/push/client";

const COPY: Record<PushState, string> = {
  on: "Telefon bildirimleri açık",
  off: "Hatırlatmaları telefonuma bildirim olarak gönder",
  denied: "Bildirim izni kapalı — tarayıcı ayarlarından açabilirsiniz",
  unsupported: "",
  unconfigured: "",
};

/** Panelde takvim hatırlatmaları için push aç/kapat. Destek yoksa hiç görünmez. */
export function PushToggle() {
  const [state, setState] = React.useState<PushState | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    void getPushState().then(setState);
  }, []);

  if (!state || state === "unsupported" || state === "unconfigured") return null;

  const toggle = async () => {
    setBusy(true);
    try {
      setState(state === "on" ? await disablePush() : await enablePush());
    } finally {
      setBusy(false);
    }
  };

  const Icon = state === "on" ? Bell : BellOff;
  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy || state === "denied"}
      aria-pressed={state === "on"}
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-[#005BEA]/40 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin text-[#005BEA]" />
      ) : (
        <Icon className={state === "on" ? "h-4 w-4 text-[#005BEA]" : "h-4 w-4 text-slate-500"} />
      )}
      <span className="flex-1">{COPY[state]}</span>
      {state !== "denied" ? (
        <span
          aria-hidden
          className={`relative h-5 w-9 rounded-full transition ${state === "on" ? "bg-[#005BEA]" : "bg-slate-300 dark:bg-slate-600"}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${state === "on" ? "left-[18px]" : "left-0.5"}`}
          />
        </span>
      ) : null}
    </button>
  );
}
