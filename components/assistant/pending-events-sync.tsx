"use client";

import * as React from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { addEvents, takePendingEvents } from "@/lib/assistant/events";
import { captureEvent } from "@/lib/analytics/capture";

/**
 * Misafirken "Hatırlat" denilen tarihleri, kullanıcı giriş yaptığı anda takvime ekler.
 * Hangi sayfaya dönerse dönsün çalışır (AppProviders içinde).
 */
export function PendingEventsSync() {
  const { isLoggedIn, loading } = useAuthSession();
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    if (loading || !isLoggedIn || doneRef.current) return;
    doneRef.current = true;
    const pending = takePendingEvents();
    if (pending.length === 0) return;
    void addEvents(pending).then((saved) => {
      if (saved) captureEvent("reminders_saved", { count: saved.length, surface: "after_signup" });
    });
  }, [isLoggedIn, loading]);

  return null;
}
