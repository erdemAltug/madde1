"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";

const RAW =
  "Sayın Ahmet Yılmaz,\nTC Kimlik No: 12345678901\nTel: 0532 111 22 33\nAdres: Kadıköy / İstanbul";

const MASKED =
  "Sayın [GİZLENMİŞ],\nTC Kimlik No: [GİZLENMİŞ]\nTel: [GİZLENMİŞ]\nAdres: [GİZLENMİŞ] / İstanbul";

export function PrivacyMaskAnimation() {
  const [phase, setPhase] = React.useState<"raw" | "mask" | "ai">("raw");

  React.useEffect(() => {
    const seq = ["raw", "mask", "ai"] as const;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % seq.length;
      setPhase(seq[i]);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-12 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/80 to-emerald-50/30 p-6 shadow-lg shadow-slate-900/[0.04] sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-[#0a1628]">
          Gizlilik anahtarı: maskeleme
        </h3>
        <span className="rounded-full bg-[#0a1628] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
          Canlı örnek
        </span>
      </div>
      <p className="max-w-2xl text-sm text-slate-600">
        Metniniz modele giderken TC, telefon ve benzeri desenler otomatik olarak
        maskelenir; böylece gereksiz kişisel veri paylaşımı azalır.
      </p>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="relative min-h-[180px] overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-inner">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Ham metin
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={phase === "raw" ? "r" : "m"}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45 }}
              className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-700 sm:text-xs"
            >
              {phase === "raw" ? RAW : MASKED}
            </motion.pre>
          </AnimatePresence>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 lg:flex-col">
          <motion.div
            animate={{
              x: phase === "ai" ? [0, 4, 0] : 0,
              opacity: phase === "mask" || phase === "ai" ? 1 : 0.4,
            }}
            transition={{ repeat: phase === "ai" ? Infinity : 0, duration: 1.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a1628] text-emerald-300 shadow-md"
          >
            <ArrowRight className="h-5 w-5 lg:hidden" aria-hidden />
            <ArrowRight className="hidden h-5 w-5 lg:block lg:rotate-[-90deg]" aria-hidden />
          </motion.div>
          <Sparkles className="h-4 w-4 text-emerald-600/70" aria-hidden />
        </div>

        <div
          className={[
            "relative flex min-h-[180px] flex-col justify-center overflow-hidden rounded-xl border p-4 shadow-inner transition-colors duration-500",
            phase === "ai"
              ? "border-emerald-400/50 bg-emerald-50/80"
              : "border-slate-200 bg-slate-50/60",
          ].join(" ")}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Clause analizi
          </p>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: phase === "ai" ? [1, 1.06, 1] : 1,
                boxShadow:
                  phase === "ai"
                    ? "0 0 0 0 rgba(16, 185, 129, 0.35)"
                    : "0 0 0 0 rgba(16, 185, 129, 0)",
              }}
              transition={{ repeat: phase === "ai" ? Infinity : 0, duration: 1.4 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a1628] text-emerald-300"
            >
              <Cpu className="h-7 w-7" aria-hidden />
            </motion.div>
            <p className="text-sm font-semibold text-[#0a1628]">
              {phase === "ai"
                ? "Maskeleme tamam — analiz güvenli kanaldan iletiliyor"
                : phase === "mask"
                  ? "Maskeleme uygulanıyor…"
                  : "Metin bekleniyor"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
