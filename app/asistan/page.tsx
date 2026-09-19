import type { Metadata } from "next";
import { AsistanWorkspace } from "@/components/asistan/asistan-workspace";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Hukuk Asistanı | Clause",
  description:
    "Üyelere özel hukuk sohbeti. Sohbetleriniz hesabınızda saklanır.",
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/asistan") },
};

export default function AsistanPage() {
  return <AsistanWorkspace />;
}
