/**
 * SEO Strategy & Keyword Architecture for ClauseAI
 * Legal AI Product - Turkish Market
 */

// ============================================
// PART 1: TARGET AUDIENCE SEGMENTS
// ============================================

export const targetAudiences = {
  individuals: {
    name: "Bireyler",
    description: "Hukuki sorunları olan, avukat yerine önce kendi başına araştırma yapmak isteyen kişiler",
    painPoints: [
      "Avukata gitmeden önce durumu anlamak istiyorlar",
      "Haklarını bilmiyorlar",
      "Maliyetten kaçınmak istiyorlar",
    ],
    keywords: [
      "hukuki danışmanlık ücretsiz",
      "avukatsız dava açılır mı",
      "hukuki haklarım neler",
    ],
  },
  freelancers: {
    name: "Freelancer / Serbest Çalışanlar",
    description: "Sözleşme hazırlayan ve analiz eden özgür çalışanlar",
    painPoints: [
      "Müşteri sözleşmelerini anlamıyorlar",
      "Riskli maddeleri göremiyorlar",
      "Yasal korunma eksikliği",
    ],
    keywords: [
      "freelancer sözleşme analizi",
      "serbest çalışan sözleşmesi",
      "freelance hukuki korunma",
    ],
  },
  smes: {
    name: "KOBİ / Küçük İşletmeler",
    description: "Sınırlı hukuki bütçeyle operasyon yapan şirketler",
    painPoints: [
      "Her sözleşme için avukat tutamıyorlar",
      "Çalışan hakları konusunda bilgisizler",
      "Ticari riskleri yönetemiyorlar",
    ],
    keywords: [
      "kobi hukuki danışmanlık",
      "şirket sözleşme analizi",
      "işçi hakları kobiler",
    ],
  },
  lawyers: {
    name: "Avukatlar",
    description: "İş yükünü azaltmak ve araştırma hızını artırmak isteyen profesyoneller",
    painPoints: [
      "İçtihat araştırması zaman alıyor",
      "Müvekkil beklentilerini yönetmek zor",
      "Güncel mevzuat takibi zor",
    ],
    keywords: [
      "avukat için hukuki analiz aracı",
      "içtihat veritabanı",
      "hukuki araştırma motoru",
    ],
  },
};

// ============================================
// PART 2: KEYWORD CLUSTERS
// ============================================

export const keywordClusters = {
  // CLUSTER 1: Kira Hukuku
  kiraHukuku: {
    primary: ["kira sözleşmesi", "kiracı hakları", "ev sahibi hakları"],
    secondary: [
      "kira sözleşmesi feshi",
      "kiracı çıkarma",
      "kira artış oranı",
      "depozito iadesi",
      "kira uyuşmazlığı",
    ],
    longTail: [
      "kiracı hakları 2026",
      "kira sözleşmesi nasıl fesh edilir",
      "hukuka aykırı tahliye",
      "kiracı tahliyesi için gerekli şartlar",
    ],
    audience: ["individuals", "smes"],
    searchIntent: "transactional" as const,
  },

  // CLUSTER 2: İş Hukuku
  isHukuku: {
    primary: ["iş hukuku", "işçi hakları", "işveren hakları"],
    secondary: [
      "işten çıkarılma",
      "kıdem tazminatı",
      "ihbar tazminatı",
      "fazla mesai",
      "yıllık izin",
    ],
    longTail: [
      "haksız işten çıkarma tazminatı",
      "kıdem tazminatı hesaplama 2026",
      "istifa edersem tazminat alır mıyım",
      "iş kazası hukuki haklar",
    ],
    audience: ["individuals"],
    searchIntent: "transactional" as const,
  },

  // CLUSTER 3: Sözleşme Analizi
  sozlesmeAnalizi: {
    primary: ["sözleşme analizi", "kontrat inceleme", "sözleşme risk analizi"],
    secondary: [
      "sözleşme okuma",
      "gizlilik şartı",
      "cezai şart",
      "sözleşme bitiş",
      "yenileme şartı",
    ],
    longTail: [
      "sözleşme analizi nasıl yapılır",
      "kontraktaki riskli maddeler",
      "sözleşme inceleme ücreti",
      "elektronik sözleşme hukuki geçerlilik",
    ],
    audience: ["freelancers", "smes", "lawyers"],
    searchIntent: "transactional" as const,
  },

  // CLUSTER 4: Genel Hukuki Danışmanlık
  genelHukuk: {
    primary: ["hukuki danışmanlık", "hukuki yardım", "ücretsiz hukuki danışmanlık"],
    secondary: [
      "avukat bulma",
      "hukuki danışmanlık ücretleri",
      "adli yardım",
      "hukuk danışmanı",
    ],
    longTail: [
      "ücretsiz hukuki danışmanlık nerede",
      "avukatsız dava takibi",
      "hukuki süreç ne kadar sürer",
    ],
    audience: ["individuals"],
    searchIntent: "informational" as const,
  },

  // CLUSTER 5: AI Hukuk
  aiHukuk: {
    primary: ["yapay zeka hukuk", "AI hukuki danışmanlık", "legal AI Turkey"],
    secondary: [
      "hukuk yapay zeka",
      "AI avukat",
      "otomatik sözleşme analizi",
      "hukuki chatbot",
    ],
    longTail: [
      "yapay zeka hukuki danışmanlık güvenilir mi",
      "AI tabanlı hukuki analiz",
      " Türkiye'de legal tech",
    ],
    audience: ["lawyers", "smes", "freelancers"],
    searchIntent: "high_intent" as const,
  },
};

// ============================================
// PART 3: SEARCH INTENT CLASSIFICATION
// ============================================

export const searchIntentGroups = {
  informational: {
    description: "Bilgi arayan kullanıcılar",
    strategy: "Blog içerikleri + bilgilendirici sayfalar",
    cta: "Analiz yapmaya başlayın",
    pages: ["/blog/*", "/rehber/*", "/hukuk-bilgisi/*"],
  },
  transactional: {
    description: "Hizmet arayan kullanıcılar",
    strategy: "Ürün sayfaları + CTA'lar",
    cta: "Ücretsiz analiz yapın",
    pages: ["/analiz/*", "/sozlesme-analizi/*", "/hukuki-analiz/*"],
  },
  high_intent: {
    description: "Karar aşamasındaki kullanıcılar",
    strategy: "Karşılaştırma + Güven + Social Proof",
    cta: "Şimdi başlayın - Ücretsiz",
    pages: ["/", "/fiyatlandirma", "/nasil-calisir"],
  },
};

// ============================================
// PART 4: PROGRAMMATIC SEO ROUTES
// ============================================

export const programmaticSeoRoutes = {
  // Dynamic problem pages
  hukukiAnaliz: "/hukuki-analiz/[problem]",
  problemExamples: [
    { slug: "kira-sozlesmesi-feshi", title: "Kira Sözleşmesi Feshi", meta: "Kira sözleşmesi nasıl feshedilir? Hukuki süreç ve haklarınız." },
    { slug: "is-cikarilma-tazminat", title: "İşten Çıkarılma ve Tazminat", meta: "Haksız işten çıkarılma durumunda tazminat haklarınız." },
    { slug: "sozlesme-risk-analizi", title: "Sözleşme Risk Analizi", meta: "Sözleşmenizdeki riskli maddeleri tespit edin." },
    { slug: "tahliye-taahhutnamesi", title: "Tahliye Taahhütnamesi", meta: "Tahliye taahhütnamesi hukuki geçerliliği ve sonuçları." },
  ],

  // Contract type pages
  sozlesmeAnalizi: "/sozlesme-analizi/[sozlesme-tipi]",
  contractExamples: [
    { slug: "is-sözlesmesi", title: "İş Sözleşmesi Analizi", meta: "İş sözleşmenizdeki haklarınız ve riskli maddeler." },
    { slug: "kira-sozlesmesi", title: "Kira Sözleşmesi Analizi", meta: "Kira sözleşmenizi analiz edin, haklarınızı öğrenin." },
    { slug: "freelance-sozlesmesi", title: "Freelance Sözleşmesi Analizi", meta: "Serbest çalışma sözleşmelerinde dikkat edilecekler." },
    { slug: "gizlilik-sozlesmesi", title: "Gizlilik Sözleşmesi (NDA)", meta: "Gizlilik sözleşmelerinin hukuki değerlendirmesi." },
  ],

  // Rights pages
  haklarim: "/haklarim/[senaryo]",
  scenarioExamples: [
    { slug: "kiraci-haklari", title: "Kiracı Hakları", meta: "Kiracı olarak sahip olduğunuz tüm hukuki haklar." },
    { slug: "isveren-haklari", title: "İşveren Hakları", meta: "İşverenlerin iş hukuku kapsamındaki hakları." },
    { slug: "tuketici-haklari", title: "Tüketici Hakları", meta: "Tüketici olarak korunan haklarınız." },
  ],

  // Law articles
  kanun: "/kanun/[kanun-no]",
  lawExamples: [
    { slug: "tbk-347", title: "Türk Borçlar Kanunu Madde 347", meta: "Kira sözleşmesinin sona ermesi ve tahliye." },
    { slug: "is-kanunu-17", title: "İş Kanunu Madde 17", meta: "İş sözleşmesinin feshi ve tazminatlar." },
  ],

  // Court decisions
  yargitay: "/yargitay-kararlari/[konu]",
  caseExamples: [
    { slug: "kiraci-cikarma", title: "Kiracı Çıkarma Yargıtay Kararları", meta: "Yargıtay'ın kiracı çıkarma konusundaki içtihatları." },
    { slug: "is-cikarma", title: "Haksız İş Çıkarma Kararları", meta: "Yargıtay'ın işçi çıkarma konusundaki içtihatları." },
  ],
};

// ============================================
// PART 5: FAQ SCHEMA TEMPLATES
// ============================================

export const faqSchemaTemplate = {
  kira: [
    {
      question: "Kiracıyı evden çıkarmak için ne yapmalıyım?",
      answer: "Kiracıyı çıkarmak için yasal süreç gereklidir. Tahliye taahhütnamesi veya yasal tahliye davası açılması gerekir. Detaylı bilgi için kira sözleşmesi analizi yapın."
    },
    {
      question: "Kira sözleşmesi ne kadar uzada bilir?",
      answer: "Belirli süreli kira sözleşmeleri en fazla 10 yıl uzatılabilir. Sözleşme sonunda kiracı kendiliğinden çıkmak zorundadır."
    },
    {
      question: "Kiracı kira ödemezse ne yapabilirim?",
      answer: "Kiracının kira borcunu ödememesi durumunda yasal süreç başlatılabilir. İlk olarak ihtar çekilmeli, sonra gerekirse tahliye davası açılmalıdır."
    },
  ],
  is: [
    {
      question: "İşten çıkarıldım, ne yapmalıyım?",
      answer: "Öncelikle işverenin yazılı bildirimini alın. Haksız işten çıkarma durumunda kıdem ve ihbar tazminatı talep edebilirsiniz. Haklarınızı öğrenmek için analiz yapın."
    },
    {
      question: "Kıdem tazminatı nasıl hesaplanır?",
      answer: "Kıdem tazminatı, çalışma süreniz ve son brüt maaşınız üzerinden hesaplanır. Her tam yıl için 30 günlük brüt ücret ödenir."
    },
    {
      question: "İstifa edersem tazminat alır mıyım?",
      answer: "İstifa durumunda genellikle tazminat alınamaz. Ancak işverenin ağır kusurlu davranışları veya mobbing varsa 'haklı fesih' yoluyla tazminat talep edilebilir."
    },
  ],
  sozlesme: [
    {
      question: "Sözleşme analizi ne kadar sürer?",
      answer: "ClauseAI ile sözleşmeniz saniyeler içinde analiz edilir. Riskli maddeler, ilgili kanun maddeleri ve emsal kararlar anında gösterilir."
    },
    {
      question: "Sözleşme analizi güvenilir mi?",
      answer: "ClauseAI, güncel Türk mevzuatı ve Yargıtay içtihatlarıyla eğitilmiş yapay zeka kullanır. Sonuçlar avukat kontrolü için öneriler içerir."
    },
    {
      question: "Sözleşmemdeki riskli maddeleri nasıl anlarım?",
      answer: "Sözleşmenizi ClauseAI'ye yükleyin. Yapay zeka, gizlilik şartları, cezai hükümler, sözleşme süresi gibi kritik noktaları işaretleyecek ve açıklayacaktır."
    },
  ],
};

// ============================================
// PART 6: INTERNAL LINKING STRATEGY
// ============================================

export const internalLinking = {
  hubPages: [
    {
      title: "Kiracı Hakları Merkezi",
      path: "/kiraci-haklari",
      linksTo: ["/kira-sozlesmesi-feshi", "/depozito-iadesi", "/tahliye"],
    },
    {
      title: "İşçi Hakları Merkezi",
      path: "/isci-haklari",
      linksTo: ["/is-cikarilma", "/kidem-tazminati", "/fazla-mesai"],
    },
    {
      title: "Sözleşme Analizi Merkezi",
      path: "/sozlesme-rehberi",
      linksTo: ["/is-sozlesmesi", "/kira-sozlesmesi", "/freelance-sozlesmesi"],
    },
  ],
  breadcrumbStructure: {
    "hukuki-analiz": ["Ana Sayfa", "Hukuki Analiz", "[Konu]"],
    "sozlesme-analizi": ["Ana Sayfa", "Sözleşme Analizi", "[Tür]"],
    haklarim: ["Ana Sayfa", "Haklarım", "[Senaryo]"],
    kanun: ["Ana Sayfa", "Kanun Maddeleri", "[Kanun No]"],
    yargitay: ["Ana Sayfa", "Yargıtay Kararları", "[Konu]"],
  },
};

// ============================================
// PART 7: METADATA TEMPLATES
// ============================================

export const metadataTemplates = {
  default: {
    titleTemplate: "%s | ClauseAI - Hukuki Yapay Zeka",
    descriptionTemplate: "%s hakkında detaylı hukuki analiz. Yargıtay içtihatları ve güncel mevzuata dayalı yapay zeka destekli değerlendirme.",
  },
  home: {
    title: "ClauseAI - Hukuki Yapay Zeka Analiz Platformu",
    description: "Yapay zeka destekli hukuki analiz. Sözleşme analizi, kira hukuku, iş hukuku ve daha fazlası için uzman değerlendirmesi. Ücretsiz deneyin.",
    keywords: "hukuki analiz, yapay zeka hukuk, sözleşme analizi, kira hukuku, iş hukuku, clauseai",
  },
  analysis: {
    titleTemplate: "%s | ClauseAI Analiz",
    descriptionTemplate: "%s hakkında detaylı hukuki analiz. AI destekli kanun maddesi ve emsal karar taraması.",
  },
};

// ============================================
// PART 8: TECHNICAL SEO CHECKLIST
// ============================================

export const technicalSeoChecklist = {
  coreWebVitals: {
    LCP: { target: "< 2.5s", strategy: "ISR + optimized images" },
    FID: { target: "< 100ms", strategy: "Minimal JS, code splitting" },
    CLS: { target: "< 0.1", strategy: "Reserved image space, skeleton loaders" },
  },
  renderingStrategy: {
    landing: "SSG (Static Generation)",
    blog: "SSG with ISR (1 hour)",
    dynamicAnalysis: "SSR (Server Side Rendering)",
    userDashboard: "CSR (Client Side Rendering)",
  },
  sitemap: {
    static: ["/", "/nasil-calisir", "/fiyatlandirma", "/hakkimizda"],
    blog: "/blog/[slug]",
    analysis: "/hukuki-analiz/[problem]",
    contracts: "/sozlesme-analizi/[sozlesme-tipi]",
    laws: "/kanun/[kanun-no]",
    cases: "/yargitay-kararlari/[konu]",
  },
};

export default keywordClusters;
