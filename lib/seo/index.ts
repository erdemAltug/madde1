/**
 * Merkezi SEO yapılandırması — site URL, programmatic analiz slug’ları, yardımcılar.
 */
export {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  defaultHomeMetadata,
} from "./site";
export {
  CONTRACT_ANALYSIS_PAGES,
  CONTRACT_ANALYSIS_SLUGS,
  getContractAnalysisConfig,
  type ContractAnalysisPageConfig,
} from "./contract-analysis-pages";
export {
  SOZLESME_ANALIZI_PAGES,
  SOZLESME_ANALIZI_SLUGS,
  getSozlesmeAnaliziConfig,
  getSozlesmeAnaliziNavLinks,
  type SozlesmeAnaliziPageConfig,
} from "./sozlesme-analizi-pages";
