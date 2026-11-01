"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Download, X } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "clause_pwa_dismissed_at";
const DISMISS_DAYS = 30;
/** Kurulum teklifi yalnız değer görülen sayfalarda: panel ve asistan. Açılışta popup yok. */
const PROMPT_PATHS = ["/panel", "/asistan"];

function recentlyDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Number.isFinite(at) && Date.now() - at < DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

/** Service worker kaydı + ana ekrana ekleme teklifi. */
export function PwaManager() {
  const pathname = usePathname();
  const [deferred, setDeferred] = React.useState<InstallPromptEvent | null>(null);
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  React.useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
      setHidden(recentlyDismissed());
    };
    const onInstalled = () => {
      captureEvent(AnalyticsEvents.PWA_INSTALLED);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const eligible = PROMPT_PATHS.some((p) => pathname?.startsWith(p));
  if (!deferred || hidden || !eligible) return null;

  const install = async () => {
    captureEvent(AnalyticsEvents.PWA_INSTALL_PROMPTED);
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "dismissed") dismiss();
    setDeferred(null);
  };

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* özel pencere */
    }
    setHidden(true);
  };

  return (
    <div
      role="region"
      aria-label="Uygulamayı yükle"
      className="fixed inset-x-3 bottom-20 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:bottom-6"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#005BEA] text-white">
        <Download className="h-5 w-5" aria-hidden />
      </span>
      <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">
        Clause&apos;u ana ekranınıza ekleyin; hatırlatmalar bildirim olarak gelsin.
      </p>
      <button
        type="button"
        onClick={() => void install()}
        className="rounded-lg bg-[#005BEA] px-3 py-2 text-sm font-semibold text-white"
      >
        Ekle
      </button>
      <button type="button" onClick={dismiss} aria-label="Kapat" className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
