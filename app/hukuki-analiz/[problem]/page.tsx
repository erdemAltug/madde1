"use client";

import { motion } from "framer-motion";
import { Scale, Shield, FileText, AlertTriangle, CheckCircle2, ArrowRight, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FreemiumPaywall } from "@/components/paywall/freemium-paywall";

// SEO Data - This would come from CMS or database in production
const problemData: Record<string, {
  title: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  problemExplanation: string;
  legalContext: string;
  risks: string[];
  solution: string;
  relatedLaws: { code: string; article: string; title: string }[];
  exampleScenario: { title: string; situation: string; result: string };
  faqs: { question: string; answer: string }[];
}> = {
  "kira-sozlesmesi-feshi": {
    title: "Kira Sözleşmesi Feshi",
    description: "Kira sözleşmesi nasıl feshedilir? Hukuki süreç, şartlar ve haklarınız.",
    metaDescription: "Kira sözleşmesi feshi için yasal şartlar, süreç ve haklarınız. Yargıtay içtihatları ile desteklenmiş güncel analiz.",
    keywords: ["kira feshi", "kiracı çıkarma", "tahliye", "kira sözleşmesi sona Erme"],
    heroTitle: "Kira Sözleşmesi Feshinde Haklarınızı Tanıyın",
    heroSubtitle: "Sözleşme feshi için yasal şartlardan emsal kararlara kadar kapsamlı analiz",
    problemExplanation: "Kira sözleşmesi feshi, kiraya veren ve kiracı arasındaki ilişkinin sonlandırılması sürecidir. Bu süreç, Türk Borçlar Kanunu'nun ilgili maddeleri ve Yargıtay içtihatları ile düzenlenir. Hukuka aykırı fesih, tazminat ve boşaltma yükümlülüğü doğurabilir.",
    legalContext: "Türk Borçlar Kanunu Madde 347, kira süresinin sonunda kiralananın tahliyesini düzenler. Belirli süreli sözleşmelerde fesih ihbar süresine uyulması gerekir. Belirsiz süreli sözleşmelerde ise fesih bildirimi en az 15 gün önceden yapılmalıdır.",
    risks: [
      "Hukuka aykırı tahliye davası açılması",
      "Tazminat talebi ile karşılaşma",
      "Kiracının haklı fesih hakkını kullanması",
      "Tahliye sürecinin uzaması",
    ],
    solution: "ClauseAI ile sözleşmenizi analiz edin. Yapay zeka, uygulanabilir kanun maddelerini, riskli noktaları ve size özel önerileri saniyeler içinde sunar.",
    relatedLaws: [
      { code: "TBK", article: "347", title: "Kiralananın Tahliyesi" },
      { code: "TBK", article: "325", title: "Sözleşmenin Sona Ermesi" },
      { code: "HMK", article: "284", title: "Kiralananın Tahliyesi Davası" },
    ],
    exampleScenario: {
      title: "Örnek Durum: Süreli Sözleşme Feshi",
      situation: "Ahmet Bey, 2 yıllık kira sözleşmesinin bitimine 1 ay kala kiracısına tahliye etmesi gerektiğini bildirmiş, ancak kiracı sürenin sonunda evi boşaltmamıştır.",
      result: "Yargıtay kararlarına göre, kiraya veren sözleşme süresinin sonunda tahliye isteyebilir. Kiracının tahliyeyi kabul etmemesi halinde yasal tahliye davası açılmalıdır.",
    },
    faqs: [
      {
        question: "Kiracı sözleşme bitiminde evi boşaltmazsa ne olur?",
        answer: "Sözleşme sonunda kiracı tahliye etmezse, kiraya veren 15 gün içinde tahliye davası açabilir. Mahkeme tahliye kararı verdikten sonra icra aşaması başlar.",
      },
      {
        question: "Fesih bildirimi ne kadar süre önce yapılmalı?",
        answer: "Belirsiz süreli kira sözleşmelerinde en az 15 gün önceden yazılı bildirim gereklidir. Belirli süreli sözleşmelerde ise sürenin bitiminden en az 15 gün önce ihbar yapılmalıdır.",
      },
      {
        question: "Kiracıyı uyarısız çıkarabilir miyim?",
        answer: "Kanunda belirtilen haklı sebepler olmadan kiracıyı çıkarmak mümkün değildir. Haksız tahliye, kiracıya tazminat hakkı verir.",
      },
    ],
  },
  // Add more problems as needed
};

// JSON-LD Schema for SEO
const generateJsonLd = (data: typeof problemData[string]) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": data.heroTitle,
  "description": data.metaDescription,
  "keywords": data.keywords.join(", "),
  "author": {
    "@type": "Organization",
    "name": "ClauseAI",
  },
  "publisher": {
    "@type": "Organization",
    "name": "ClauseAI",
    "logo": {
      "@type": "ImageObject",
      "url": "/logo.png",
    },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
  },
});

export default function HukukiAnalizPage() {
  const params = useParams();
  const slug = params.problem as string;
  const data = problemData[slug] || problemData["kira-sozlesmesi-feshi"]; // Fallback
  const [showFullContent, setShowFullContent] = useState(false);

  const jsonLd = generateJsonLd(data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-navy-700">
              <Scale className="w-5 h-5" />
              <span className="font-bold">ClauseAI</span>
            </Link>
            <Button className="bg-navy-700 hover:bg-navy-800 text-mint-100" asChild>
              <Link href="/analiz">Analiz Yap</Link>
            </Button>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-navy-700">Ana Sayfa</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/hukuki-analiz" className="hover:text-navy-700">Hukuki Analiz</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-navy-700 font-medium">{data.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint-100 text-mint-700 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              AI Destekli Hukuki Analiz
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-navy-800 mb-4">
              {data.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {data.heroSubtitle}
            </p>
            <Button className="h-12 px-8 bg-navy-700 hover:bg-navy-800 text-mint-100 font-bold shadow-lg shadow-navy-700/25" asChild>
              <Link href="/analiz">
                <Scale className="w-5 h-5 mr-2" />
                Ücretsiz Analiz Yap
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Problem Explanation */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Sorun Nedir?</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">{data.problemExplanation}</p>
                </div>
              </motion.section>

              {/* Legal Context */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Hukuki Çerçeve</h2>
                <div className="p-6 bg-white rounded-xl border border-slate-200">
                  <p className="text-slate-600 leading-relaxed">{data.legalContext}</p>
                </div>
              </motion.section>

              {/* Related Laws */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">İlgili Kanun Maddeleri</h2>
                <div className="space-y-3">
                  {data.relatedLaws.map((law, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-navy-50 rounded-xl border border-navy-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-mint-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy-800">{law.code} Madde {law.article}</p>
                          <p className="text-sm text-slate-500">{law.title}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/kanun/${law.code.toLowerCase()}-${law.article}`}>
                          Detay <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Risks */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Riskler</h2>
                <div className="space-y-3">
                  {data.risks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">{risk}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Example Scenario */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">{data.exampleScenario.title}</h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Durum</p>
                    <p className="mt-2 text-slate-700">{data.exampleScenario.situation}</p>
                  </div>
                  <div className="p-6 bg-mint-50">
                    <p className="text-sm font-semibold text-mint-700 uppercase tracking-wide flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Sonuç
                    </p>
                    <p className="mt-2 text-slate-700">{data.exampleScenario.result}</p>
                  </div>
                </div>
              </motion.section>

              {/* Blurred Premium Content / Paywall */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                {!showFullContent ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/95 z-10 pointer-events-none" />
                    <div className="blur-sm opacity-50">
                      {/* Simulated premium content */}
                      <div className="space-y-4 py-8">
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                        <div className="h-4 w-1/2 bg-slate-200 rounded" />
                        <div className="h-4 w-2/3 bg-slate-200 rounded" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <FreemiumPaywall
                        variant="inline"
                        title="Detaylı Analiz İçin Giriş Yapın"
                        subtitle="Kişiselleştirilmiş hukuki öneriler ve risk değerlendirmesi için ücretsiz hesap oluşturun."
                        featureCount={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-mint-50 rounded-xl border border-mint-200">
                    <h3 className="text-lg font-bold text-navy-800 mb-4">Premium İçerik</h3>
                    <p className="text-slate-600">Detaylı analiz sonuçları burada görüntülenir.</p>
                  </div>
                )}
              </motion.section>

              {/* FAQ Schema */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-6" itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                      <h3 className="text-lg font-semibold text-navy-800 mb-2" itemProp="name">{faq.question}</h3>
                      <div className="text-slate-600" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p itemProp="text">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-navy-700 rounded-2xl p-6 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-mint-300" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Hemen Analiz Yapın</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Sözleşmenizi yükleyin, yapay zeka riskleri tespit etsin.
                  </p>
                  <Button className="w-full bg-mint-500 hover:bg-mint-600 text-navy-800 font-bold" asChild>
                    <Link href="/analiz">
                      Analiz Başlat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Related Topics */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-bold text-navy-800 mb-4">İlgili Konular</h3>
                  <div className="space-y-2">
                    {["Kiracı Hakları", "Tahliye Süreci", "Kira Uyuşmazlığı"].map((topic, i) => (
                      <Link key={i} href={`/hukuki-analiz/${topic.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-between py-2 text-sm text-slate-600 hover:text-navy-700">
                        {topic}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                  <p className="text-xs text-amber-800">
                    <strong>Yasal Uyarı:</strong> Bu içerik bilgilendirme amaçlıdır. Hukuki danışmanlık yerine geçmez. 
                    Kesin hukuki görüş için avukata danışınız.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <section className="bg-navy-800 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hukuki Analizi Ücretsiz Deneyin
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Sözleşmenizi veya durumunuzu açıklayın, yapay zeka destekli analiz ile hukuki riskleri öğrenin.
            </p>
            <Button className="h-14 px-10 bg-mint-500 hover:bg-mint-600 text-navy-800 text-lg font-bold shadow-lg" asChild>
              <Link href="/analiz">
                <Scale className="w-5 h-5 mr-2" />
                Analizi Başlat
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
