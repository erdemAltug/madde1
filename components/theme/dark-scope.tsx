"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Pref = "system" | "light" | "dark";
const KEY = "clause_theme";

const ThemeContext = React.createContext<{ pref: Pref; setPref: (p: Pref) => void } | null>(null);

function readPref(): Pref {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

/**
 * Karanlık modu yalnız sarılan ekrana uygular (Tailwind class stratejisi, `.dark` atası).
 * Uzun okuma yapılan panel ve sonuç ekranları için; sitenin geri kalanı açık kalır.
 */
export function DarkScope({ children, className }: { children: React.ReactNode; className?: string }) {
  const [pref, setPrefState] = React.useState<Pref>("system");
  const [systemDark, setSystemDark] = React.useState(false);

  React.useEffect(() => {
    setPrefState(readPref());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const on = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const setPref = React.useCallback((p: Pref) => {
    setPrefState(p);
    try {
      localStorage.setItem(KEY, p);
    } catch {
      /* özel pencere */
    }
  }, []);

  const dark = pref === "dark" || (pref === "system" && systemDark);

  return (
    <ThemeContext.Provider value={{ pref, setPref }}>
      <div className={cn(dark && "dark", className)}>
        <div className="bg-[#FAFAF7] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

const OPTIONS: { value: Pref; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Açık", icon: Sun },
  { value: "system", label: "Sistem", icon: Monitor },
  { value: "dark", label: "Koyu", icon: Moon },
];

export function ThemeToggle({ className }: { className?: string }) {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) return null;
  return (
    <div
      role="radiogroup"
      aria-label="Görünüm"
      className={cn("inline-flex rounded-xl border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900", className)}
    >
      {OPTIONS.map((o) => {
        const active = ctx.pref === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            title={o.label}
            onClick={() => ctx.setPref(o.value)}
            className={cn(
              "rounded-lg p-1.5 transition",
              active ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
            )}
          >
            <o.icon className="h-4 w-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
