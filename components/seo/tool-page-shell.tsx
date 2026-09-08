import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { RelatedToolsSection } from "@/components/seo/related-tools-section";
import type { FaqItem } from "@/lib/seo/rehber-pages";
import {
  buildHowToJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo/faq-schema";
import { toolCanonicalUrl } from "@/lib/seo/tool-metadata";
import { cn } from "@/lib/utils";

type HowToOpts = {
  name: string;
  description: string;
  steps: string[];
};

type Props = {
  path: string;
  breadcrumbLabel: string;
  h1: string;
  intro: ReactNode;
  children: ReactNode;
  faqs?: FaqItem[];
  howTo?: HowToOpts;
  softwareApp?: { name: string; description: string };
  /** Araç altı SEO / mevzuat gövdesi */
  article?: ReactNode;
  className?: string;
  /** Sonuç alanı için ekstra alt padding (sticky bar) */
  bottomPad?: boolean;
};

/** Programmatic hukuki mikro araç sayfa kabuğu — YMYL + schema tutarlılığı */
export function ToolPageShell({
  path,
  breadcrumbLabel,
  h1,
  intro,
  children,
  faqs,
  howTo,
  softwareApp,
  article,
  className,
  bottomPad,
}: Props) {
  const canonical = toolCanonicalUrl(path);
  const schemas: object[] = [];

  if (howTo) {
    schemas.push(
      buildHowToJsonLd({
        name: howTo.name,
        description: howTo.description,
        url: canonical,
        steps: howTo.steps,
      }),
    );
  }
  if (softwareApp) {
    schemas.push(
      buildSoftwareApplicationJsonLd({
        name: softwareApp.name,
        description: softwareApp.description,
        url: canonical,
      }),
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-white",
        bottomPad && "pb-28",
        className,
      )}
    >
      {schemas.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <SiteNavbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Hukuki Araçlar", href: "/araclar" },
            { name: breadcrumbLabel, href: path },
          ]}
        />

        <LegalAiDisclaimer variant="banner" className="mb-8" />

        <header className="mb-10 max-w-3xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            {h1}
          </h1>
          <div className="mt-4 text-base leading-relaxed text-slate-600">
            {intro}
          </div>
        </header>

        {children}

        <LegalAiDisclaimer className="mt-8" />

        {article ? (
          <div className="prose prose-slate mt-12 max-w-none prose-p:text-[15px] prose-p:leading-relaxed">
            {article}
          </div>
        ) : null}

        {faqs?.length ? <FaqSection faqs={faqs} /> : null}
      </main>
      <RelatedToolsSection excludeHref={path} />
      <SiteFooter />
    </div>
  );
}
