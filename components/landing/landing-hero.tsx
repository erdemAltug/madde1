"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

export function LandingHero({ onOpenAnalyzer }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(0, 91, 234, 0.14), transparent 55%),
            radial-gradient(circle at 90% 10%, rgba(0, 230, 118, 0.1), transparent 42%),
            radial-gradient(circle at 70% 80%, rgba(255, 23, 68, 0.06), transparent 45%)
          `,
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-madde-blue">
            Türk hukuku çerçevesinde sözleşme güvenliği
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-madde-ink sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Clause: Yapay zeka ile sözleşme analizi ve kira sözleşmesi risk
            tespiti —{" "}
            <span className="text-madde-blue">30 saniyede</span> özet.
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-slate-700">
            Paranı koru: ücretsiz güven skoru ve özet; detay ve düzeltme metni
            şeffaf fiyatla.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            Metnini yapıştır; canlı akışla analiz. Hukuki danışmanlık değil —
            ama ilk savunma hattın.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              variant="cta"
              className="h-12 rounded-xl px-8 text-base"
              onClick={() => {
                captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                  placement: "hero",
                });
                onOpenAnalyzer();
              }}
            >
              Ücretsiz analiz et
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 font-semibold text-madde-ink hover:bg-madde-blue/[0.06]"
              asChild
            >
              <a href="#nasil-calisir">Nasıl çalışır?</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Kesin hukuki sonuç için bir avukata danış. Clause ön tarama ve
            bilgilendirme sunar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative hidden lg:flex lg:items-center lg:justify-center"
        >
          <div className="glass-panel relative w-full max-w-md rounded-2xl p-8">
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-2 text-madde-ink">
                <span className="h-2 w-2 rounded-full bg-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.7)]" />
                <span className="font-bold tracking-tight">
                  Canlı güven skoru + risk özeti
                </span>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 text-xs leading-relaxed text-slate-600 shadow-inner">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Örnek özet
                </p>
                <p className="mt-2 font-sans text-sm font-bold text-slate-800">
                  Güven: %42
                </p>
                <p className="mt-1 font-sans text-sm text-slate-700">
                  3 kritik risk · detaylar 4,99 TL ile açılır
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Önemli uyarılar belirgin; metin sade ve okunaklı sunulur.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
