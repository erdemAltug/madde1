import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hesabım — taramalarım",
  robots: { index: false, follow: false },
};

export default function HesabimLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
