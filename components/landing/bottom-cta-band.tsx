"use client";

import { Reveal } from "@/components/landing/reveal";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

export function BottomCtaBand({ onOpenAnalyzer }: Props) {
  return (
    <section className="border-t border-madde-blue/20 bg-gradient-to-br from-madde-blue via-[#0046b8] to-madde-blue py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Bugün tara — yarın hesabında dursun
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-white/90">
            Misafirken anında ön tarama. Ücretsiz kayıtla kişisel hukuk asistanın:
            taramalar, kaydettiklerin, PDF.
          </p>
          <Button
            size="lg"
            className="mt-8 h-12 rounded-xl bg-white px-10 text-base font-extrabold text-[#005BEA] shadow-xl shadow-black/20 transition-all hover:scale-[1.04] hover:bg-[#00E676] hover:text-madde-ink hover:shadow-2xl active:scale-[0.98]"
            onClick={() => {
              captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                placement: "bottom_band",
              });
              onOpenAnalyzer();
            }}
          >
            Hemen başla
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
