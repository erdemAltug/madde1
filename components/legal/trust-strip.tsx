import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Güven şeridi: her sonuç ekranının altında aynı cümle.
 * Kullanıcı nerede olursa olsun sınırı ve bir sonraki adımı aynı yerde görür.
 */
export function TrustStrip({ className }: { className?: string }) {
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400",
        className,
      )}
    >
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
      <span>
        Bu bir ön kontroldür, hukuki tavsiye değildir.{" "}
        <Link href="/rehber/hukuki-danismanlik-ucretsiz-secenekler" className="font-medium text-[#005BEA] hover:underline">
          Avukata ne zaman gitmelisiniz?
        </Link>
      </span>
    </p>
  );
}
