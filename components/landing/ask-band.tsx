"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuthSession } from "@/hooks/use-auth-session";

/**
 * İç sayfaların altında: "Aradığınızı bulamadınız mı? Sorun." — her sayfayı
 * gündelik hukuk asistanına bağlar.
 */
export function AskBand() {
  const router = useRouter();
  const { isLoggedIn } = useAuthSession();
  const [q, setQ] = React.useState("");
  const [authOpen, setAuthOpen] = React.useState(false);
  const [next, setNext] = React.useState("/asistan");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = q.trim();
    if (!text) return;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "ask_band", path, length: text.length });
    const target = `/asistan?soru=${encodeURIComponent(text.slice(0, 500))}`;
    if (isLoggedIn) {
      router.push(target);
      return;
    }
    setNext(target);
    setAuthOpen(true);
  };

  return (
    <section className="border-t border-amber-100 bg-[#FAFAF7] py-12 sm:py-14" aria-labelledby="ask-band-baslik">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#005BEA]/10 text-[#005BEA]">
          <MessageCircle className="h-5 w-5" aria-hidden />
        </span>
        <h2 id="ask-band-baslik" className="mt-4 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Durumunuz biraz farklı mı? Clause&apos;a sorun.
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Kendi cümlelerinizle yazın; haklarınızı kanun dayanağıyla anlatalım ve ne yapacağınızı adım adım gösterelim.
        </p>
        <form onSubmit={submit} className="mx-auto mt-6 max-w-xl">
          <label htmlFor="ask-band-input" className="sr-only">
            Hukuki sorunuz
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 text-left shadow-sm focus-within:border-[#005BEA] focus-within:ring-4 focus-within:ring-[#005BEA]/10">
            <input
              id="ask-band-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sorununuzu yazın…"
              maxLength={500}
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!q.trim()}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-[#005BEA] px-4 text-sm font-semibold text-white transition hover:bg-[#004BC4] disabled:opacity-50 sm:px-5"
            >
              <span className="hidden sm:inline">Sor</span>
              <SendHorizontal className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">Ücretsiz başlayın · Kişisel bilgileriniz maskelenir</p>
      </div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} context="ask" next={next} />
    </section>
  );
}
