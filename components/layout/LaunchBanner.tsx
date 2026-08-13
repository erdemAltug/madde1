"use client";

import Link from "next/link";
import { Scale } from "lucide-react";

export function LaunchBanner() {
  return (
    <div className="bg-[#1e1b4b] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-3 py-2 sm:gap-3 sm:px-6 lg:px-8">
        <span className="shrink-0 rounded-md border border-white/25 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:px-2 sm:text-[11px]">
          Açık Beta
        </span>

        <p className="min-w-0 text-center text-[12px] font-medium leading-snug sm:text-[13px]">
          <span className="inline sm:hidden">
            <Scale className="mb-0.5 mr-1 inline h-3.5 w-3.5" aria-hidden />
            Açık Beta: Tüm Sözleşme &amp; Dilekçe Araçları Ücretsiz{" "}
            <Link
              href="/giris?kayit=1"
              className="whitespace-nowrap font-bold text-sky-200 underline-offset-2 hover:text-white hover:underline"
            >
              Dene →
            </Link>
          </span>
          <span className="hidden sm:inline">
            <Scale className="mb-0.5 mr-1 inline h-3.5 w-3.5" aria-hidden />
            <strong>Clause.ai Lansman Sürümü:</strong> Yapay zeka ile Sözleşme
            Risk Taraması ve Otomatik Dilekçe Oluşturucu lansmana özel tüm
            kullanıcılara ücretsiz.{" "}
            <Link
              href="/giris?kayit=1"
              className="whitespace-nowrap font-bold text-sky-200 underline-offset-2 hover:text-white hover:underline"
            >
              Anında Deneyin →
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
