"use client";

import { PostHogProvider } from "@/providers/PostHogProvider";
import { AuthToast } from "@/components/layout/AuthToast";
import { PendingEventsSync } from "@/components/assistant/pending-events-sync";
import { MobileTabBar } from "@/components/assistant/mobile-tab-bar";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
      <AuthToast />
      <PendingEventsSync />
      <MobileTabBar />
    </PostHogProvider>
  );
}
