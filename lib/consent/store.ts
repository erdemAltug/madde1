/**
 * Çerez / analitik izni — KVKK Çerez Rehberi: zorunlu olmayan (analitik) çerezler açık rıza ile.
 * Tek doğruluk kaynağı: localStorage "clause_consent". Seçim yapılmadıysa analitik KAPALI.
 */
export type ConsentState = {
  /** Analitik ve ürün iyileştirme (PostHog: olay, sayfa görüntüleme, maskeli oturum kaydı) */
  analytics: boolean;
  /** Seçimin tarihi (ISO) — rızanın ispatı için */
  decidedAt: string;
  /** Metin/kapsam değişirse artırılır; eski seçim geçersiz sayılıp yeniden sorulur */
  version: number;
};

export const CONSENT_VERSION = 1;
const KEY = "clause_consent";
const EVENT = "clause:consent-change";
const OPEN_EVENT = "clause:consent-open";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed?.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): ConsentState {
  const state: ConsentState = { analytics, decidedAt: new Date().toISOString(), version: CONSENT_VERSION };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* gizli sekme vb. — seçim bu oturumda yine uygulanır */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT, { detail: state }));
  return state;
}

export function onConsentChange(cb: (s: ConsentState) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentState>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/** Footer'daki "Çerez tercihleri" bağlantısı banner'ı yeniden açar */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentOpen(cb: () => void): () => void {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
