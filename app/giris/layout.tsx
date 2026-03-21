import type { Metadata } from "next";
import { twitterSummaryLargeImage } from "@/lib/seo/og";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

const title = "Giriş";

export const metadata: Metadata = {
  title,
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/giris") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: "Hesap girişi yakında.",
    url: absoluteUrl("/giris"),
    type: "website",
  },
  twitter: twitterSummaryLargeImage(`${title} | ${SITE_NAME}`, "Clause giriş sayfası."),
};

export default function GirisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
