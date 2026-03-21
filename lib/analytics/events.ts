/** PostHog özel olay adları — funnel tutarlılığı için tek kaynak */

export const AnalyticsEvents = {
  HERO_CTA_CLICKED: "Hero_CTA_Clicked",
  FREE_TOOL_USED: "Free_Tool_Used",
  ANALYSIS_STARTED: "Analysis_Started",
  PAYMENT_INITIATED: "Payment_Initiated",
  PAYMENT_SUCCESS: "Payment_Success",
  PRIVACY_MASKING_TOGGLED: "Privacy_Masking_Toggled",
} as const;

export type FreeToolId =
  | "rent_increase"
  | "stamp_tax"
  | "tahliye_check"
  | "rent_increase_page"
  | "stamp_tax_page";
