import type { HukukiAnalizPageConfig } from "./rehber-types";

/** SEO Faz 2 — problem-intent sayfaları (+3) */
export const HUKUKI_ANALIZ_EXTRA_PAGES: HukukiAnalizPageConfig[] = [
  {
    slug: "kira-borcu-takibi",
    title: "Kira borcu takibi",
    metaTitle: "Kira borcu takibi — icra ve tahsil rehberi",
    metaDescription:
      "Kira borcu nasıl takip edilir? İhtar, icra ve kiracı hakları. Ücretsiz kira sözleşmesi yapay zeka analizi.",
    keywords: [
      "kira borcu takibi",
      "kira alacağı icra",
      "kira borcu tahsil",
      "kiracı borç takibi",
    ],
    heroTitle: "Kira borcu takibinde haklarınızı bilin",
    heroSubtitle: "Tahsil süreci ile tahliye süreci farklıdır",
    problemExplanation:
      "Kira borcunun ödenmemesi ev sahibini tahsil, kiracıyı ise icra ve tahliye riski ile karşı karşıya bırakır. Süreçler karıştırıldığında usulsüz işlem ve tazminat doğar.",
    legalContext:
      "Kira alacağı genellikle icra veya dava yoluyla takip edilir. Tahliye için ayrı sebep ve usul şartları aranır. TBK ve İcra İflas Kanunu birlikte uygulanır.",
    risks: [
      "İhtar süresini kaçırmak",
      "Haksız faiz ve masraf talebi",
      "Usulsüz tahliye girişimi",
      "Sözleşmedeki belirsiz temerrüt maddesi",
    ],
    solution:
      "Kira sözleşmenizi Clause ile tarayın. Fesih, depozito mahsubu ve temerrüt maddelerini öğrenin; ardından uzman desteği alın.",
    relatedLaws: [
      { code: "TBK", article: "315", title: "Kira bedelinin ödenmesi" },
      { code: "İİK", article: "68", title: "İlamsız icra" },
      { code: "TBK", article: "347", title: "Tahliye" },
    ],
    exampleScenario: {
      title: "Örnek: 2 aylık kira borcu",
      situation:
        "Kiracı 2 aydır ödeme yapmadı. Ev sahibi kapı kilidini değiştirdi.",
      result:
        "Zorla tahliye hukuka aykırıdır; kira alacağı için yasal yollar izlenmelidir.",
    },
    faqs: [
      {
        question: "Kira borcu depozitodan kesilir mi?",
        answer: "Sözleşme ve usul şartlarına bağlıdır; keyfi kesinti uyuşmazlık doğurur.",
      },
      {
        question: "Kiracı icraya itiraz edebilir mi?",
        answer: "Evet; süre içinde itiraz edilmezse takip kesinleşebilir.",
      },
    ],
    ctaHref: "/rehber/kira-borcu-takibi-icra",
    updatedAt: "2026-07-11",
  },
  {
    slug: "abonelik-iptal-anlasmazligi",
    title: "Abonelik iptal anlaşmazlığı",
    metaTitle: "Abonelik iptal anlaşmazlığı — dijital üyelik hakları",
    metaDescription:
      "Abonelik iptal edilmiyor mu? Otomatik yenileme ve tüketici hakları. Üyelik sözleşmesi ücretsiz AI analizi.",
    keywords: [
      "abonelik iptal anlaşmazlığı",
      "üyelik iptal edilmiyor",
      "otomatik yenileme şikayet",
    ],
    heroTitle: "Aboneliği iptal edemiyor musunuz?",
    heroSubtitle: "Dijital hizmetlerde tüketici hakları",
    problemExplanation:
      "Gizli iptal butonu, otomatik yenileme ve cayma süresi karmaşası tüketiciyi mağdur eder. Yazılı iptal kanıtı ve sözleşme metni kritiktir.",
    legalContext:
      "Mesafeli sözleşmeler ve tüketici mevzuatı cayma ve bilgilendirme yükümlülükleri getirir. Dijital içerik istisnaları ayrı değerlendirilir.",
    risks: [
      "Sözlü iptal iddiası",
      "Otomatik çekim devamı",
      "Cayma süresini kaçırmak",
      "Belirsiz üyelik şartları",
    ],
    solution:
      "Üyelik sözleşmenizi Clause ile analiz edin. Otomatik yenileme ve iptal maddelerini görün; şikayet kanallarına başvurun.",
    relatedLaws: [
      { code: "TKHK", article: "48", title: "Cayma hakkı" },
      { code: "TKHK", article: "18", title: "Ön bilgilendirme" },
    ],
    exampleScenario: {
      title: "Örnek: Yıllık plan yenilendi",
      situation:
        "Kullanıcı iptal ettiğini sandı; karttan yıllık ücret çekildi. İptal ekranı bulunamıyor.",
      result:
        "Yazılı iptal kanıtı ve tüketici şikayeti ile iade talep edilebilir; somut olayda sonuç değişir.",
    },
    faqs: [
      {
        question: "Banka kartından çekim durdurulur mu?",
        answer: "Kart iptali geçici çözümdür; hukuki iptal ve iade ayrıca talep edilmelidir.",
      },
    ],
    ctaHref: "/rehber/abonelik-iptal-dijital-hizmet",
    updatedAt: "2026-07-11",
  },
  {
    slug: "ucret-kesintisi-anlasmazligi",
    title: "Ücret kesintisi anlaşmazlığı",
    metaTitle: "Ücret kesintisi anlaşmazlığı — çalışan hakları",
    metaDescription:
      "Maaştan yapılan kesinti hukuka uygun mu? İş sözleşmesi ve İş Kanunu. Ücretsiz iş kontratı AI analizi.",
    keywords: [
      "ücret kesintisi anlaşmazlığı",
      "maaş kesintisi dava",
      "haksız ücret kesintisi",
    ],
    heroTitle: "Maaşınızdan kesinti yapıldı mı?",
    heroSubtitle: "İş Kanunu sınırları ve sözleşme",
    problemExplanation:
      "İşverenin ücretten kesinti yapması kanunda sınırlıdır. Disiplin cezası ile tazminat mahsubu karıştırılmamalıdır.",
    legalContext:
      "İş Kanunu ücretin tam ödenmesini ve kesinti sınırlarını korur. İşçi feragati her durumda geçerli değildir.",
    risks: [
      "Savunma hakkı verilmeden kesinti",
      "Kanuni sınırı aşan kesinti",
      "Belirsiz sözleşme maddesi",
      "Zamanaşımı",
    ],
    solution:
      "İş sözleşmenizi Clause ile tarayın. Kesinti, fesih ve ücret maddelerindeki riskleri öğrenin.",
    relatedLaws: [
      { code: "İş Kanunu", article: "37", title: "Ücretin ödenmesi" },
      { code: "İş Kanunu", article: "38", title: "Ücretten kesinti" },
    ],
    exampleScenario: {
      title: "Örnek: Hasar tazminatı mahsubu",
      situation:
        "İşveren, çalışanın maaşından araç hasarını tek taraflı kesti.",
      result:
        "Usul ve kanuni sınır aşılmışsa kesinti geçersiz olabilir; alacak davası açılabilir.",
    },
    faqs: [
      {
        question: "Yazılı onay ile her kesinti olur mu?",
        answer: "Hayır; kanuni sınırlar ve işçi hakları geçerlidir.",
      },
    ],
    ctaHref: "/rehber/is-sozlesmesi-ucret-kesintisi",
    updatedAt: "2026-07-11",
  },
];
