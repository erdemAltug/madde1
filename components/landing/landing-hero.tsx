"use client";

import { ArrowRight, FileText, Scale, Shield, Sparkles } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

export function LandingHero({ onOpenAnalyzer }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div
          className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-xs font-medium text-indigo-700 mb-4">
            <Scale className="w-3.5 h-3.5" />
            clause.ai — Türk Hukuk Sistemi
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Veriye Dayalı Hukuki Analiz ve Strateji
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Yargıtay içtihatları ve güncel mevzuat ile desteklenen yapay zeka analizi. 
            Vakanızı detaylandırın ve profesyonel hukuki değerlendirme alın.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 rounded-xl px-8 text-base bg-[#1a1c2e] hover:bg-[#252742]"
              onClick={() => {
                captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                  placement: "hero",
                });
                onOpenAnalyzer();
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Analizi Başlat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl px-8 text-base font-medium border-slate-200 text-slate-700 hover:bg-slate-50"
              asChild
            >
              <a href="#nasil-calisir">Nasıl Çalışır?</a>
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              <span>10.000+ Kanun Maddesi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-500" />
              <span>Yargıtay İçtihatları</span>
            </div>
          </div>
        </div>

        <div
          className="relative hidden lg:flex lg:items-center lg:justify-center animate-in fade-in zoom-in-95 duration-300 delay-75"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="font-medium">
                  Yapay Zeka Destekli Analiz
                </span>
              </div>
              
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
                  Örnek Analiz
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">İlgili Kanun Maddesi</span>
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">TBK 350</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Emsal Karar</span>
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">Yargıtay 6. HD</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Benzerlik Skoru</span>
                    <span className="text-sm font-semibold text-emerald-600">%78</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 text-center">
                Vakanıza uygun kanun maddeleri ve emsal kararlar otomatik tespit edilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
