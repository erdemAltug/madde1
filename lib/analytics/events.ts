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
  SIGNUP_NUDGE_SHOWN: "Signup_Nudge_Shown",
  SIGNUP_NUDGE_CLICKED: "Signup_Nudge_Clicked",
  SIGNUP_NUDGE_DISMISSED: "Signup_Nudge_Dismissed",
  LIMIT_DIALOG_SHOWN: "Limit_Dialog_Shown",
  LIMIT_DIALOG_SIGNUP_CLICKED: "Limit_Dialog_Signup_Clicked",
  DETAIL_UNLOCK_SIGNUP_PROMPT_SHOWN: "Detail_Unlock_Signup_Prompt_Shown",
  DETAIL_UNLOCK_SIGNUP_CLICKED: "Detail_Unlock_Signup_Clicked",
  CONTACT_FORM_SUBMITTED: "Contact_Form_Submitted",
  CONTACT_FORM_ERROR: "Contact_Form_Error",
} as const;

export type FreeToolId =
  | "rent_increase"
  | "stamp_tax"
  | "tahliye_check"
  | "rent_increase_page"
  | "stamp_tax_page"
  | "kidem_severance_page"
  | "ihbar_severance_page"
  | "fazla_mesai_page"
  | "yillik_izin_page"
  | "brut_net_salary_page"
  | "unemployment_benefit_page";
