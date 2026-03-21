"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

/** Trust band sonrası — huni: merak + ücretsiz CTA */
export function LandingTryStrip({ onOpenAnalyzer }: Props) {
  return (
    <section
      id="dene"
      className="border-y border-madde-blue/15 bg-gradient-to-r from-madde-blue/[0.07] via-white to-[#00E676]/[0.06] py-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="max-w-xl text-center sm:text-left"
        >
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-madde-blue">
            <Sparkles className="h-3.5 w-3.5" />
            Hemen dene — ücretsiz özet
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-madde-ink sm:text-3xl">
            Paranı koru: 30 saniyede güven skorunu gör.
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Detaylı çözüm ve düzeltme metni{" "}
            <span className="font-semibold text-madde-ink">4,99 TL</span> ile
            açılır — merak boşluğu, şeffaf fiyat.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Button
            size="lg"
            variant="cta"
            className="h-12 rounded-xl px-8 text-base"
            onClick={() => {
              captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                placement: "try_strip",
              });
              onOpenAnalyzer();
            }}
          >
            Ücretsiz tara
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
