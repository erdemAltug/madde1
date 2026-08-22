"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Scale, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "clause_auth_toast_dismissed_v2";
const DISMISS_MS = 24 * 60 * 60 * 1000;
const DELAY_MS = 10_000;
const SCROLL_THRESHOLD = 0.4;

const AUTH_ROUTES = ["/giris", "/kayit", "/admin"];

const SCROLL_TRIGGER_PREFIXES = [
  "/araclar",
  "/blog",
  "/rehber",
  "/dilekce-olusturucu",
  "/dilekce-hazirlama",
  "/analiz",
  "/sozlesme-analizi",
  "/yapay-zeka-hukuk",
  "/hukuki-analiz",
  "/kira-sozlesmesi-analizi",
  "/is-sozlesmesi-analizi",
  "/gunluk-hukuk",
  "/haklarim",
];

function wasDismissedRecently(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_MS;
  } catch {
    return false;
  }
}

function persistDismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore quota */
  }
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isScrollTriggerPath(pathname: string): boolean {
  return SCROLL_TRIGGER_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function AuthToast() {
  const pathname = usePathname() ?? "/";
  const { isLoggedIn, loading } = useAuthSession();
  const [visible, setVisible] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const shownRef = React.useRef(false);

  const reveal = React.useCallback(() => {
    if (shownRef.current) return;
    if (wasDismissedRecently()) return;
    shownRef.current = true;
    setVisible(true);
  }, []);

  React.useEffect(() => {
    shownRef.current = false;
    setVisible(false);
  }, [pathname]);

  React.useEffect(() => {
    if (loading || isLoggedIn || isAuthRoute(pathname)) return;
    if (wasDismissedRecently()) return;

    const timer = window.setTimeout(reveal, DELAY_MS);

    const onScroll = () => {
      if (!isScrollTriggerPath(pathname)) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= SCROLL_THRESHOLD) reveal();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, isLoggedIn, pathname, reveal]);

  const dismiss = () => {
    persistDismiss();
    setVisible(false);
  };

  if (loading || isLoggedIn || isAuthRoute(pathname)) {
    return null;
  }

  return (
    <>
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Kişisel hukuk asistanı kaydı"
        className={cn(
          "fixed z-[60] max-w-sm transition-all duration-500",
          "bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[22.5rem]",
          visible && !authOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <div className="relative rounded-2xl border border-indigo-900/60 bg-indigo-950/90 p-4 text-white shadow-2xl backdrop-blur-md">
          <button
            type="button"
            aria-label="Kapat"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-md border border-indigo-400/40 bg-indigo-800/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-100">
            <Scale className="h-3 w-3" aria-hidden />
            Kişisel asistan
          </span>

          <p className="mt-3 pr-6 text-sm font-bold tracking-tight">
            Hukuki süreçlerinizde yanınızda durur
          </p>
          <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-indigo-100/90">
            Sözleşme taraması, dilekçe taslağı ve risk uyarısı hesabınızda
            saklanır. Kayıt olun; kişisel hukuk asistanınız süreç boyunca
            erişilebilir kalsın.
          </p>

          <Button
            type="button"
            className="mt-4 h-10 w-full rounded-xl bg-white font-bold text-indigo-950 hover:bg-indigo-50"
            onClick={() => setAuthOpen(true)}
          >
            Ücretsiz kayıt olun
          </Button>
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
