"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { Search, FileText, Library, History, LogOut, ChevronRight, Sparkles, Download, PenLine, Scale, Upload, X, File, AlertCircle, CheckCircle2, BookOpen, FileSignature, Send, Crown } from "lucide-react";

interface ContextItem {
  id: string;
  type: "kanun_maddesi" | "emsal_karar";
  content: string;
  metadata: {
    soru?: string;
    cevap?: string;
  };
  category: string;
  source?: string;
  similarity: number;
}

interface UploadedFile {
  name: string;
  size: number;
  content: string;
}

interface HistoryItem {
  id: string;
  query: string;
  report: string;
  created_at: string;
}

type TabType = "analysis" | "petition" | "library" | "history";

const LOADING_STEPS = [
  { text: "Mevzuat veri tabanı taranıyor..." },
  { text: "İçtihatlar arası çapraz sorgu yapılıyor..." },
  { text: "Hukuki mütalaa yapılandırılıyor..." },
  { text: "Risk analizi tamamlanıyor..." },
];

const LOADING_STEPS_WITH_FILE = [
  { text: "📄 Belge içeriği taranıyor ve dijitalleştiriliyor..." },
  { text: "🔍 Belgedeki kritik maddeler ayrıştırılıyor..." },
  { text: "⚖️ Mevzuat ile belge uyumu denetleniyor..." },
  { text: "Hukuki değerlendirme oluşturuluyor..." },
];

const SIDEBAR_ITEMS = [
  { id: "analysis" as TabType, icon: Search, label: "Dosya İncele" },
  { id: "petition" as TabType, icon: FileSignature, label: "Dilekçe Hazırla" },
  { id: "library" as TabType, icon: Library, label: "Mevzuat Kütüphanesi" },
  { id: "history" as TabType, icon: History, label: "Geçmiş" },
];

// Rich Text Renderer for the report
const ReportRenderer = ({ report }: { report: string }) => {
  const paragraphs = report.split('\n\n').filter(p => p.trim());

  const renderParagraph = (text: string, index: number) => {
    if (text.startsWith('## ')) {
      return (
        <h3 key={index} className="text-xl font-semibold text-slate-900 mt-8 mb-4">
          {text.replace('## ', '')}
        </h3>
      );
    }

    if (text.toLowerCase().includes('öneri') || text.toLowerCase().includes('tavsiye')) {
      return (
        <div key={index} className="my-6 p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
              {text}
            </div>
          </div>
        </div>
      );
    }

    if (text.includes('Kanun') || text.includes('Madde') || /\d+\s*sayılı/.test(text)) {
      const highlighted = text.split(/(\d+\s*sayılı.*?madde\s*\d+[/-]?[\d+]?)/gi).map((part, i) => {
        if (/\d+\s*sayılı.*?madde/i.test(part)) {
          return (
            <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
              {part}
            </span>
          );
        }
        return part;
      });

      return (
        <div key={index} className="my-4 p-4 bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div className="text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
              {highlighted}
            </div>
          </div>
        </div>
      );
    }

    if (text.toLowerCase().includes('yargıtay') || text.toLowerCase().includes('içtihat') || text.toLowerCase().includes('emsal')) {
      return (
        <div key={index} className="my-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-slate-600 italic leading-relaxed" style={{ lineHeight: 1.8 }}>
              {text}
            </div>
          </div>
        </div>
      );
    }

    return (
      <p key={index} className="text-slate-700 mb-6 leading-relaxed" style={{ lineHeight: 1.8 }}>
        {text}
      </p>
    );
  };

  return (
    <div className="prose max-w-none">
      {paragraphs.map((para, index) => renderParagraph(para, index))}
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("analysis");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingSteps, setLoadingSteps] = useState(LOADING_STEPS);
  const [report, setReport] = useState<string>("");
  const [context, setContext] = useState<ContextItem[]>([]);
  const [petitionText, setPetitionText] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = getSupabaseBrowser();
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        router.push("/admin/login");
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        loadHistory();
      }
    };
    checkAuth();
  }, [supabase, router]);

  const loadHistory = async () => {
    const savedHistory = localStorage.getItem("legal_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("History parse error:", e);
      }
    }
  };

  const saveToHistory = (query: string, report: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      query,
      report,
      created_at: new Date().toISOString(),
    };
    const updated = [newItem, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem("legal_history", JSON.stringify(updated));
  };

  useEffect(() => {
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, []);

  const startLoadingAnimation = (hasFile: boolean) => {
    setLoadingSteps(hasFile ? LOADING_STEPS_WITH_FILE : LOADING_STEPS);
    setLoadingStep(0);
    let step = 0;
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
    }
    loadingIntervalRef.current = setInterval(() => {
      step++;
      if (step >= loadingSteps.length) {
        step = loadingSteps.length - 1;
      }
      setLoadingStep(step);
    }, 1500);
  };

  const stopLoadingAnimation = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
    setLoadingStep(0);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const allowedTypes = ["application/pdf", "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"];
    
    if (!allowedTypes.includes(file.type)) {
      alert("Sadece PDF, Word veya TXT dosyaları yüklenebilir");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Dosya boyutu maksimum 10MB olabilir");
      return;
    }

    if (file.type === "text/plain") {
      const text = await file.text();
      setUploadedFile({ name: file.name, size: file.size, content: text });
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          setUploadedFile({ name: data.fileName, size: data.fileSize, content: "" });
        } else {
          setUploadedFile({ name: data.fileName, size: data.fileSize, content: data.content });
        }
      } catch (err) {
        alert("Dosya yüklenirken hata oluştu");
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim() && !uploadedFile?.content) return;
    setLoading(true); setReport(""); setContext([]);
    startLoadingAnimation(!!uploadedFile?.content);
    try {
      const response = await fetch("/api/admin/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, fileContent: uploadedFile?.content || null, fileName: uploadedFile?.name || null }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      const data = await response.json();
      if (data.report) { setReport(data.report); saveToHistory(query || "Dosya Analizi", data.report); }
      else if (data.message) setReport(data.message);
      if (data.context) setContext(data.context);
    } catch (err) { alert("Arama hatası: " + (err as Error).message); }
    finally { setLoading(false); stopLoadingAnimation(); }
  }, [query, uploadedFile]);

  const generatePetition = useCallback(async () => {
    if (!report) { alert("Önce bir analiz yapın!"); return; }
    setLoading(true); startLoadingAnimation(!!uploadedFile?.content);
    try {
      const response = await fetch("/api/admin/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          report,
          context,
          fileContent: uploadedFile?.content || null,
          fileName: uploadedFile?.name || null
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      const data = await response.json();
      setPetitionText(data.petition || "Dilekçe oluşturulamadı.");
      setActiveTab("petition");
    } catch (err) { alert("Dilekçe oluşturma hatası: " + (err as Error).message); }
    finally { setLoading(false); stopLoadingAnimation(); }
  }, [query, report, context, uploadedFile]);

  const handleLogout = async () => { if (supabase) await supabase.auth.signOut(); router.push("/admin/login"); };
  const openModal = (title: string, content: string) => { setModalTitle(title); setModalContent(content); setShowModal(true); };
  const loadFromHistory = (item: HistoryItem) => { setQuery(item.query); setReport(item.report); setActiveTab("analysis"); };
  
  const downloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([`HUKUKİ DANIŞMANLIK RAPORU\n${"=".repeat(40)}\n\nSoru: ${query}\n\n${report}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `hukuk-raporu-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element); element.click(); document.body.removeChild(element);
  };

  const formatFileSize = (bytes: number) => bytes < 1024 ? bytes + " B" : bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + " KB" : (bytes / (1024 * 1024)).toFixed(1) + " MB";

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="animate-pulse flex flex-col items-center"><Scale className="w-10 h-10 text-slate-400 mb-4" /><p className="text-sm text-slate-500 font-medium">Yükleniyor...</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      <div className="absolute inset-0 bg-slate-50/97 pointer-events-none" style={{opacity: 0.97}}></div>
      
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-50 p-2.5 bg-white border border-slate-200 rounded-xl shadow-lg lg:hidden">
        <Search className="w-5 h-5 text-slate-700" />
      </button>

      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}`}>
        <div className="p-5 h-full flex flex-col">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
              <Scale className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <div><h1 className="text-xl font-bold text-slate-900 tracking-tight">clause.ai</h1></div>}
          </div>
          <nav className="flex-1 space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${activeTab === item.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}><Icon className="w-4 h-4 flex-shrink-0" />{sidebarOpen && <span className="text-sm">{item.label}</span>}</button>;
            })}
          </nav>
          <div className="pt-4 mt-4 border-t border-slate-200 space-y-3">
            {/* Plan Info */}
            <div className="flex items-center justify-between px-3 py-2 bg-indigo-50 rounded-lg">
              {sidebarOpen ? (
                <>
                  <div>
                    <p className="text-xs font-medium text-indigo-600">Mevcut Plan</p>
                    <p className="text-sm font-semibold text-slate-900">Ücretsiz</p>
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 px-2 py-1 bg-white rounded-md border border-indigo-200 hover:bg-indigo-100 transition-colors">
                    Yükselt
                  </button>
                </>
              ) : (
                <button className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-lg" title="Plan Yükselt">
                  <Crown className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* User & Logout */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-xs font-medium text-white">{user.email?.[0]?.toUpperCase()}</span></div>
              {sidebarOpen && <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 truncate">{user.email}</p></div>}
              <button onClick={handleLogout} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Çıkış"><LogOut className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative z-10 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {activeTab === "analysis" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900">Dosya İncele</h2>
                <p className="text-sm text-slate-500 mt-1">İncelemek istediğiniz hukuki uyuşmazlığı veya vakayı detaylandırın</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                <div className="p-5">
                  <textarea value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSearch(); }} placeholder="İncelemek istediğiniz hukuki uyuşmazlığı veya vakayı detaylandırın..." className="w-full text-slate-700 text-base resize-none min-h-[100px] focus:outline-none" />
                  <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()} className={`mt-4 border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.doc,.txt" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                    {uploadedFile ? (
                      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><File className="w-5 h-5 text-indigo-600" /></div><div><p className="font-medium text-slate-700 text-sm">{uploadedFile.name}</p><p className="text-xs text-slate-400">{formatFileSize(uploadedFile.size)}</p></div></div><button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><X className="w-4 h-4" /></button></div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-slate-500"><Upload className="w-5 h-5" /><span className="text-sm">Dosya yükle (PDF, Word, TXT)</span></div>
                    )}
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <button onClick={handleSearch} disabled={loading || (!query.trim() && !uploadedFile?.content)} className="w-full px-6 py-3 bg-[#1a1c2e] text-white font-semibold rounded-xl hover:bg-[#252742] disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm shadow-inner hover:shadow-indigo-200/50">
                    {loading ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>İnceleniyor</> : <><Sparkles className="w-3.5 h-3.5" />Analizi Başlat</>}
                  </button>
                </div>
              </div>

              {loading && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                  <div className="flex items-center gap-4"><div className="w-8 h-8 border-3 border-slate-100 border-t-[#1a1c2e] rounded-full animate-spin"></div><span className="text-base font-medium text-slate-700">{loadingSteps[loadingStep].text}</span></div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#1a1c2e] rounded-full animate-pulse" style={{width: '60%'}}></div></div>
                </div>
              )}

              {report && !loading && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                  {context.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {context.map((item) => (
                        <div key={item.id} className={`bg-white rounded-xl p-4 border-l-4 shadow-sm ${item.type === "kanun_maddesi" ? "border-l-indigo-500" : "border-l-amber-500"}`}>
                          <div className="flex justify-between items-center mb-2"><span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{item.type === "kanun_maddesi" ? "Kanun Maddesi" : "Emsal Karar"}</span><span className="text-xs font-medium text-slate-400">%{Math.round(item.similarity * 100)}</span></div>
                          <p className="text-sm text-slate-600 line-clamp-2">{item.content.substring(0, 100)}...</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100">
                      <h3 className="text-xl font-semibold text-slate-900">Hukuki Değerlendirme ve Risk Analizi</h3>
                    </div>
                    <div className="p-8">
                      <ReportRenderer report={report} />
                    </div>
                    <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex gap-3">
                      <button onClick={generatePetition} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1c2e] text-white font-semibold rounded-xl hover:bg-[#252742] transition-all text-sm shadow-sm hover:shadow-indigo-200/50"><PenLine className="w-4 h-4" /> Dilekçe Hazırla</button>
                      <button onClick={downloadPDF} className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm"><Download className="w-4 h-4" /> İndir</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "petition" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!petitionText ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><FileSignature className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Dilekçe Hazırla</h3>
                  <p className="text-slate-500 mb-6">Önce bir analiz yapın, ardından dilekçe taslağı oluşturabilirsiniz</p>
                  <button onClick={() => setActiveTab("analysis")} className="px-6 py-3 bg-[#1a1c2e] text-white font-semibold rounded-xl hover:bg-[#252742] transition-all">Analize Dön</button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">Dilekçe Taslağı</h3>
                    <button onClick={() => { const element = document.createElement("a"); const file = new Blob([petitionText], { type: 'text/plain' }); element.href = URL.createObjectURL(file); element.download = `dilekce-${new Date().toISOString().split('T')[0]}.txt`; document.body.appendChild(element); element.click(); document.body.removeChild(element); }} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"><Download className="w-4 h-4" /> İndir</button>
                  </div>
                  <div className="p-6"><textarea value={petitionText} onChange={(e) => setPetitionText(e.target.value)} className="w-full min-h-[500px] p-5 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1c2e]/10 focus:border-[#1a1c2e] resize-none" /></div>
                </div>
              )}
            </div>
          )}

          {activeTab === "library" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Library className="w-8 h-8 text-slate-400" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Mevzuat Kütüphanesi</h3>
                <p className="text-slate-500">Kanun maddeleri ve emsal kararlar listeleniyor</p>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900">Geçmiş İncelemeler</h2>
              </div>
              {history.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><History className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Geçmiş İncelemeler</h3>
                  <p className="text-slate-500">Henüz bir inceleme yapmadınız</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <button key={item.id} onClick={() => loadFromHistory(item)} className="w-full bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left flex items-center justify-between group">
                      <div className="flex-1 min-w-0"><p className="font-semibold text-slate-900 truncate">{item.query}</p><p className="text-sm text-slate-500 mt-1">{new Date(item.created_at).toLocaleDateString('tr-TR')}</p></div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{modalTitle}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]"><pre className="whitespace-pre-wrap text-sm text-slate-700">{modalContent}</pre></div>
          </div>
        </div>
      )}
    </div>
  );
}
