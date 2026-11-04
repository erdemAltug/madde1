"use client";

import * as React from "react";
import { BellRing, FileDown, Loader2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { identifyAuthUser } from "@/lib/analytics/identify";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

/** Kayıt bir talep değil, bir hizmet olarak sunulur: başlık bağlama göre değişir. */
export type AuthModalContext = "save" | "reminders" | "rights" | "ask" | "default";

const COPY: Record<AuthModalContext, { title: string; body: string; icon: typeof FileDown }> = {
  reminders: {
    title: "Bu tarihleri sizin yerinize takip edelim",
    body: "Ücretsiz hesapla 30, 7 ve 1 gün kala e-posta ve bildirimle hatırlatırız. Kredi kartı gerekmez.",
    icon: BellRing,
  },
  save: {
    title: "Sonucunuzu kaydedin",
    body: "Ücretsiz hesapla detaylı rapor, PDF ve tüm taramalarınız tek yerde kalır. Kredi kartı gerekmez.",
    icon: FileDown,
  },
  ask: {
    title: "Sorunuzu hemen yanıtlayalım",
    body: "Ücretsiz hesapla asistan sorunuzu kanun maddesiyle yanıtlar; sohbetleriniz sizde kalır. 30 saniye, kredi kartı gerekmez.",
    icon: MessageCircle,
  },
  rights: {
    title: "Haklarınızı ve sürelerinizi kaydedin",
    body: "Ücretsiz hesapla son tarihleri takviminize ekleriz, zamanı gelince hatırlatırız.",
    icon: BellRing,
  },
  default: {
    title: "Ücretsiz hesabınızı açın",
    body: "Sözleşmeleriniz arşivde, tarihleriniz takvimde, sorularınız asistanda. Kredi kartı gerekmez.",
    icon: FileDown,
  },
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: AuthModalContext;
  /** Kayıttan sonra dönülecek sayfa */
  next?: string;
  /** Oturum anında açılırsa (e-posta onayı kapalı) çağrılır */
  onSignedIn?: () => void;
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/**
 * Sayfadan çıkmadan kayıt: önce Google (tek tık), altta e-posta + şifre.
 * Ad ve kullanıcı türü kayıttan sonra sorulabilir; burada istenmez.
 */
export function AuthModal({ open, onOpenChange, context = "save", next = "/panel", onSignedIn }: Props) {
  const [busy, setBusy] = React.useState<"google" | "email" | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [showEmail, setShowEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const copy = COPY[context];
  const Icon = copy.icon;

  React.useEffect(() => {
    if (open) {
      setError(null);
      setNotice(null);
      captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_PROMPT_SHOWN, { source: `auth_modal_${context}` });
    }
  }, [open, context]);

  const callbackUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const handleGoogle = async () => {
    setError(null);
    setBusy("google");
    captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_CLICKED, { source: `auth_modal_google_${context}` });
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Sistem şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      setBusy(null);
      return;
    }
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
    if (oauthError) {
      setError(oauthError.message);
      setBusy(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 6) {
      setError("Geçerli bir e-posta ve en az 6 karakterli bir şifre girin.");
      return;
    }
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Sistem şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      return;
    }
    setBusy("email");
    captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_CLICKED, { source: `auth_modal_email_${context}` });
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: callbackUrl(), data: { user_type: "bireysel" } },
    });
    setBusy(null);
    if (signUpError) {
      setError(
        /registered|already/i.test(signUpError.message)
          ? "Bu e-posta ile zaten bir hesap var. Giriş yapabilirsiniz."
          : signUpError.message,
      );
      return;
    }
    if (data.user) {
      identifyAuthUser(data.user.id, { email, user_type: "bireysel" });
      captureEvent(AnalyticsEvents.AUTH_SIGNUP_COMPLETED, { user_type: "bireysel", surface: `modal_${context}` });
    }
    if (data.session) {
      onOpenChange(false);
      onSignedIn?.();
      return;
    }
    setNotice("Hesabınız oluşturuldu. E-postanıza gelen bağlantıya tıklayınca kaydınız tamamlanır ve kaldığınız yere dönersiniz.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#005BEA]/10">
            <Icon className="h-5 w-5 text-[#005BEA]" />
          </div>
          <DialogTitle className="text-center text-xl text-slate-900">{copy.title}</DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-slate-600">
            {copy.body}
          </DialogDescription>
        </DialogHeader>

        {notice ? (
          <p role="status" className="rounded-xl bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-800">
            {notice}
          </p>
        ) : (
          <>
            {error ? (
              <p role="alert" className="text-center text-sm font-medium text-red-600">
                {error}
              </p>
            ) : null}

            <Button
              type="button"
              className="h-12 w-full rounded-xl bg-[#005BEA] text-base font-semibold text-white hover:bg-[#004BC4]"
              disabled={busy !== null}
              onClick={() => void handleGoogle()}
            >
              {busy === "google" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <GoogleIcon className="h-4 w-4" />
                </span>
              )}
              Google ile devam et
            </Button>

            {showEmail ? (
              <form onSubmit={(e) => void handleEmail(e)} className="space-y-2">
                <label className="block">
                  <span className="sr-only">E-posta</span>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    className="h-12 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Şifre</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre (en az 6 karakter)"
                    className="h-12 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20"
                  />
                </label>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={busy !== null}
                  className="h-12 w-full rounded-xl text-base font-semibold"
                >
                  {busy === "email" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Ücretsiz hesap oluştur
                </Button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" /> E-posta ile devam et
              </button>
            )}

            <p className="text-center text-xs text-slate-500">
              Zaten hesabınız var mı?{" "}
              <a href={`/giris?next=${encodeURIComponent(next)}`} className="font-semibold text-[#005BEA] hover:underline">
                Giriş yapın
              </a>
            </p>
          </>
        )}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full rounded-xl py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          Şimdilik geç
        </button>
      </DialogContent>
    </Dialog>
  );
}
