"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { PostHogBootstrap } from "@/components/analytics/posthog-bootstrap";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!key) {
    return <>{children}</>;
  }

  // Disable heavy features in development for faster page transitions
  const isDev = process.env.NODE_ENV === "development";

  // Only enable session recording in production
  const sessionRecording = !isDev ? {
    maskAllInputs: true,
    maskInputOptions: {
      password: true,
      textarea: true,
      select: true,
    },
    maskTextSelector: "[data-ph-mask]",
  } : undefined;

  const options = {
    api_host: host,
    person_profiles: "identified_only" as const,
    capture_pageview: !isDev,
    capture_pageleave: !isDev,
    session_recording: sessionRecording,
    disable_session_recording: isDev,
    persistence: "localStorage" as const,
    autocapture: !isDev,
    cross_subdomain_cookie: false,
    secure_cookie: process.env.NODE_ENV === "production",
    debug: isDev,
  };

  return (
    <PHProvider apiKey={key} options={options}>
      <PostHogBootstrap />
      {children}
    </PHProvider>
  );
}
