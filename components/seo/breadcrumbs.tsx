import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

export type BreadcrumbItem = { name: string; href: string };

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  const chain: BreadcrumbItem[] = [
    { name: SITE_NAME, href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: chain.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Sayfa konumu" className="mb-6 text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link
              href="/"
              className="font-medium text-madde-blue hover:underline"
            >
              {SITE_NAME}
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
              {item.href === items[items.length - 1]?.href ? (
                <span className="font-semibold text-madde-ink">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="font-medium text-madde-blue hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
