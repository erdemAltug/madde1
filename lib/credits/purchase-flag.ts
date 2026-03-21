const KEY = "clause_has_completed_purchase_v1";
const LEGACY_KEY = "madde1_has_completed_purchase_v1";

export function readPurchaseCompletedFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(KEY) === "1") return true;
    if (window.localStorage.getItem(LEGACY_KEY) === "1") {
      window.localStorage.setItem(KEY, "1");
      window.localStorage.removeItem(LEGACY_KEY);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function markPurchaseCompletedFlag(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, "1");
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
}
