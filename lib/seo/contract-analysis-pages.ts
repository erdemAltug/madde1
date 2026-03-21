/**
 * Programmatic SEO: /analiz/[slug] — her slug benzersiz title/description.
 * Eski URL: /analiz/kira → next.config redirect ile kira-sozlesmesi
 */
export type ContractAnalysisPageConfig = {
  /** Tarayıcı sekmesi (root layout | Clause şablonu ile birleşir) */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Sayfa H1 */
  h1: string;
  lead: string;
};

export const CONTRACT_ANALYSIS_PAGES: Record<string, ContractAnalysisPageConfig> = {
  "kira-sozlesmesi": {
    metaTitle:
      "Kira sözleşmesi riskleri ve sözleşme analizi — ücretsiz AI ön tarama",
    metaDescription:
      "Konut ve iş yeri kira sözleşmesi riskleri: TBK, artış, depozito, fesih ve tahliye. Legal AI assistant Clause ile sözleşme analizi ve güven skoru.",
    keywords: [
      "kira sözleşmesi riskleri",
      "sözleşme analizi",
      "kira sözleşmesi analizi",
      "legal AI assistant",
      "kira sözleşmesi kontrolü",
      "TBK kira sözleşmesi",
      "yapay zeka kira sözleşmesi",
      "kira risk analizi",
    ],
    h1: "Kira sözleşmesi riskleri ve TBK sözleşme analizi",
    lead:
      "Kira bedeli artışı, temerrüt, depozito ve fesih maddelerindeki tipik riskleri legal AI assistant ile ön taramadan geçirin.",
  },
  "is-sozlesmesi": {
    metaTitle: "İş sözleşmesi fesih ve risk analizi — Clause",
    metaDescription:
      "İş Kanunu ve TBK çerçevesinde iş sözleşmesi fesih maddesi, ücret, fazla mesai ve rekabet yasağı gibi başlıklarda AI destekli ön inceleme.",
    keywords: [
      "iş sözleşmesi fesih maddesi",
      "iş sözleşmesi analizi",
      "iş hukuku AI",
      "iş sözleşmesi risk",
      "İş Kanunu sözleşme kontrolü",
    ],
    h1: "İş sözleşmesi hukuki ön inceleme",
    lead:
      "Fesih şartları, ihbar süreleri ve ücret maddelerindeki dengesizlikleri erken tespit edin.",
  },
  "freelance-tasarim-sozlesmesi": {
    metaTitle: "Freelance tasarım sözleşmesi analizi — telif ve teslim",
    metaDescription:
      "Tasarım, yazılım ve yaratıcı hizmet sözleşmelerinde telif, revizyon, ödeme ve fikri mülkiyet maddelerini Clause AI ile kontrol edin.",
    keywords: [
      "freelance sözleşme analizi",
      "tasarım sözleşmesi",
      "telif hakkı sözleşme",
      "yapay zeka freelance sözleşme",
    ],
    h1: "Freelance / tasarım sözleşmesi analizi",
    lead:
      "Teslim, revizyon hakları ve ödeme takvimindeki riskleri sade bir özetle görün.",
  },
  "hizmet-sozlesmesi": {
    metaTitle: "Hizmet sözleşmesi risk analizi — TBK uyumlu AI",
    metaDescription:
      "Danışmanlık ve hizmet sözleşmelerinde kapsam, bedel, gecikme cezası ve mücbir sebep maddeleri için yapay zeka ön analizi.",
    keywords: [
      "hizmet sözleşmesi analizi",
      "TBK hizmet sözleşmesi",
      "danışmanlık sözleşmesi kontrolü",
    ],
    h1: "Hizmet sözleşmesi hukuki ön inceleme",
    lead:
      "Kapsam, süre, ücret ve fesih dengesini TBK perspektifiyle hızlıca tarayın.",
  },
  "tahliye-taahhutnamesi": {
    metaTitle: "Tahliye taahhütnamesi kontrolü — usul ve içerik riskleri",
    metaDescription:
      "Tahliye taahhütnamesinde eksik unsurlar, TBK ve kira hukuku uyumu ile tipik usul hatalarını AI ile ön kontrolden geçirin.",
    keywords: [
      "tahliye taahhütnamesi",
      "tahliye belgesi kontrolü",
      "kira tahliye AI",
    ],
    h1: "Tahliye taahhütnamesi kontrolü",
    lead:
      "İmzalar, tarih, taşınmaz bilgisi ve şartların usule uygunluğunu hızlıca tarayın.",
  },
  "ticari-sozlesme": {
    metaTitle: "Ticari sözleşme risk taraması — KOBİ ve şirketler",
    metaDescription:
      "Satın alma, distribütörlük ve çerçeve sözleşmelerde ödeme, temerrüt, sorumluluk sınırları ve uyuşmazlık çözümü maddelerini AI ile ön analizden geçirin.",
    keywords: [
      "ticari sözleşme analizi",
      "KOBİ sözleşme yönetimi",
      "sözleşme risk denetimi",
      "kurumsal sözleşme AI",
    ],
    h1: "Ticari sözleşme ön analizi",
    lead:
      "Kurumsal ekipler için: riskleri minimize et, standart maddeleri hızlıca tarayın.",
  },
};

export const CONTRACT_ANALYSIS_SLUGS = Object.keys(CONTRACT_ANALYSIS_PAGES);

export function getContractAnalysisConfig(
  slug: string,
): ContractAnalysisPageConfig | null {
  return CONTRACT_ANALYSIS_PAGES[slug] ?? null;
}
