"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, Home, MessageSquareText, Reply } from "lucide-react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/panel", label: "Panelim", icon: Home },
  { href: "/?dene=1", label: "Tara", icon: FileSearch, primary: true },
  { href: "/cevap-taslagi", label: "Cevap yaz", icon: Reply },
  { href: "/asistan", label: "Asistan", icon: MessageSquareText },
] as const;

const SHOW_ON = ["/panel", "/hesabim", "/asistan", "/cevap-taslagi", "/haklarim"];

/** Giriş yapmış kullanıcı için mobil alt gezinme çubuğu (uygulama hissi). */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  const { isLoggedIn, loading } = useAuthSession();

  if (loading || !isLoggedIn) return null;
  if (!SHOW_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <>
      <div className="h-20 sm:hidden" aria-hidden />
      <nav
        aria-label="Uygulama gezinmesi"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
      >
        <ul className="grid grid-cols-4">
          {TABS.map((t) => {
            const active = t.href === "/panel" ? pathname === "/panel" : pathname.startsWith(t.href);
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={cn(
                    "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                    active ? "text-[#005BEA]" : "text-slate-500",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {"primary" in t && t.primary ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#005BEA] text-white shadow-md shadow-[#005BEA]/30">
                      <t.icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                  ) : (
                    <t.icon className="h-5 w-5" aria-hidden />
                  )}
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
