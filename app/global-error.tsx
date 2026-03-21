"use client";

import * as React from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-xl font-bold text-slate-900">Bir hata oluştu</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sayfayı yenileyin veya ana sayfaya dönün.
        </p>
        <button
          type="button"
          className="mt-6 rounded-lg bg-[#005BEA] px-4 py-2 text-sm font-semibold text-white"
          onClick={() => reset()}
        >
          Tekrar dene
        </button>
      </body>
    </html>
  );
}
