import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-madde-ink">
            Clause blog
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            Bu alan, <strong>yapay zeka sözleşme analizi</strong>, TBK yorumları,
            KOBİ sözleşme yönetimi ve LegalTech trendleri için uzun biçimli
            makaleleri barındıracak şekilde hazırlandı. Şu an yayında yazı
            bulunmuyor; içerik takvimi yakında duyurulacak.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Ana sayfaya dönmek için{" "}
            <Link href="/" className="font-semibold text-madde-blue hover:underline">
              buraya tıklayın
            </Link>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
