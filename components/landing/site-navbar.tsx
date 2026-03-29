"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { cn } from "@/lib/utils";
import { getSozlesmeAnaliziNavLinks } from "@/lib/seo/sozlesme-analizi-pages";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const sozlesmeToolLinks = getSozlesmeAnaliziNavLinks();

const links = [
  { href: "/#dene", label: "Hemen dene" },
  { href: "/guvenlik", label: "Güvenlik" },
  { href: "/blog", label: "Blog" },
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#sik-riskler", label: "Sözleşme Riskleri" },
  // { href: "/#fiyatlandirma", label: "Fiyatlandırma" }, // MVP: Ödeme askıya alındı
  { href: "/#ucretsiz-araclar", label: "Ücretsiz araçlar" },
];

export function SiteNavbar() {
  const router = useRouter();
  const [mobile, setMobile] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [mobileTools, setMobileTools] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const toolsRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Supabase auth state listener
  React.useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close user menu when clicking outside
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!toolsRef.current?.contains(e.target as Node)) {
        setToolsOpen(false);
      }
      if (!userMenuRef.current?.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "Kullanıcı";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-0 text-madde-ink"
          onClick={() => setMobile(false)}
          prefetch={true}
        >
          <ClauseLogo withWordmark wordmarkClassName="text-[1.15rem]" size={34} />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <Button key={l.href} variant="ghost" size="sm" asChild>
              <Link
                href={l.href}
                className="text-[13px] font-semibold text-slate-600 hover:text-deep-navy"
                prefetch={true}
              >
                {l.label}
              </Link>
            </Button>
          ))}
          <div className="relative" ref={toolsRef}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[13px] font-semibold text-slate-600 hover:text-deep-navy"
              aria-expanded={toolsOpen}
              aria-haspopup="menu"
              onClick={() => setToolsOpen((v) => !v)}
            >
              Araçlar
              <ChevronDown
                className={cn(
                  "ml-0.5 h-4 w-4 opacity-70 transition-transform",
                  toolsOpen && "rotate-180",
                )}
              />
            </Button>
            {toolsOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-1 max-h-[min(70vh,24rem)] w-[min(100vw-2rem,20rem)] overflow-y-auto rounded-xl border border-slate-200/60 bg-white py-2 shadow-lg shadow-slate-900/10"
              >
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Sözleşme analizi
                </p>
                {sozlesmeToolLinks.map((t) => (
                  <Link
                    key={t.href}
                    role="menuitem"
                    href={t.href}
                    className="block px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                    onClick={() => setToolsOpen(false)}
                    prefetch={true}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {getUserDisplayName()}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform", userMenuOpen && "rotate-180")} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200/60 bg-white py-2 shadow-lg shadow-slate-900/10">
                  <Link
                    href="/analiz"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Analizlerim
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              asChild
            >
              <Link href="/giris" prefetch={true}>Giriş Yap</Link>
            </Button>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-md p-2 text-slate-600 md:hidden hover:bg-slate-100"
          aria-expanded={mobile}
          aria-label="Menü"
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobile ? (
        <div className="border-t border-slate-200/60 bg-white/95 px-4 py-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                onClick={() => setMobile(false)}
                prefetch={true}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-slate-600 hover:bg-slate-50"
              aria-expanded={mobileTools}
              onClick={() => setMobileTools((v) => !v)}
            >
              Araçlar
              <ChevronDown
                className={cn(
                  "h-4 w-4 opacity-70 transition-transform",
                  mobileTools && "rotate-180",
                )}
              />
            </button>
            {mobileTools ? (
              <div className="ml-2 flex max-h-56 flex-col gap-0.5 overflow-y-auto border-l border-slate-200 pl-3">
                {sozlesmeToolLinks.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="rounded-md py-2 text-[13px] font-medium text-slate-500 hover:text-deep-navy"
                    onClick={() => {
                      setMobile(false);
                      setMobileTools(false);
                    }}
                    prefetch={true}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2">
                  <User className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    {getUserDisplayName()}
                  </span>
                </div>
                <Link
                  href="/analiz"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                  onClick={() => setMobile(false)}
                >
                  Analizlerim
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobile(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                href="/giris"
                className="mt-2 rounded-md border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50"
                onClick={() => setMobile(false)}
                prefetch={true}
              >
                Giriş Yap
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
