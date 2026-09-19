"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const DEMO = [
  {
    role: "user" as const,
    text: "Ev sahibi %80 zam istedi. Yasal mı?",
  },
  {
    role: "assistant" as const,
    text: "Kısa özet: Konut kiralarında yenilenen dönem artışı kural olarak TÜFE on iki aylık ortalamasını aşamaz. %80’lik talep çoğu durumda tavanın üzerinde kalır.\n\nNe yapabilirsiniz: Yazılı itiraz, çekinceli ödeme, sözleşmedeki artış maddesini kontrol.\n\nDayanaklar: TBK m.344 bağlamı (doğrulanmış RAG).",
    cite: "TBK m.344",
  },
];

/** Ana sayfa — interaktif olmayan scripted asistan demosu */
export function LandingAsistanDemo() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const t1 = window.setTimeout(() => setStep(1), 600);
    const t2 = window.setTimeout(() => setStep(2), 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="asistan-demo"
      className="border-y border-slate-200/80 bg-slate-50/80 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-wide text-[#005BEA]">
            Clause Asistan
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-deep-navy sm:text-4xl">
            Genel chatbot değil — hukuk bilen asistan
          </h2>
          <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-600">
            Üye hesabınızda sohbet kalıcıdır. Yanıtlar mümkünse mevzuat
            dayanağıyla gelir; tarayıcı kapanınca kaybolmaz.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 h-12 rounded-xl bg-[#005BEA] px-7 font-bold"
            onClick={() =>
              captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                placement: "home_asistan_demo",
              })
            }
          >
            <Link href="/giris?kayit=1&next=/asistan">
              Ücretsiz hesap — asistanı aç
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
              <Scale className="h-4 w-4 text-[#005BEA]" />
              <span className="text-xs font-bold text-slate-700">
                Demo · Clause Asistan
              </span>
            </div>
            <div className="space-y-3 p-4 min-h-[220px]">
              {step >= 1 ? (
                <div className="ml-auto max-w-[85%] rounded-2xl bg-[#005BEA] px-3.5 py-2.5 text-sm text-white animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {DEMO[0].text}
                </div>
              ) : (
                <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-slate-100" />
              )}
              {step >= 2 ? (
                <div className="mr-auto max-w-[92%] space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {DEMO[1].text}
                  </div>
                  <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                    Dayanak: {DEMO[1].cite}
                  </span>
                </div>
              ) : step >= 1 ? (
                <div className="h-24 w-4/5 animate-pulse rounded-2xl bg-slate-100" />
              ) : null}
            </div>
            <p className="border-t border-slate-100 px-4 py-2 text-center text-[11px] text-slate-400">
              Örnek yanıttır. Gerçek sohbet için üye olun.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
