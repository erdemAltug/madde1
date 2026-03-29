"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FileUp, Sparkles, Shield, Scale, AlertTriangle, CheckCircle2, Lock, ChevronRight, Info, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Analysis categories
const CATEGORIES = [
  { id: "kiraci", label: "Kiracı Hakları", icon: "🏠" },
  { id: "ev-sahibi", label: "Ev Sahibi Hakları", icon: "🏢" },
  { id: "is-kanunu", label: "İş Kanunu", icon: "💼" },
  { id: "ticaret", label: "Ticaret Hukuku", icon: "📊" },
  { id: "aile", label: "Aile Hukuku", icon: "👨‍👩‍👧" },
  { id: "ceza", label: "Ceza Hukuku", icon: "⚖️" },
];

// Example analysis results for preview
const EXAMPLE_RESULTS = {
  title: "Tahliye Taahhütnamesi Analizi",
  riskLevel: "Orta Risk",
  riskColor: "warning",
  findings: [
    {
      type: "law",
      title: "TBK Madde 347",
      description: "Kiracı, kira süresinin sonunda kiralananı tahliye etmekle yükümlüdür.",
      relevance: 94,
    },
    {
      type: "case",
      title: "Yargıtay 6. HD 2018/1234",
      description: "Tahliye taahhütnamesiyle kiracının kendi rızasıyla tahliye etmeyi taahhüt etmesi...",
      relevance: 78,
    },
    {
      type: "risk",
      title: "Yasal Süre Uyarısı",
      description: "Tahliye için en az 3 ay önceden yazılı bildirim yapılmalıdır.",
      relevance: 88,
    },
  ],
};

export default function AnalysisPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  // Supabase auth state listener
  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "Kullanıcı";
  };

  const handleAnalyze = useCallback(async () => {
    if (!query.trim() || !category) return;
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      // Show paywall after 2 seconds
      setTimeout(() => setShowPaywall(true), 2000);
    }, 2500);
  }, [query, category]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-navy-700 hover:text-navy-800">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Ana Sayfa</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {getUserDisplayName()}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200/60 bg-white py-2 shadow-lg shadow-slate-900/10">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span className="text-sm text-slate-500">Ücretsiz Analiz</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/giris">Giriş Yap</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: Input Area */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-navy-800 mb-2">
                Hukuki Analiz
              </h1>
              <p className="text-slate-600">
                Vakanızı detaylı şekilde açıklayın, yapay zeka uygun kanun maddelerini ve emsal kararları tespit etsin.
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">
                Hukuki Alan Seçin
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-left",
                      category === cat.id
                        ? "border-navy-700 bg-navy-50 text-navy-800"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    )}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">
                Vakanızı Açıklayın
              </label>
              <div
                className={cn(
                  "relative rounded-xl border-2 border-dashed transition-all bg-white",
                  dragActive ? "border-mint-500 bg-mint-50/50" : "border-slate-200"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Örn: Kiracım 2 yıldır kirasını düzenli ödüyor ama evi boşaltmak istiyorum. Yasal olarak ne yapmalıyım?"
                  className="min-h-[200px] border-0 bg-transparent resize-none focus-visible:ring-0 text-slate-700 placeholder:text-slate-400"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                    <FileUp className="w-3.5 h-3.5" />
                    Dosya Yükle
                  </button>
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Info className="w-3.5 h-3.5" />
                Metni yapıştırabilir veya .txt/.pdf dosyası yükleyebilirsiniz
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!query.trim() || !category || isAnalyzing}
              className={cn(
                "w-full h-14 text-lg font-bold rounded-xl transition-all",
                query.trim() && category
                  ? "bg-navy-700 hover:bg-navy-800 text-mint-100 shadow-lg shadow-navy-700/25"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              )}
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                  </motion.div>
                  Analiz Yapılıyor...
                </>
              ) : (
                <>
                  <Scale className="w-5 h-5 mr-2" />
                  Analizi Başlat
                </>
              )}
            </Button>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-mint-500" />
                <span>KVKK Uyumlu</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Lock className="w-4 h-4 text-mint-500" />
                <span>Veri Güvenliği</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-mint-500" />
                <span>Ücretsiz Deneme</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview / Results */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <AnimatePresence mode="wait">
              {!showResults ? (
                // Example Preview
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden"
                >
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-600">Önizleme</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-navy-100 flex items-center justify-center">
                        <Scale className="w-8 h-8 text-navy-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">
                        Örnek Analiz Sonucu
                      </h3>
                      <p className="text-sm text-slate-500">
                        Vakanızı yazın, analiz sonuçlarınız burada görünecek
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Results
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden"
                >
                  {/* Results Header */}
                  <div className="px-6 py-4 bg-navy-700 text-mint-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Analiz Tamamlandı</span>
                      </div>
                      <span className="text-sm">3.2 saniye</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Risk Level */}
                    <div className="flex items-center justify-between p-4 bg-mint-50 border border-mint-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-navy-800">Risk: {EXAMPLE_RESULTS.riskLevel}</span>
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Tespit Edilen Hukuki Alanlar
                      </h4>
                      {EXAMPLE_RESULTS.findings.map((finding, i) => (
                        <div
                          key={i}
                          className={cn(
                            "p-4 rounded-xl border",
                            finding.type === "law" ? "bg-navy-50 border-navy-100" :
                            finding.type === "case" ? "bg-slate-50 border-slate-100" :
                            "bg-amber-50 border-amber-100"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-navy-800">{finding.title}</h5>
                            <span className="text-sm font-bold text-mint-600">{finding.relevance}%</span>
                          </div>
                          <p className="text-sm text-slate-600">{finding.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Paywall */}
                    {showPaywall && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="relative rounded-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/95 backdrop-blur-sm" />
                        <div className="relative p-6 text-center">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy-100 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-navy-600" />
                          </div>
                          <h4 className="text-lg font-bold text-navy-800 mb-2">
                            Detaylı Analiz İçin Giriş Yapın
                          </h4>
                          <p className="text-sm text-slate-600 mb-4">
                            Risk değerlendirmesi, detaylı açıklamalar ve öneriler için ücretsiz hesap oluşturun.
                          </p>
                          <div className="flex flex-col gap-2">
                            <Button className="w-full bg-navy-700 hover:bg-navy-800 text-mint-100">
                              Ücretsiz Hesap Oluştur
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                              <Link href="/giris">
                                Giriş Yap <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
