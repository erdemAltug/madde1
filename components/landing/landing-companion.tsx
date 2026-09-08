"use client";

import Link from "next/link";
import { Bookmark, FolderOpen, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const points = [
  {
    icon: FolderOpen,
    title: "Sözleşme envanteri",
    body: "Analiz ettiğiniz sözleşmeler, risk özetleri ve dilekçe taslakları hesabınızda saklanır; önceki incelemelerinize dilediğiniz zaman dönebilirsiniz.",
  },
  {
    icon: Bookmark,
    title: "Öncelikli kayıtlar",
    body: "Kritik incelemeleri sabitleyin. Yeni bir yazışma veya revizyon geldiğinde ilgili rapora tek adımda erişin.",
  },
  {
    icon: ShieldAlert,
    title: "Kişisel hukuk asistanı",
    body: "Kurumsal bir dashboard değil: metinleriniz, tespit edilen riskler ve Türkiye hukuku bağlamında sade dilde uyarılar.",
  },
] as const;

export function LandingCompanion() {
  return (
    <section
      id="kisisel-asistan"
      className="border-y border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-[#005BEA]">
              Ücretsiz hesap
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              İncelemeleriniz hesabınızda güvende
            </h2>
            <p className="mt-3 font-medium text-slate-600">
              Misafir oturumunda sonuçlar geçicidir. Ücretsiz hesapla geçmiş
              analizler, sabitlediğiniz kayıtlar ve PDF çıktıları güvenli şekilde
              saklanır.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
            >
              <p.icon className="h-8 w-8 text-[#005BEA]" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="h-12 rounded-xl bg-[#005BEA] px-8 font-bold hover:bg-[#0047b8]"
            asChild
            onClick={() =>
              captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
                placement: "companion_section",
              })
            }
          >
            <Link href="/giris?kayit=1&next=/hesabim">
              Ücretsiz hesap oluşturun
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
