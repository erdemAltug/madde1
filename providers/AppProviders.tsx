"use client";

import { PostHogProvider } from "@/providers/PostHogProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
