const KEY = "clause_wallet_v1";
const LEGACY_KEY = "madde1_wallet_v1";

export type LocalWallet = {
  credits: number;
  unlimitedUntil: string | null;
};

function readRawWalletJson(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const cur = window.localStorage.getItem(KEY);
    if (cur) return cur;
    const leg = window.localStorage.getItem(LEGACY_KEY);
    if (leg) {
      window.localStorage.setItem(KEY, leg);
      window.localStorage.removeItem(LEGACY_KEY);
      return leg;
    }
    return null;
  } catch {
    return null;
  }
}

export function readLocalWallet(): LocalWallet {
  if (typeof window === "undefined") {
    return { credits: 0, unlimitedUntil: null };
  }
  try {
    const raw = readRawWalletJson();
    if (!raw) return { credits: 0, unlimitedUntil: null };
    const p = JSON.parse(raw) as LocalWallet;
    return {
      credits: Math.max(0, Number(p.credits) || 0),
      unlimitedUntil: p.unlimitedUntil ?? null,
    };
  } catch {
    return { credits: 0, unlimitedUntil: null };
  }
}

export function writeLocalWallet(w: LocalWallet) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(w));
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
}

export function localUnlimitedActive(until: string | null): boolean {
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
}

export function localAddCredits(amount: number, unlimitedDays?: number) {
  const cur = readLocalWallet();
  let { credits, unlimitedUntil } = cur;
  credits = Math.max(0, credits + amount);
  if (unlimitedDays && unlimitedDays > 0) {
    unlimitedUntil = new Date(
      Date.now() + unlimitedDays * 86400000,
    ).toISOString();
  }
  writeLocalWallet({ credits, unlimitedUntil });
}

export function localTryConsume(): boolean {
  const cur = readLocalWallet();
  if (localUnlimitedActive(cur.unlimitedUntil)) return true;
  if (cur.credits < 1) return false;
  writeLocalWallet({ ...cur, credits: cur.credits - 1 });
  return true;
}
