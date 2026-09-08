import { Suspense } from "react";
import type { Metadata } from "next";
import { ClauseLanding } from "@/components/landing/clause-landing";
import { HomeStructuredData } from "@/components/seo/home-structured-data";
import { defaultHomeMetadata } from "@/lib/seo/site";

export const metadata: Metadata = defaultHomeMetadata;

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
        <ClauseLanding />
      </Suspense>
    </>
  );
}
