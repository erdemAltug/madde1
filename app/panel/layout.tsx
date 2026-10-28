import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hukuki hayatım",
  description: "Sözleşmeleriniz, yaklaşan tarihleriniz ve hukuki asistanınız tek yerde.",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
