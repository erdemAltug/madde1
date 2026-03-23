"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Scale, CheckCircle, Lock, Search, Loader2 } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenAnalyzer: () => void;
};

interface SearchResult {
  id: string;
  type: "kanun" | "emsal";
  title: string;
  summary: string;
  similarity: number;
}

export function LandingTryStrip({ onOpenAnalyzer }: Props) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setShowPaywall(false);
    setResults([]);
    
    try {
      const response = await fetch("/api/admin/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, fileContent: null, fileName: null }),
      });
      
      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      
      if (data.context && data.context.length > 0) {
        const freeResults: SearchResult[] = data.context.slice(0, 2).map((item: any, index: number) => ({
          id: item.id || index.toString(),
          type: item.type === "kanun_maddesi" ? "kanun" : "emsal",
          title: item.category || (item.type === "kanun_maddesi" ? "Kanun Maddesi" : "Emsal Karar"),
          summary: item.content?.substring(0, 150) + "...",
          similarity: item.similarity || 0,
        }));
        
        setResults(freeResults);
        setShowPaywall(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <section
      id="dene"
      className="border-y border-slate-200/60 bg-white py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-xs font-semibold text-indigo-700 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Ücretsiz Ön Analiz
          </div>
          <h2 className="text-2xl font-semibold text-deep-navy sm:text-3xl">
            Hukuki Durumunuzu Anında Analiz Edin
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-medium">
            Vakanızı detaylandırın; yapay zeka destekli analizimiz anında başlasın
          </p>
        </motion.div>

        {/* Interactive Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="soft-elevation rounded-2xl overflow-hidden"
        >
          {/* Input Area */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleAnalyze(); }}
                  placeholder="Örn: Kiracıyım, ev sahibim beni çıkarıyor. Hangi haklarım var?"
                  className="w-full min-h-[100px] p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl inset-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none placeholder:text-slate-400"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !query.trim()}
                className="sm:w-auto w-full px-8 py-3 bg-[#1E293B] hover:bg-[#0F172A] hover:-translate-y-0.5 shadow-lg shadow-slate-900/20 rounded-xl font-semibold text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analiz Ediliyor...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Analiz Et
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Results Preview */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-200/60"
              >
                <div className="p-6 space-y-4">
                  {/* Free Results */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      İlgili Kanun Maddeleri ve Emsal Kararlar
                    </div>
                    
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200/60"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${result.type === 'kanun' ? 'bg-indigo-100' : 'bg-amber-100'}`}>
                            {result.type === 'kanun' ? (
                              <FileText className="w-4 h-4 text-indigo-600" />
                            ) : (
                              <Scale className="w-4 h-4 text-amber-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-500">
                                {result.type === 'kanun' ? 'Kanun Maddesi' : 'Emsal Karar'}
                              </span>
                              <span className="text-xs px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-medium">
                                %{Math.round(result.similarity * 100)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-700 font-medium line-clamp-2">
                              {result.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paywall Blur Section */}
                  {showPaywall && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent -mt-20 z-10" />
                      <div className="pt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                          <Lock className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-semibold text-indigo-900">
                            Hukuki Mütalaa ve Somut Öneriler için
                          </span>
                        </div>
                        <Button
                          onClick={onOpenAnalyzer}
                          className="mt-4 px-8 py-3 bg-[#1E293B] hover:bg-[#0F172A] rounded-xl font-semibold shadow-lg shadow-indigo-500/20"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Hukuki Mütalaayı ve Önerileri Gör
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <p className="mt-3 text-xs text-slate-500 font-medium">
                          199₺/ay üyelik ile sınırsız analiz
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">10.000+ Kanun Maddesi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Yargıtay İçtihatları</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">KVKK Uyumlu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
