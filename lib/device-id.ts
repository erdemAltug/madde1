const STORAGE_KEY = "clause_device_id";
const LEGACY_KEY = "madde1_device_id";

function randomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `d_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

/** Tarayıcıda kalıcı anonim cihaz kimliği (Supabase satır anahtarı). */
export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = window.localStorage.getItem(LEGACY_KEY) ?? null;
      if (id) {
        window.localStorage.setItem(STORAGE_KEY, id);
        window.localStorage.removeItem(LEGACY_KEY);
      }
    }
    if (!id) {
      id = randomId();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}
