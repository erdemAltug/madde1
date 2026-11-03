import { AnalyticsEvents } from "@/lib/analytics/events";

/**
 * Tüm araçlar için tek ölçüm modeli. Her araç kendi olayını atmaya devam eder;
 * captureEvent bunlardan birini görünce ek olarak birleşik bir olay da gönderir:
 *
 *   Tool_Opened    — araç sayfası açıldı           (TrackToolOpen bileşeni)
 *   Tool_Started   — kullanıcı aracı çalıştırmaya başladı
 *   Tool_Succeeded — sonuç üretildi (hesap yapıldı, tarama bitti, cevap geldi)
 *   Tool_Failed    — hata
 *
 * Hepsinde `tool` özelliği var → PostHog'da tek bir kırılımla "hangi araç kaç kişi,
 * başarı oranı ne" sorusu cevaplanır.
 */
export const ToolEvents = {
  OPENED: "Tool_Opened",
  STARTED: "Tool_Started",
  SUCCEEDED: "Tool_Succeeded",
  FAILED: "Tool_Failed",
} as const;

type Stage = (typeof ToolEvents)[keyof typeof ToolEvents];
type Props = Record<string, unknown> | undefined;
type Rule = { stage: Stage; tool: (p: Props) => string | null };

const str = (v: unknown) => (typeof v === "string" && v ? v : null);

/** Mevcut olay → birleşik araç olayı eşlemesi */
const RULES: Record<string, Rule> = {
  // Hesaplayıcılar: hesaplama yapıldığı an başarıdır
  [AnalyticsEvents.FREE_TOOL_USED]: { stage: ToolEvents.SUCCEEDED, tool: (p) => str(p?.tool) },

  // Sözleşme taraması
  [AnalyticsEvents.ANALYSIS_STARTED]: { stage: ToolEvents.STARTED, tool: () => "sozlesme_tarama" },
  [AnalyticsEvents.ANALYSIS_COMPLETED]: { stage: ToolEvents.SUCCEEDED, tool: () => "sozlesme_tarama" },
  [AnalyticsEvents.ANALYSIS_ERROR]: { stage: ToolEvents.FAILED, tool: () => "sozlesme_tarama" },

  // Fotoğraftan / PDF'ten okuma
  [AnalyticsEvents.PHOTO_SCAN_STARTED]: { stage: ToolEvents.STARTED, tool: () => "fotograf_tarama" },
  [AnalyticsEvents.PHOTO_SCAN_COMPLETED]: { stage: ToolEvents.SUCCEEDED, tool: () => "fotograf_tarama" },
  [AnalyticsEvents.PHOTO_SCAN_FAILED]: { stage: ToolEvents.FAILED, tool: () => "fotograf_tarama" },

  // Haklarım Kontrolü
  [AnalyticsEvents.RIGHTS_CHECK_STARTED]: { stage: ToolEvents.STARTED, tool: () => "haklarim_kontrol" },
  [AnalyticsEvents.RIGHTS_CHECK_COMPLETED]: { stage: ToolEvents.SUCCEEDED, tool: () => "haklarim_kontrol" },

  // Sürüm karşılaştırma (tek adım: çalıştırınca sonuç anında)
  [AnalyticsEvents.CONTRACT_COMPARE_RUN]: { stage: ToolEvents.SUCCEEDED, tool: () => "karsilastirma" },

  // Cevap taslağı
  reply_scenario_selected: { stage: ToolEvents.STARTED, tool: () => "cevap_taslagi" },
  reply_copied: { stage: ToolEvents.SUCCEEDED, tool: () => "cevap_taslagi" },
  reply_shared: { stage: ToolEvents.SUCCEEDED, tool: () => "cevap_taslagi" },

  // Asistan
  [AnalyticsEvents.ASISTAN_MESSAGE_SENT]: { stage: ToolEvents.STARTED, tool: () => "asistan" },
  [AnalyticsEvents.ASISTAN_ANSWERED]: { stage: ToolEvents.SUCCEEDED, tool: () => "asistan" },
  [AnalyticsEvents.ASISTAN_FAILED]: { stage: ToolEvents.FAILED, tool: () => "asistan" },

  // Takvim
  reminders_requested: { stage: ToolEvents.STARTED, tool: () => "takvim" },
  reminders_saved: { stage: ToolEvents.SUCCEEDED, tool: () => "takvim" },
};

/** Bir olay birleşik araç olayına karşılık geliyorsa onu döndürür. */
export function deriveToolEvent(
  event: string,
  properties: Props,
): { event: Stage; properties: Record<string, unknown> } | null {
  const rule = RULES[event];
  if (!rule) return null;
  const tool = rule.tool(properties);
  if (!tool) return null;
  // tool_path: başarı oranı sayfa bazında (Tool_Opened da aynı alanı taşır)
  const toolPath = typeof window !== "undefined" ? window.location.pathname : undefined;
  return { event: rule.stage, properties: { tool, tool_path: toolPath, source_event: event } };
}
