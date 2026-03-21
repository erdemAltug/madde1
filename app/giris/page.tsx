import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GirisPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <main className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Giriş</h1>
        <p className="mt-2 text-sm text-slate-600">
          Hesap ve ödeme entegrasyonu yakında. Şimdilik ücretsiz analizi ana
          sayfadan başlatabilirsiniz.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
      </main>
    </div>
  );
}
