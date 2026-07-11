import type { Metadata } from "next";
import { HakkimizdaPage } from "@/components/landing/hakkimizda-page";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = "/hakkimizda";

export const metadata: Metadata = {
  title: "Hakkımızda — Clause LegalTech Türkiye",
  description:
    "Clause kimdir? Türkiye'nin ücretsiz yapay zeka hukuk asistanı ve sözleşme analizi platformu. Misyon, değerler ve iletişim.",
  keywords: ["Clause hakkında", "LegalTech Türkiye", "yapay zeka hukuk", SITE_NAME],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: `Hakkımızda | ${SITE_NAME}`,
    description: "Clause — herkes için yapay zeka destekli sözleşme ön kontrolü.",
    url: absoluteUrl(path),
    locale: "tr_TR",
    type: "website",
  },
};

export default function HakkimizdaRoutePage() {
  return <HakkimizdaPage />;
}
