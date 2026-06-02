"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  bootstrapPostHogIdentity,
  refreshPageContext,
} from "@/lib/analytics/identify";

/** PostHog init sonrası device_id + sayfa bağlamını kaydeder */
export function PostHogBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    bootstrapPostHogIdentity();
  }, []);

  useEffect(() => {
    refreshPageContext();
  }, [pathname]);

  return null;
}
