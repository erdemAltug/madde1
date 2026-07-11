import type { Metadata } from "next";
import { GizlilikPage } from "@/components/landing/gizlilik-page";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = "/gizlilik";

export const metadata: Metadata = {
  title: "Gizlilik politikası — KVKK ve veri işleme | Clause",
  description:
    "Clause gizlilik politikası: KVKK uyumu, veri saklama, maskeleme ve kullanıcı hakları. Kişisel verileriniz nasıl işlenir?",
  keywords: [
    "gizlilik politikası",
    "KVKK",
    "veri gizliliği",
    "sözleşme analizi gizlilik",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: `Gizlilik politikası | ${SITE_NAME}`,
    description: "KVKK ve kişisel veri işleme — Clause gizlilik özeti.",
    url: absoluteUrl(path),
    locale: "tr_TR",
    type: "website",
  },
};

export default function GizlilikRoutePage() {
  return <GizlilikPage />;
}
