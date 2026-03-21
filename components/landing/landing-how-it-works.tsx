"use client";

import { ClipboardPaste, Cpu, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/landing/reveal";
import { PrivacyMaskAnimation } from "@/components/landing/privacy-mask-animation";

const steps = [
  {
    step: "1",
    title: "Metni yapıştır",
    desc: "Kira, hizmet veya ticari sözleşmenizi doğrudan alana ekleyin.",
    icon: ClipboardPaste,
  },
  {
    step: "2",
    title: "AI analiz etsin",
    desc: "TBK ve güncel düzenlemelerle eşleştirme, risk skorlaması ve özet.",
    icon: Cpu,
  },
  {
    step: "3",
    title: "Riskleri raporla",
    desc: "Kritik maddeler, eksikler ve iyileştirme önerileri PDF’e hazır.",
    icon: FileCheck,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function LandingHowItWorks() {
  return (
    <section
      id="nasil-calisir"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Nasıl çalışır?
          </h2>
          <p className="mt-3 font-semibold text-slate-600">
            Üç adımda sözleşmenizi ön incelemeye alın.
          </p>
        </div>
      </Reveal>
      <PrivacyMaskAnimation />
      <motion.div
        className="mt-12 grid gap-8 sm:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {steps.map((s) => (
          <motion.div key={s.step} variants={item}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-900/[0.06] transition-shadow hover:shadow-xl hover:shadow-[#005BEA]/10"
            >
              <span className="absolute -top-3 left-6 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-gradient-to-br from-[#005BEA] to-[#0046B8] px-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#005BEA]/30">
                {s.step}
              </span>
              <s.icon
                className="mt-5 h-9 w-9 text-[#005BEA]"
                strokeWidth={2}
                aria-hidden
              />
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                {s.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
