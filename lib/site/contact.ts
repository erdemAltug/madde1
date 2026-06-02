/** Genel iletişim — tüm "iletişime geçin" akışları bu adrese yönlenir */
export const CONTACT_EMAIL = "tryclauseai@gmail.com";

export type MailtoOptions = {
  subject?: string;
  body?: string;
};

export function contactMailtoHref(options: MailtoOptions = {}): string {
  const params = new URLSearchParams();
  if (options.subject) params.set("subject", options.subject);
  if (options.body) params.set("body", options.body);
  const q = params.toString();
  return `mailto:${CONTACT_EMAIL}${q ? `?${q}` : ""}`;
}

export const BETA_LIMIT_CONTACT_MESSAGE = `Ücretsiz beta kullanım limitiniz doldu. Geri bildirim veya ek kredi için: ${CONTACT_EMAIL}`;

/** Limit dolduğunda iletişim e-postasını gösterir (mailto açmaz) */
export function notifyBetaLimitReached(): void {
  if (typeof window === "undefined") return;
  window.alert(BETA_LIMIT_CONTACT_MESSAGE);
}
