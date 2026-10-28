"use client";

import Link from "next/link";
import { Briefcase, FileText, Home, Lock, PenTool, Shield, Trash2 } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { SampleAnalysisCard } from "@/components/hero/SampleAnalysisCard";
import type { PersonaId } from "@/lib/personas";

type Props = {
  onOpenAnalyzer: (persona?: PersonaId) => void;
};

const trustItems = [
  { icon: Lock, label: "KVKK uyumlu" },
  { icon: Shield, label: "TLS ile şifreli aktarım" },
  { icon: Trash2, label: "Misafir tarama silinir; hesapta sen tutarsın" },
] as const;

const CHOICES: { persona: PersonaId; label: string; hint: string; icon: typeof Home }[] = [
  { persona: "tenant", label: "Kira sözleşmesi", hint: "Zam, depozito, tahliye", icon: Home },
  { persona: "job_seeker", label: "İş sözleşmesi", hint: "Fesih, rekabet yasağı, mesai", icon: Briefcase },
  { persona: "freelancer", label: "Hizmet / freelance", hint: "Ödeme, teslim, telif", icon: PenTool },
  { persona: "general", label: "Başka bir şey", hint: "Abonelik, satış, kredi…", icon: FileText },
];

export function LandingHero({ onOpenAnalyzer }: Props) {
  return (
    <section className="relative border-b border-slate-200/70 bg-[#FAFAF7]">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm font-semibold text-[#005BEA]">Clause · kişisel hukuk asistanınız</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            İmzalamadan önce Clause&apos;a gösterin.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Riskli maddeleri sade dille gösterelim, önemli tarihleri sizin yerinize takip edelim.
          </p>

          <div className="mt-8">
            <p id="hero-choice" className="text-base font-bold text-slate-900">
              Ne imzalıyorsunuz?
            </p>
            <div role="group" aria-labelledby="hero-choice" className="mt-3 grid grid-cols-2 gap-2.5">
              {CHOICES.map((c) => (
                <button
                  key={c.persona}
                  type="button"
                  onClick={() => {
                    captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_choice", persona: c.persona });
                    onOpenAnalyzer(c.persona);
                  }}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BEA]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005BEA]/40 sm:p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA] transition group-hover:bg-[#005BEA] group-hover:text-white">
                    <c.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900 sm:text-base">{c.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 sm:text-sm">{c.hint}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Zaten bir sorun mu var?{" "}
              <Link href="/cevap-taslagi" className="font-semibold text-[#005BEA] hover:underline">
                Karşı tarafa cevap yazın
              </Link>{" "}
              ya da{" "}
              <Link href="/araclar/kira-sozlesmesi-artis-orani-hesaplama" className="font-semibold text-[#005BEA] hover:underline">
                kira zammını hesaplayın
              </Link>
              .
            </p>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-slate-500"
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
                  <item.icon className="h-3.5 w-3.5 shrink-0 text-[#005BEA]" aria-hidden />
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
