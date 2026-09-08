"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { PrivacyShieldLive } from "@/components/growth/privacy-shield-live";

export const PRIVACY_MASK_STEP_MS = 2200;

type Props = {
  contractText: string;
};

function previewLines(text: string, maxChars = 220): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars)}…`;
}

/** Analiz öncesi istemci tarafı PII maskeleme güven adımı */
export function StepPrivacyMask({ contractText }: Props) {
  const { text: masked, replacementCount } = React.useMemo(
    () => maskSensitiveText(contractText),
    [contractText],
  );

  const rawPreview = previewLines(contractText);
  const maskedPreview = previewLines(masked);

  return (
    <div className="space-y-5 py-2">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
        >
          <ShieldCheck className="h-7 w-7" aria-hidden />
        </motion.div>
        <h3 className="mt-4 text-lg font-bold text-deep-navy">
          Gizlilik Kalkanı aktif
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Kişisel veriler{" "}
          <strong className="font-semibold text-slate-800">
            modele gitmeden önce
          </strong>{" "}
          tarayıcınızda maskelenir.
        </p>
      </div>

      <PrivacyShieldLive text={contractText} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Ham metin
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-slate-600 line-through decoration-slate-300/80">
            {rawPreview}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3"
        >
          <p className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            <Sparkles className="h-3 w-3" aria-hidden />
            Maskelenmiş (modele gidecek)
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-emerald-900">
            {maskedPreview}
          </p>
        </motion.div>
      </div>

      <p className="text-center text-xs font-medium text-slate-500">
        {replacementCount > 0
          ? `${replacementCount} hassas alan maskelendi — analiz başlıyor…`
          : "Hassas desen bulunamadı — metin güvenli kanaldan iletiliyor…"}
      </p>

      <div className="mx-auto h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: PRIVACY_MASK_STEP_MS / 1000,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
