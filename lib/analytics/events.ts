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
  SEO_TOOL_SIGNUP_CLICK: "Seo_Tool_Signup_Click",
  CONTACT_FORM_SUBMITTED: "Contact_Form_Submitted",
  CONTACT_FORM_ERROR: "Contact_Form_Error",
  ASISTAN_VOICE_STARTED: "Asistan_Voice_Started",
  RIGHTS_CHECK_STARTED: "Rights_Check_Started",
  RIGHTS_CHECK_COMPLETED: "Rights_Check_Completed",
  RIGHTS_CHECK_SHARED: "Rights_Check_Shared",
  PHOTO_SCAN_STARTED: "Photo_Scan_Started",
  PHOTO_SCAN_COMPLETED: "Photo_Scan_Completed",
  CONTRACT_COMPARE_RUN: "Contract_Compare_Run",
  RISK_CARD_SHARED: "Risk_Card_Shared",
  PWA_INSTALL_PROMPTED: "Pwa_Install_Prompted",
  PWA_INSTALLED: "Pwa_Installed",
  REGULATION_ALERT_VIEWED: "Regulation_Alert_Viewed",
  LANDING_VIEWED: "Landing_Viewed",
  PHOTO_SCAN_FAILED: "Photo_Scan_Failed",
  ASISTAN_MESSAGE_SENT: "Asistan_Message_Sent",
  ASISTAN_ANSWERED: "Asistan_Answered",
  ASISTAN_FAILED: "Asistan_Failed",
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
  | "unemployment_benefit_page"
  | "kira_analizi_page"
  | "tazminat_hub_page"
  | "red_flag_scanner_page"
  | "dilekce_olusturucu_page"
  | "depozito_iade_page"
  | "freelance_checklist_page"
  | "tahliye_validity_page";
