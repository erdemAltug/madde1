"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { identifyAuthUser } from "@/lib/analytics/identify";
import { safeInternalNext } from "@/lib/inventory/safe-next";

export default function GirisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [userType, setUserType] = React.useState<"avukat" | "bireysel">("bireysel");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (searchParams.get("kayit") === "1") {
      setIsSignUp(true);
    }
    const oauthError = searchParams.get("error");
    if (oauthError === "oauth") {
      setError("Google ile giriş tamamlanamadı. Lütfen tekrar deneyin.");
    }
  }, [searchParams]);

  const nextPath = safeInternalNext(searchParams.get("next"));

  const handleGoogleSignIn = async () => {
    setError(null);
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Sistem şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      return;
    }

    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      setLoading(false);
      return;
    }
    
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Sistem şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      setLoading(false);
      return;
    }
    
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message === "Invalid login credentials" 
        ? "Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin." 
        : signInError.message);
      setLoading(false);
      return;
    }

    if (signInData.user) {
      identifyAuthUser(signInData.user.id, {
        email: signInData.user.email,
        user_type: signInData.user.user_metadata?.user_type as string | undefined,
      });
      captureEvent(AnalyticsEvents.AUTH_LOGIN_COMPLETED, {
        user_type: signInData.user.user_metadata?.user_type ?? "unknown",
      });
    }

    router.push(nextPath);
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (!name || !email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      setLoading(false);
      return;
    }
    
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Sistem şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      setLoading(false);
      return;
    }
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          user_type: userType,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (signUpData.user) {
      identifyAuthUser(signUpData.user.id, {
        email,
        user_type: userType,
      });
      captureEvent(AnalyticsEvents.AUTH_SIGNUP_COMPLETED, { user_type: userType });
    }

    setError("Hesabınız oluşturuldu! E-posta adresinizi onaylayın ve giriş yapın.");
    setIsSignUp(false);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Dark with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        
        {/* Decorative blobs */}
        <div className="absolute -left-20 top-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
          <div className="mb-8">
            <ClauseLogo size={80} withWordmark wordmarkClassName="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Hukuki Analiz Asistanı
          </h2>
          
          <p className="text-xl text-slate-300 max-w-md">
            Sözleşmeni tara; kayıt olunca taramaların hesabında birikir. Kişisel hukuk asistanın — günde 10 analiz, PDF, envanter.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-6 text-left max-w-md">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-indigo-400">10.000+</div>
              <div className="text-sm text-slate-400">Kanun Maddesi</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-violet-400">Yargıtay</div>
              <div className="text-sm text-slate-400">İçtihatları</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">KVKK</div>
              <div className="text-sm text-slate-400">Uyumlu</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-cyan-400">AI</div>
              <div className="text-sm text-slate-400">Destekli</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <ClauseLogo size={40} withWordmark />
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Login Card */}
          <div className="glass-panel rounded-3xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-deep-navy mb-2">
                {isSignUp ? "Hesap Oluşturun" : "Hesabınıza Giriş Yapın"}
              </h1>
              <p className="text-slate-500 font-medium">
                {isSignUp
                  ? "Ücretsiz hesap — günde 10 analiz, kredi kartı gerekmez."
                  : "Hesabınıza giriş yapın ve analizlerinize devam edin."}
              </p>
            </div>

            {/* User Type Toggle (Sign Up only) */}
            {isSignUp && (
              <div className="mb-6">
                <Label className="text-sm font-medium text-slate-600 mb-3 block">
                  Kullanıcı Tipi
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("bireysel")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      userType === "bireysel"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold">Bireysel</span>
                    <span className="block text-xs text-slate-500">Kişisel kullanım</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("avukat")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      userType === "avukat"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold">Avukat</span>
                    <span className="block text-xs text-slate-500">Profesyonel kullanım</span>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={isSignUp ? handleSignUp : handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-600">
                    Ad Soyad
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Adınız ve soyadınız"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-600">
                  E-posta
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="eposta@ornek.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-600">
                    Şifre
                  </Label>
                  {!isSignUp && (
                    <Link 
                      href="/sifremi-unuttum" 
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Şifremi Unuttum
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-semibold btn-gradient-primary"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isSignUp ? "Kayıt yapılıyor..." : "Giriş yapılıyor..."}
                  </div>
                ) : (
                  isSignUp ? "Kayıt Ol" : "Giriş Yap"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">veya</span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl font-semibold border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
              onClick={() => void handleGoogleSignIn()}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google ile Devam Et
            </Button>

            {/* Sign Up Toggle */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 font-medium">
                {isSignUp ? "Zaten hesabınız var mı?" : "Hesabınız yok mu?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                  }}
                  className="ml-1 text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  {isSignUp ? "Giriş Yapın" : "Hemen Kayıt Olun"}
                </button>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
