import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

const legalSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-legal-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Clause — Ücretsiz sözleşme analizi ve kira zammı kontrolü`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kira zammı yasal mı, kıdem ne kadar, sözleşmede tuzak var mı? Clause ile ücretsiz tarayın; kayıt olup detaylı rapor ve PDF alın.",
  keywords: [
    "yapay zeka hukuk asistanı",
    "yapay zeka sözleşme analizi",
    "yapay zeka hukuk",
    "legal AI Türkiye",
    "sözleşme analizi",
    "kira sözleşmesi riskleri",
    "AI hukuk asistanı",
    "hukuki yapay zeka",
    "LegalTech",
    "TBK analiz",
  ],
  icons: {
    icon: [{ url: "/icon", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI sözleşme analizi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${GeistSans.variable} ${legalSerif.variable} min-h-screen font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
