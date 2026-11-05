"use client";

import * as React from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { PostHogBootstrap } from "@/components/analytics/posthog-bootstrap";
import { bootstrapPostHogIdentity } from "@/lib/analytics/identify";
import { onConsentChange, readConsent } from "@/lib/consent/store";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

/**
 * Analitik yalnız açık rızayla (KVKK Çerez Rehberi):
 * - Varsayılan: hiçbir olay gönderilmez, tarayıcıya PostHog kaydı yazılmaz.
 * - "Kabul et" → opt_in + kalıcılık + (prod) maskeli oturum kaydı.
 * - "Reddet" / geri alma → opt_out, oturum kaydı durur.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!key) {
    return <>{children}</>;
  }

  const isDev = process.env.NODE_ENV === "development";

  const sessionRecording = !isDev
    ? {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          textarea: true,
          select: true,
        },
        maskTextSelector: "[data-ph-mask]",
      }
    : undefined;

  const options = {
    api_host: host,
    person_profiles: "identified_only" as const,
    capture_pageview: !isDev,
    capture_pageleave: !isDev,
    session_recording: sessionRecording,
    // Kayıt rıza gelene kadar başlamaz; ConsentSync başlatır
    disable_session_recording: true,
    persistence: "localStorage" as const,
    autocapture: !isDev,
    cross_subdomain_cookie: false,
    secure_cookie: process.env.NODE_ENV === "production",
    debug: isDev,
    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
  };

  return (
    <PHProvider apiKey={key} options={options}>
      <ConsentSync enableRecording={!isDev} />
      <PostHogBootstrap />
      {children}
    </PHProvider>
  );
}

function applyConsent(analytics: boolean, enableRecording: boolean) {
  try {
    if (analytics) {
      if (!posthog.has_opted_in_capturing()) posthog.opt_in_capturing();
      bootstrapPostHogIdentity();
      if (enableRecording) posthog.startSessionRecording();
    } else {
      posthog.stopSessionRecording();
      if (!posthog.has_opted_out_capturing()) posthog.opt_out_capturing();
    }
  } catch {
    /* PostHog yüklenemediyse (engelleyici vb.) sessiz geç */
  }
}

function ConsentSync({ enableRecording }: { enableRecording: boolean }) {
  React.useEffect(() => {
    const current = readConsent();
    applyConsent(current?.analytics ?? false, enableRecording);
    return onConsentChange((s) => applyConsent(s.analytics, enableRecording));
  }, [enableRecording]);
  return null;
}
