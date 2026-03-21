"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!key) {
    return <>{children}</>;
  }

  return (
    <PHProvider
      apiKey={key}
      options={{
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        // @ts-expect-error PostHog JS: heatmaps (tipler gecikmeli olabilir)
        heatmaps: true,
        /** Oturum kaydı — tüm inputları maskele (KVKK) */
        session_recording: {
          maskAllInputs: true,
          maskInputOptions: {
            password: true,
            textarea: true,
            select: true,
          },
          /** Sözleşme metni alanı (`data-ph-mask`) replay’de metin olarak maskelensin */
          maskTextSelector: "[data-ph-mask]",
        },
        disable_session_recording: false,
        persistence: "localStorage",
        autocapture: true,
        cross_subdomain_cookie: false,
        secure_cookie: process.env.NODE_ENV === "production",
      }}
    >
      {children}
    </PHProvider>
  );
}
