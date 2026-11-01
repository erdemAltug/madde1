import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bağlantı yok",
  robots: { index: false, follow: false },
};

/** Service worker'ın önbelleğe aldığı çevrimdışı sayfa — harici bileşen yok, kendi başına çalışır. */
export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-slate-950">
      <div className="max-w-sm text-center">
        <p className="text-sm font-semibold text-[#005BEA]">Clause</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">İnternet bağlantınız yok</h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
          Bağlantı geri geldiğinde kaldığınız yerden devam edebilirsiniz. Takviminizdeki hatırlatmalar
          bildirim olarak gelmeye devam eder.
        </p>
        <a
          href="/panel"
          className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#005BEA] px-6 text-base font-semibold text-white"
        >
          Tekrar dene
        </a>
      </div>
    </main>
  );
}
