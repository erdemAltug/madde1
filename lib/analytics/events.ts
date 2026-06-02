/** PostHog özel olay adları — funnel tutarlılığı için tek kaynak */

export const AnalyticsEvents = {
  HERO_CTA_CLICKED: "Hero_CTA_Clicked",
  FREE_TOOL_USED: "Free_Tool_Used",
  ANALYSIS_STARTED: "Analysis_Started",
  ANALYSIS_COMPLETED: "Analysis_Completed",
  ANALYSIS_ERROR: "Analysis_Error",
  PAYMENT_INITIATED: "Payment_Initiated",
  PAYMENT_SUCCESS: "Payment_Success",
  PRIVACY_MASKING_TOGGLED: "Privacy_Masking_Toggled",
  AUTH_SIGNUP_COMPLETED: "Auth_Signup_Completed",
  AUTH_LOGIN_COMPLETED: "Auth_Login_Completed",
} as const;

export type FreeToolId =
  | "rent_increase"
  | "stamp_tax"
  | "tahliye_check"
  | "rent_increase_page"
  | "stamp_tax_page";
