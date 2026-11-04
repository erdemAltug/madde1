"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Scale, Sparkles } from "lucide-react";
import { RENT_CEILING, SEVERANCE_CEILING } from "@/lib/legal/official-rates";
import { cn } from "@/lib/utils";

type Dialogue = {
  who: string;
  question: string;
  answer: string;
  cite: string;
  actions: { label: string; href: string }[];
};

const fmtTry = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n) + " ₺";

/** Gerçek, güncel rakamlarla örnek sohbetler — ürünün "gündelik hukuk asistanı" vaadini gösterir. */
const DIALOGUES: Dialogue[] = [
  {
    who: "Kiracı · İstanbul",
    question: "Ev sahibim yenilemede %60 zam istiyor. Ödemek zorunda mıyım?",
    answer: `Hayır. Konut kiralarında yenileme artışı 12 aylık TÜFE ortalamasını geçemez; ${RENT_CEILING.periodLabel} için tavan %${RENT_CEILING.pct.toLocaleString("tr-TR")}. Fazlasını ödemek zorunda değilsiniz ve bunu yazılı olarak bildirebilirsiniz.`,
    cite: "TBK m. 344",
    actions: [
      { label: "Zammı hesapla", href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama" },
      { label: "Ev sahibine cevap yaz", href: "/cevap-taslagi" },
    ],
  },
  {
    who: "Çalışan · 4 yıl kıdem",
    question: "İşten çıkarıldım, \"tazminat yok\" diyorlar. Ne yapabilirim?",
    answer: `En az 1 yıl çalıştıysanız ve haklı bir neden yoksa kıdem tazminatına hak kazanırsınız: her yıl için 30 günlük brüt ücret (yıllık tavan ${fmtTry(SEVERANCE_CEILING.annualGrossTry)}). Ayrıca ihbar ve kullanılmayan izin ücreti de istenebilir.`,
    cite: "İş K. m. 17 · 1475 s. K. m. 14",
    actions: [
      { label: "Haklarımı hesapla", href: "/haklarim/kontrol?durum=isten-cikarildim" },
      { label: "Kıdem tazminatı", href: "/araclar/kidem-tazminati-hesaplama" },
    ],
  },
  {
    who: "Tüketici · online alışveriş",
    question: "İnternetten aldığım ürünü 5 gün sonra iade etmek istiyorum, kabul etmiyorlar.",
    answer:
      "Mesafeli satışta teslimden itibaren 14 gün içinde gerekçe göstermeden cayma hakkınız var. Satıcı bildiriminiz ulaştıktan sonra 14 gün içinde ödediğiniz tutarı iade etmek zorunda.",
    cite: "6502 s. TKHK m. 48",
    actions: [
      { label: "İade dilekçesi yaz", href: "/dilekce-olusturucu" },
      { label: "Cayma hakkı rehberi", href: "/rehber/sozlesme-iptal-cayma-farki" },
    ],
  },
];

type Phase = "asking" | "typing" | "answered";

export function HeroChatDemo() {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("answered");
  const [paused, setPaused] = React.useState(false);
  const d = DIALOGUES[index]!;

  // İlk boyamada cevap hazır görünür (SSR + hareket azaltma); ardından sohbetler döner.
  React.useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(
      () => {
        if (phase === "answered") {
          setIndex((i) => (i + 1) % DIALOGUES.length);
          setPhase("asking");
        } else if (phase === "asking") setPhase("typing");
        else setPhase("answered");
      },
      phase === "answered" ? 7000 : phase === "asking" ? 900 : 1300,
    );
    return () => window.clearTimeout(t);
  }, [phase, paused]);

  return (
    <div
      className="relative w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-amber-100/70 via-white to-sky-100/70 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005BEA] text-white">
            <Scale className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-900">Clause</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Gündelik hukuk asistanınız
            </span>
          </span>
          <span className="ml-auto text-[11px] font-medium text-slate-400">Örnek sohbet</span>
        </div>

        <div className="min-h-[340px] space-y-4 bg-[#FAFAF7] px-4 py-5 sm:px-5" aria-live="polite">
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[11px] font-medium text-slate-400">{d.who}</span>
            <p
              key={`q-${index}`}
              className="max-w-[88%] animate-in fade-in slide-in-from-bottom-1 rounded-2xl rounded-br-md bg-[#005BEA] px-4 py-2.5 text-[15px] leading-snug text-white duration-300"
            >
              {d.question}
            </p>
          </div>

          {phase === "typing" ? (
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/70 w-16" aria-label="Yanıt yazılıyor">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          ) : null}

          {phase === "answered" ? (
            <div key={`a-${index}`} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="max-w-[95%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-[15px] leading-relaxed text-slate-800">{d.answer}</p>
                <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#005BEA]/8 px-2.5 py-1 text-xs font-semibold text-[#005BEA] ring-1 ring-[#005BEA]/15">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden />
                  Dayanak: {d.cite}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {d.actions.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 transition hover:border-[#005BEA]/50 hover:text-[#005BEA]"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden />
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-slate-100 py-3">
          {DIALOGUES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Örnek sohbet ${i + 1}`}
              onClick={() => {
                setIndex(i);
                setPhase("answered");
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-[#005BEA]" : "w-1.5 bg-slate-300 hover:bg-slate-400",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
