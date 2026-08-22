"use client";

import { ArrowRight, Lock, Shield, Trash2, Zap } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";
import { SampleAnalysisCard } from "@/components/hero/SampleAnalysisCard";

type Props = {
  onOpenAnalyzer: () => void;
};

const trustItems = [
  { icon: Lock, label: "KVKK & GDPA Uyumlu" },
  { icon: Shield, label: "256-bit Uçtan Uca Şifreleme" },
  { icon: Trash2, label: "Misafir tarama silinir; hesapta sen tutarsın" },
] as const;

export function LandingHero({ onOpenAnalyzer }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(248, 250, 252, 0) 50%, rgba(16, 185, 129, 0.02) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--cta-primary)]">
            <Zap className="h-3.5 w-3.5" />
            clause.ai — Türk Hukuk Sistemi
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-deep-navy sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Kişisel hukuk asistanınız — hukuki süreçlerinizde yanınızda
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
            Sözleşme taraması, dilekçe taslağı ve risk uyarısı; kira ve işle
            sınırlı değil. Günlük hukuki işlemlerinizde ön kontrol yapın.
            Kayıtlı hesapta taramalarınız saklanır, süreç boyunca size özel
            kalır.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-14 rounded-xl bg-[var(--cta-primary)] px-8 text-base font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_0_32px_rgba(37,99,235,0.55)] hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                  placement: "hero",
                });
                onOpenAnalyzer();
              }}
            >
              <Zap className="mr-1 h-4 w-4" />
              Ücretsiz Sözleşme Analizi Yap
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-xl border-2 border-slate-300 px-8 text-base font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              asChild
            >
              <a href="/giris?kayit=1&next=/hesabim">Hesap oluşturun</a>
            </Button>
          </div>

          <div
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-slate-500 sm:text-[13px]"
            role="list"
            aria-label="Güven göstergeleri"
          >
            {trustItems.map((item, i) => (
              <span key={item.label} className="contents" role="listitem">
                {i > 0 ? (
                  <span className="hidden text-slate-300 sm:inline" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  <item.icon
                    className="h-3.5 w-3.5 shrink-0 text-[var(--cta-primary)]"
                    aria-hidden
                  />
                  {item.label}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-10 lg:hidden">
            <SampleAnalysisCard />
          </div>
        </div>

        <div className="relative hidden animate-in fade-in zoom-in-95 duration-300 delay-75 lg:flex lg:items-center lg:justify-center">
          <SampleAnalysisCard />
        </div>
      </div>
    </section>
  );
}
