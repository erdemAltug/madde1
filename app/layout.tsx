import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Yapay zeka ile TBK sözleşme analizi`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Türkiye'de kira, iş ve ticari sözleşmeler için yapay zeka destekli risk taraması, TBK uyumlu özet ve taslak üretimi.",
  keywords: [
    "sözleşme analizi",
    "kira sözleşmesi riskleri",
    "legal AI assistant",
    "yapay zeka sözleşme analizi",
    "AI hukuk asistanı Türkiye",
    "sözleşme üretimi",
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
        className={`${GeistSans.variable} min-h-screen font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
