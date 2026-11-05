"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { onConsentOpen, readConsent, writeConsent } from "@/lib/consent/store";
import { cn } from "@/lib/utils";

/**
 * KVKK uyumlu çerez bildirimi:
 * - Seçim yapılana kadar analitik kapalı (varsayılan "hayır").
 * - "Kabul et" ve "Reddet" eşit ağırlıkta; reddetmek için ek tık gerekmez.
 * - Tercihler panelinde zorunlu ve analitik ayrı gösterilir; footer'dan yeniden açılır.
 */
export function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);

  React.useEffect(() => {
    const current = readConsent();
    if (!current) setOpen(true);
    else setAnalytics(current.analytics);
    return onConsentOpen(() => {
      setAnalytics(readConsent()?.analytics ?? false);
      setDetails(true);
      setOpen(true);
    });
  }, []);

  if (!open) return null;

  const decide = (value: boolean) => {
    writeConsent(value);
    setAnalytics(value);
    setOpen(false);
    setDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cerez-baslik"
      aria-describedby="cerez-aciklama"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-2xl shadow-slate-900/15 pb-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-5 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
          <Cookie className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p id="cerez-baslik" className="text-sm font-bold text-slate-900">
            Çerez tercihiniz
          </p>
          <p id="cerez-aciklama" className="mt-1 text-[13px] leading-relaxed text-slate-600">
            Sitenin çalışması için zorunlu çerezleri kullanırız. İzin verirseniz, ürünü iyileştirmek için hangi sayfaların
            kullanıldığını da ölçeriz (yazdıklarınız ve sözleşme metinleriniz maskelenir). Ayrıntılar{" "}
            <Link href="/gizlilik#cerezler" className="font-semibold text-[#005BEA] underline-offset-2 hover:underline">
              Gizlilik ve Çerez Politikası
            </Link>
            &apos;nda.
          </p>
        </div>
        {readConsent() ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            className="-mr-1 -mt-1 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {details ? (
        <ul className="mt-4 space-y-2">
          <li className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <span>
              <span className="block text-sm font-semibold">Zorunlu</span>
              <span className="block text-xs text-slate-600">Oturum, güvenlik, ücretsiz kullanım hakkı ve bu çerez tercihiniz. Kapatılamaz.</span>
            </span>
            <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              Her zaman açık
            </span>
          </li>
          <li className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
            <label htmlFor="cerez-analitik" className="cursor-pointer">
              <span className="block text-sm font-semibold">Analitik</span>
              <span className="block text-xs text-slate-600">
                PostHog ile sayfa ve tıklama ölçümü, maskeli oturum kaydı. Reklam için kullanılmaz.
              </span>
            </label>
            <button
              id="cerez-analitik"
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics((v) => !v)}
              className={cn(
                "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition",
                analytics ? "bg-[#005BEA]" : "bg-slate-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                  analytics ? "left-[1.375rem]" : "left-0.5",
                )}
              />
              <span className="sr-only">Analitik çerezler</span>
            </button>
          </li>
        </ul>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
        {details ? (
          <button
            type="button"
            onClick={() => decide(analytics)}
            className="col-span-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:col-span-1"
          >
            Seçimimi kaydet
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className="col-span-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 underline-offset-2 hover:underline sm:col-span-1 sm:mr-auto"
          >
            Tercihler
          </button>
        )}
        <button
          type="button"
          onClick={() => decide(false)}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Reddet
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Kabul et
        </button>
      </div>
    </div>
  );
}
