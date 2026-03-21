import type { Metadata } from "next";
import { DM_Sans, Literata } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madde1.tr"),
  title: {
    default: "Madde1 — Yapay zeka ile TBK sözleşme analizi",
    template: "%s | Madde1",
  },
  description:
    "Kira ve ticari sözleşmelerinizi Türk Borçlar Kanunu çerçevesinde yapay zeka ile ön analizden geçirin. Hukuki risk tespiti ve Madde1 legaltech deneyimi.",
  keywords: [
    "yapay zeka kira sözleşmesi analizi",
    "hukuki risk analizi AI",
    "Madde1 legaltech",
    "TBK analiz",
    "sözleşme inceleme",
    "tahliye taahhütnamesi",
  ],
  openGraph: {
    title: "Madde1 — AI LegalTech",
    description:
      "Türk hukuku odaklı, TBK uyumlu sözleşme analizi ve risk özetleri.",
    locale: "tr_TR",
    type: "website",
    siteName: "Madde1",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${dmSans.variable} ${literata.variable} min-h-screen font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
