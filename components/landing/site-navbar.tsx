"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { cn } from "@/lib/utils";
import { getSozlesmeAnaliziNavLinks } from "@/lib/seo/sozlesme-analizi-pages";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const sozlesmeToolLinks = getSozlesmeAnaliziNavLinks();

const primaryLinks = [
  { href: "/#dene", label: "Hemen dene" },
  { href: "/analiz", label: "Ücretsiz analiz" },
];

const discoverLinks = [
  { href: "/gunluk-hukuk", label: "Günlük hukuk" },
  { href: "/rehber", label: "Rehberler" },
  { href: "/yapay-zeka-hukuk", label: "Yapay zeka hukuk" },
  { href: "/sozlesme-analizi", label: "Sözleşme analizi" },
  { href: "/hukuki-analiz", label: "Hukuki analiz" },
  { href: "/araclar", label: "Ücretsiz araçlar" },
  { href: "/guvenlik", label: "Güvenlik" },
  { href: "/blog", label: "Blog" },
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#sik-riskler", label: "Sözleşme riskleri" },
];

const mobileLinks = [
  { href: "/#dene", label: "Hemen dene" },
  { href: "/analiz", label: "Ücretsiz analiz" },
  ...discoverLinks,
];

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Button variant="ghost" size="sm" asChild className="shrink-0">
      <Link
        href={href}
        className="text-[13px] font-semibold text-slate-600 hover:text-deep-navy"
        prefetch={true}
        onClick={onNavigate}
      >
        {label}
      </Link>
    </Button>
  );
}

export function SiteNavbar() {
  const router = useRouter();
  const [mobile, setMobile] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [discoverOpen, setDiscoverOpen] = React.useState(false);
  const [mobileTools, setMobileTools] = React.useState(false);
  const [mobileCalculators, setMobileCalculators] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const menusRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menusRef.current?.contains(e.target as Node)) {
        setToolsOpen(false);
        setDiscoverOpen(false);
      }
      if (!userMenuRef.current?.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const closeMobile = () => {
    setMobile(false);
    setMobileTools(false);
    setMobileCalculators(false);
  };

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "Kullanıcı"
    );
  };

  const authBlock = user ? (
    <div className="relative" ref={userMenuRef}>
      <button
        type="button"
        onClick={() => setUserMenuOpen((v) => !v)}
        className="flex max-w-[10rem] items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 transition-colors hover:bg-slate-200 sm:max-w-[12rem]"
      >
        <User className="h-4 w-4 shrink-0 text-slate-600" />
        <span className="truncate text-sm font-semibold text-slate-700">
          {getUserDisplayName()}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-500 transition-transform",
            userMenuOpen && "rotate-180",
          )}
        />
      </button>
      {userMenuOpen ? (
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
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="hidden font-semibold text-slate-600 hover:text-deep-navy sm:inline-flex"
        asChild
      >
        <Link href="/giris" prefetch={true}>
          Giriş
        </Link>
      </Button>
      <Button
        size="sm"
        className="shrink-0 rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
        asChild
      >
        <Link href="/giris?kayit=1" prefetch={true}>
          Ücretsiz kayıt
        </Link>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-madde-ink"
          onClick={closeMobile}
          prefetch={true}
        >
          <ClauseLogo withWordmark wordmarkClassName="text-[1.15rem]" size={34} />
        </Link>

        {/* Desktop nav — lg+ */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Ana menü"
        >
          {primaryLinks.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}

          <div ref={menusRef} className="flex items-center">
          <div className="relative shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[13px] font-semibold text-slate-600 hover:text-deep-navy"
              aria-expanded={discoverOpen}
              aria-haspopup="menu"
              onClick={() => {
                setDiscoverOpen((v) => !v);
                setToolsOpen(false);
              }}
            >
              Keşfet
              <ChevronDown
                className={cn(
                  "ml-0.5 h-4 w-4 opacity-70 transition-transform",
                  discoverOpen && "rotate-180",
                )}
              />
            </Button>
            {discoverOpen ? (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-slate-200/60 bg-white py-2 shadow-lg shadow-slate-900/10"
              >
                {discoverLinks.map((l) => (
                  <Link
                    key={l.href}
                    role="menuitem"
                    href={l.href}
                    className="block px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                    onClick={() => setDiscoverOpen(false)}
                    prefetch={true}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[13px] font-semibold text-slate-600 hover:text-deep-navy"
              aria-expanded={toolsOpen}
              aria-haspopup="menu"
              onClick={() => {
                setToolsOpen((v) => !v);
                setDiscoverOpen(false);
              }}
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
                  Hesaplayıcılar
                </p>
                {FREE_TOOLS_NAV.map((t) => (
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
                <Link
                  role="menuitem"
                  href="/araclar"
                  className="block px-3 py-2 text-[13px] font-semibold text-[#005BEA] hover:bg-slate-50"
                  onClick={() => setToolsOpen(false)}
                  prefetch={true}
                >
                  Tüm ücretsiz araçlar →
                </Link>

                <p className="mt-2 border-t border-slate-100 px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
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
          </div>
        </nav>

        {/* Sağ: giriş + mobil menü — her zaman görünür alan */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">{authBlock}</div>

          <button
            type="button"
            className="inline-flex rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-expanded={mobile}
            aria-label="Menü"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobile ? (
        <div className="border-t border-slate-200/60 bg-white/95 px-4 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            {mobileLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-deep-navy"
                onClick={closeMobile}
                prefetch={true}
              >
                {l.label}
              </Link>
            ))}

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-slate-600 hover:bg-slate-50"
              aria-expanded={mobileCalculators}
              onClick={() => setMobileCalculators((v) => !v)}
            >
              Hesaplayıcılar
              <ChevronDown
                className={cn(
                  "h-4 w-4 opacity-70 transition-transform",
                  mobileCalculators && "rotate-180",
                )}
              />
            </button>
            {mobileCalculators ? (
              <div className="ml-2 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                {FREE_TOOLS_NAV.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="rounded-md py-2 text-[13px] font-medium text-slate-500 hover:text-deep-navy"
                    onClick={closeMobile}
                    prefetch={true}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-slate-600 hover:bg-slate-50"
              aria-expanded={mobileTools}
              onClick={() => setMobileTools((v) => !v)}
            >
              Sözleşme araçları
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
                    onClick={closeMobile}
                    prefetch={true}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-3 border-t border-slate-200 pt-3 sm:hidden">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <User className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {getUserDisplayName()}
                    </span>
                  </div>
                  <Link
                    href="/analiz"
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    onClick={closeMobile}
                  >
                    Analizlerim
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      void handleLogout();
                      closeMobile();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış yap
                  </button>
                </>
              ) : (
                <Button className="w-full font-semibold bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href="/giris?kayit=1" onClick={closeMobile} prefetch={true}>
                    Ücretsiz kayıt ol
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
