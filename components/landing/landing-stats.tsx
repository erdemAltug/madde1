"use client";

import * as React from "react";

type Stats = { show: boolean; analyses?: number; trackedDates?: number | null };

/**
 * Sosyal kanıt: yalnız veritabanındaki gerçek sayılar. Eşiğin altındaysa hiç görünmez —
 * uydurma yorum ya da şişirilmiş rakam yok.
 */
export function LandingStats() {
  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d: Stats) => setStats(d))
      .catch(() => setStats(null));
  }, []);

  if (!stats?.show || !stats.analyses) return null;
  const fmt = (n: number) => n.toLocaleString("tr-TR");

  return (
    <section aria-label="Clause kullanımı" className="border-b border-slate-200/70 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-center sm:px-6">
        <p className="text-base text-slate-700">
          <strong className="text-xl font-bold tabular-nums text-slate-900">{fmt(stats.analyses)}</strong> sözleşme
          hesaplara kaydedildi
        </p>
        {stats.trackedDates ? (
          <p className="text-base text-slate-700">
            <strong className="text-xl font-bold tabular-nums text-slate-900">{fmt(stats.trackedDates)}</strong> hukuki
            tarih takip ediliyor
          </p>
        ) : null}
      </div>
    </section>
  );
}
