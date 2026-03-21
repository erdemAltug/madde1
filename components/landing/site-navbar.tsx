"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { cn } from "@/lib/utils";
import { getSozlesmeAnaliziNavLinks } from "@/lib/seo/sozlesme-analizi-pages";

const sozlesmeToolLinks = getSozlesmeAnaliziNavLinks();

const links = [
  { href: "/#dene", label: "Hemen dene" },
  { href: "/guvenlik", label: "Güvenlik" },
  { href: "/blog", label: "Blog" },
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#sik-riskler", label: "Sık riskler" },
  { href: "/#fiyatlandirma", label: "Fiyatlandırma" },
  { href: "/#ucretsiz-araclar", label: "Ücretsiz araçlar" },
];

export function SiteNavbar() {
  const [mobile, setMobile] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [mobileTools, setMobileTools] = React.useState(false);
  const toolsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!toolsRef.current?.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-0 text-madde-ink"
          onClick={() => setMobile(false)}
        >
          <ClauseLogo withWordmark wordmarkClassName="text-[1.15rem]" size={34} />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <Button key={l.href} variant="ghost" size="sm" asChild>
              <Link
                href={l.href}
                className="text-[13px] font-semibold text-slate-700 hover:text-madde-blue"
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
              className="text-[13px] font-semibold text-slate-700 hover:text-madde-blue"
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
                className="absolute right-0 top-full z-50 mt-1 max-h-[min(70vh,24rem)] w-[min(100vw-2rem,20rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10"
              >
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Sözleşme analizi
                </p>
                {sozlesmeToolLinks.map((t) => (
                  <Link
                    key={t.href}
                    role="menuitem"
                    href={t.href}
                    className="block px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-madde-blue"
                    onClick={() => setToolsOpen(false)}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 font-semibold text-madde-ink hover:border-madde-blue/30 hover:bg-madde-blue/[0.04]"
            asChild
          >
            <Link href="/giris">Giriş Yap</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-md p-2 text-madde-ink md:hidden"
          aria-expanded={mobile}
          aria-label="Menü"
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobile ? (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-madde-ink hover:bg-slate-50"
                onClick={() => setMobile(false)}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-madde-ink hover:bg-slate-50"
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
                    className="rounded-md py-2 text-[13px] font-medium text-slate-600 hover:text-madde-blue"
                    onClick={() => {
                      setMobile(false);
                      setMobileTools(false);
                    }}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : null}
            <Link
              href="/giris"
              className="mt-2 rounded-md border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-madde-ink"
              onClick={() => setMobile(false)}
            >
              Giriş Yap
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
