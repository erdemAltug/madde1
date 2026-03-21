"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LEGAL_LOADING_MESSAGES } from "@/lib/constants";

export function LegalLoadingMessages({ active }: { active: boolean }) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % LEGAL_LOADING_MESSAGES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/55 backdrop-blur-[2px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="rounded-full border border-primary/30 bg-card/90 px-5 py-2 text-sm font-medium text-primary shadow-lg"
        >
          {LEGAL_LOADING_MESSAGES[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
