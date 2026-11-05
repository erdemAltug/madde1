"use client";

import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

export function BottomCtaBand({ onOpenAnalyzer }: Props) {
  return (
    <section className="bg-slate-900 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Bir dahaki hukuki sorunuzda yalnız değilsiniz
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
          Zam, tahliye, işten çıkarılma, iade, sözleşme… Clause her zaman cebinizde. Ücretsiz başlayın.
        </p>
        <Button
          size="lg"
          className="mt-8 h-12 rounded-xl bg-white px-10 text-base font-semibold text-slate-900 hover:bg-slate-100"
          onClick={() => {
            captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "bottom_band" });
            onOpenAnalyzer();
          }}
        >
          Sözleşmemi kontrol et
        </Button>
        <Link
          href="/haklarim/kontrol"
          className="mt-4 block text-sm font-semibold text-slate-300 underline-offset-4 hover:text-white hover:underline"
        >
          ya da haklarımı 1 dakikada öğren →
        </Link>
      </div>
    </section>
  );
}
