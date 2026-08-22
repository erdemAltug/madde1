"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type Props = {
  source: string;
  href?: string;
  title?: string;
  body?: string;
  label?: string;
  className?: string;
};

export function SeoSignupCta({
  source,
  href = "/giris?kayit=1&next=/hesabim",
  title = "Bu maddeleri kendi sözleşmende tara — hesabında dursun",
  body = "Ücretsiz kayıt: detaylı rapor, PDF ve tarama envanteri. Clause yanında duran kişisel asistanın olur.",
  label = "Ücretsiz kayıt ol — raporu aç",
  className,
}: Props) {
  return (
    <div
      className={
        className ??
        "mt-10 rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 to-slate-50 p-6 shadow-sm sm:p-8"
      }
    >
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
        {body}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
        onClick={() =>
          captureEvent(AnalyticsEvents.SEO_TOOL_SIGNUP_CLICK, { source })
        }
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
