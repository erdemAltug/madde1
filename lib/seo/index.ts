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
export {
  REHBER_PAGES,
  REHBER_SLUGS,
  getRehberConfig,
  type RehberPageConfig,
} from "./rehber-pages";
export {
  YAPAY_ZEKA_HUKUK_PAGES,
  YAPAY_ZEKA_HUKUK_SLUGS,
  getYapayZekaHukukConfig,
} from "./yapay-zeka-hukuk-pages";
export {
  HUKUKI_ANALIZ_PAGES,
  HUKUKI_ANALIZ_SLUGS,
  getHukukiAnalizConfig,
  type HukukiAnalizPageConfig,
} from "./hukuki-analiz-pages";
export {
  REHBER_HUB_LINKS,
  SOZLESME_ANALIZI_FEATURED,
  HUKUKI_ANALIZ_LINKS,
  getRelatedLinksForSozlesme,
  getRelatedLinksForRehber,
  getRelatedLinksForHukukiAnaliz,
  getRelatedLinksForYapayZekaHukuk,
  YAPAY_ZEKA_HUKUK_LINKS,
  type InternalLink,
} from "./internal-links";
