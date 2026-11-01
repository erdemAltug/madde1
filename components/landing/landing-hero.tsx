"use client";

import * as React from "react";
import Link from "next/link";
import { Briefcase, Camera, FileText, Home, PenTool, ShieldCheck } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { SampleAnalysisCard } from "@/components/hero/SampleAnalysisCard";
import { RIGHTS_SCENARIOS } from "@/lib/legal/rights-check";
import type { PersonaId } from "@/lib/personas";

type Props = {
  onOpenAnalyzer: (persona?: PersonaId, file?: File) => void;
};

const CHOICES: { persona: PersonaId; label: string; hint: string; icon: typeof Home }[] = [
  { persona: "tenant", label: "Kira sözleşmesi", hint: "Zam, depozito, tahliye", icon: Home },
  { persona: "job_seeker", label: "İş sözleşmesi", hint: "Fesih, rekabet yasağı, mesai", icon: Briefcase },
  { persona: "freelancer", label: "Hizmet / freelance", hint: "Ödeme, teslim, telif", icon: PenTool },
  { persona: "general", label: "Başka bir şey", hint: "Abonelik, satış, kredi…", icon: FileText },
];

export function LandingHero({ onOpenAnalyzer }: Props) {
  const cameraRef = React.useRef<HTMLInputElement>(null);

  return (
    <section className="relative border-b border-slate-200/70 bg-[#FAFAF7]">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            İmzalamadan önce Clause&apos;a gösterin.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Riskli maddeleri 1 dakikada sade dille gösterelim, önemli tarihleri sizin yerinize takip edelim. Ücretsiz,
            kayıt gerekmez.
          </p>

          {/* Mobil kullanıcı metin yapıştırmaz: birincil yol fotoğraf */}
          <input
            ref={cameraRef}
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_photo" });
              onOpenAnalyzer(undefined, file);
            }}
          />
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#005BEA] text-base font-semibold text-white shadow-lg shadow-[#005BEA]/25 transition hover:bg-[#004BC4] sm:hidden"
          >
            <Camera className="h-5 w-5" aria-hidden />
            Sözleşmenin fotoğrafını çek
          </button>

          <div className="mt-6 sm:mt-8">
            <p id="hero-choice" className="text-base font-bold text-slate-900">
              <span className="sm:hidden">ya da türünü seçin</span>
              <span className="hidden sm:inline">Ne imzalıyorsunuz?</span>
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
                    <span className="block text-[15px] font-bold text-slate-900 sm:text-base">{c.label}</span>
                    <span className="mt-0.5 block text-[13px] text-slate-600 sm:text-sm">{c.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Panik anında gelen kullanıcıya ikinci kapı: Haklarım Kontrolü */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-700">Zaten bir sorun mu var?</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {RIGHTS_SCENARIOS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/haklarim/kontrol?durum=${s.id}`}
                    onClick={() => captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_rights", scenario: s.id })}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 transition hover:border-[#005BEA]/50 hover:text-[#005BEA]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#005BEA]" aria-hidden />
            Kimlik, telefon ve IBAN gönderilmeden önce maskelenir. Misafir taramaları saklanmaz; hesabınıza
            kaydettikleriniz sizde kalır, istediğiniz an silersiniz.
          </p>

          <div className="mt-10 lg:hidden">
            <SampleAnalysisCard />
          </div>
        </div>

        <div className="relative hidden lg:flex lg:items-center lg:justify-center">
          <SampleAnalysisCard />
        </div>
      </div>
    </section>
  );
}
