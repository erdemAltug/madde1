"use client";

import { PostHogProvider } from "@/providers/PostHogProvider";
import { AuthToast } from "@/components/layout/AuthToast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
      <AuthToast />
    </PostHogProvider>
  );
}
