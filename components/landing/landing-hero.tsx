"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, FileSearch, PenLine, Scale, SendHorizontal, ShieldCheck } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { AuthModal } from "@/components/auth/AuthModal";
import { HeroChatDemo } from "@/components/landing/hero-chat-demo";
import { useAuthSession } from "@/hooks/use-auth-session";
import type { PersonaId } from "@/lib/personas";

type Props = {
  onOpenAnalyzer: (persona?: PersonaId, file?: File) => void;
};

/** Kullanıcının kendi cümleleri — hukuk dili değil */
const EXAMPLES = [
  "Ev sahibim %60 zam istiyor",
  "İşten çıkarıldım, haklarım ne?",
  "Depozitomu geri vermiyor",
  "Aboneliğimi iptal etmiyorlar",
];

export function LandingHero({ onOpenAnalyzer }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuthSession();
  const cameraRef = React.useRef<HTMLInputElement>(null);
  const [question, setQuestion] = React.useState("");
  const [authOpen, setAuthOpen] = React.useState(false);
  const [askNext, setAskNext] = React.useState("/asistan");

  const ask = (raw: string, placement: string) => {
    const q = raw.trim();
    if (!q) return;
    captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement, length: q.length });
    const next = `/asistan?soru=${encodeURIComponent(q.slice(0, 500))}`;
    if (isLoggedIn) {
      router.push(next);
      return;
    }
    setAskNext(next);
    setAuthOpen(true);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FAFAF7]">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-amber-100/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">
            <span aria-hidden>👋</span>
            Kiracı, çalışan, tüketici — herkes için
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Gündelik hukuk asistanınız.{" "}
            <span className="text-[#005BEA]">Her zaman yanınızda.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Ev sahibi zam mı istedi, işten mi çıkarıldınız, bir sözleşme mi imzalayacaksınız? Kendi cümlelerinizle
            sorun; Clause haklarınızı kanun maddesiyle, sade Türkçe anlatsın ve ne yapacağınızı adım adım göstersin.
          </p>

          <form
            className="mt-7"
            onSubmit={(e) => {
              e.preventDefault();
              ask(question, "hero_ask");
            }}
          >
            <label htmlFor="hero-soru" className="sr-only">
              Hukuki sorunuz
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm transition focus-within:border-[#005BEA] focus-within:ring-4 focus-within:ring-[#005BEA]/10">
              <input
                id="hero-soru"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Sorununuzu yazın…"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                maxLength={500}
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-[#005BEA] px-4 text-sm font-semibold text-white transition hover:bg-[#004BC4] disabled:opacity-50 sm:px-5"
                disabled={!question.trim()}
              >
                <span className="hidden sm:inline">Sor</span>
                <SendHorizontal className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Örnek sorular">
            {EXAMPLES.map((ex) => (
              <li key={ex}>
                <button
                  type="button"
                  onClick={() => ask(ex, "hero_example")}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-[#005BEA]/50 hover:text-[#005BEA]"
                >
                  {ex}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobil kullanıcı metin yapıştırmaz: sözleşme için birincil yol fotoğraf */}
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

          <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_door_scan" });
                if (window.matchMedia("(max-width: 639px)").matches) cameraRef.current?.click();
                else onOpenAnalyzer();
              }}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BEA]/50 hover:shadow-md sm:flex-col sm:items-start sm:gap-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
                <FileSearch className="h-[18px] w-[18px] sm:block" aria-hidden />
              </span>
              <span>
                <span className="block text-[15px] font-bold text-slate-900">Sözleşme tara</span>
                <span className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-600">
                  <Camera className="h-3.5 w-3.5 sm:hidden" aria-hidden />
                  <span className="sm:hidden">Fotoğrafını çekin</span>
                  <span className="hidden sm:inline">İmzalamadan önce</span>
                </span>
              </span>
            </button>
            <Link
              href="/haklarim/kontrol"
              onClick={() => captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_door_rights" })}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BEA]/50 hover:shadow-md sm:flex-col sm:items-start sm:gap-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Scale className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span>
                <span className="block text-[15px] font-bold text-slate-900">Haklarımı öğren</span>
                <span className="mt-0.5 block text-[13px] text-slate-600">5 soruda alacak ve süre</span>
              </span>
            </Link>
            <Link
              href="/dilekce-olusturucu"
              onClick={() => captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, { placement: "hero_door_petition" })}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BEA]/50 hover:shadow-md sm:flex-col sm:items-start sm:gap-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <PenLine className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span>
                <span className="block text-[15px] font-bold text-slate-900">Dilekçe yaz</span>
                <span className="mt-0.5 block text-[13px] text-slate-600">Hazır, resmi formatta</span>
              </span>
            </Link>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#005BEA]" aria-hidden />
            Ücretsiz başlayın. Kimlik, telefon ve IBAN yapay zekaya gitmeden maskelenir.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <HeroChatDemo />
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} context="ask" next={askNext} />
    </section>
  );
}
