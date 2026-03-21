"use client";

import { useCallback, useEffect, useState } from "react";
import { getOrCreateDeviceId } from "@/lib/device-id";
import {
  readLocalWallet,
  writeLocalWallet,
  localAddCredits,
  localTryConsume,
  localUnlimitedActive,
} from "@/lib/credits/local-wallet";
import {
  CREDIT_PACKAGES,
  type CreditPackageId,
} from "@/lib/credits/packages";
import {
  markPurchaseCompletedFlag,
  readPurchaseCompletedFlag,
} from "@/lib/credits/purchase-flag";

const WALLET_SYNC = "clause-wallet-sync";

function broadcastWalletSync() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(WALLET_SYNC));
}

export function useWallet() {
  const [credits, setCredits] = useState(0);
  const [unlimitedUntil, setUnlimitedUntil] = useState<string | null>(null);
  const [backend, setBackend] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasCompletedPurchase, setHasCompletedPurchase] = useState(false);

  const sync = useCallback(async () => {
    const id = getOrCreateDeviceId();
    if (!id) {
      setReady(true);
      return;
    }
    const r = await fetch("/api/credits", { headers: { "x-device-id": id } });
    const j = (await r.json()) as {
      backend?: boolean;
      credits?: number;
      unlimitedUntil?: string | null;
    };
    if (j.backend) {
      setBackend(true);
      const c = j.credits ?? 0;
      const u = j.unlimitedUntil ?? null;
      setCredits(c);
      setUnlimitedUntil(u);
      writeLocalWallet({ credits: c, unlimitedUntil: u });
      if (c > 0 || localUnlimitedActive(u)) {
        markPurchaseCompletedFlag();
      }
    } else {
      setBackend(false);
      const l = readLocalWallet();
      setCredits(l.credits);
      setUnlimitedUntil(l.unlimitedUntil);
      if (l.credits > 0 || localUnlimitedActive(l.unlimitedUntil)) {
        markPurchaseCompletedFlag();
      }
    }
    setHasCompletedPurchase(readPurchaseCompletedFlag());
    setReady(true);
  }, []);

  useEffect(() => {
    void sync();
  }, [sync]);

  useEffect(() => {
    setHasCompletedPurchase(readPurchaseCompletedFlag());
  }, []);

  useEffect(() => {
    const onSync = () => void sync();
    window.addEventListener(WALLET_SYNC, onSync);
    return () => window.removeEventListener(WALLET_SYNC, onSync);
  }, [sync]);

  const purchase = useCallback(async (packageId: CreditPackageId) => {
    const id = getOrCreateDeviceId();
    const r = await fetch("/api/credits/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-device-id": id },
      body: JSON.stringify({ packageId }),
    });
    const j = (await r.json()) as {
      ok?: boolean;
      error?: string;
      clientOnly?: boolean;
      credits?: number;
      unlimitedUntil?: string | null;
    };
    if (!j.ok) throw new Error(j.error || "İşlem tamamlanamadı");
    markPurchaseCompletedFlag();
    setHasCompletedPurchase(true);
    if (j.clientOnly) {
      const pack = CREDIT_PACKAGES[packageId];
      localAddCredits(pack.credits, pack.unlimitedDays);
      const l = readLocalWallet();
      setCredits(l.credits);
      setUnlimitedUntil(l.unlimitedUntil);
    } else {
      const c = j.credits ?? 0;
      const u = j.unlimitedUntil ?? null;
      setCredits(c);
      setUnlimitedUntil(u);
      writeLocalWallet({ credits: c, unlimitedUntil: u });
    }
    broadcastWalletSync();
  }, []);

  const consume = useCallback(async (): Promise<boolean> => {
    if (localUnlimitedActive(unlimitedUntil)) return true;
    const id = getOrCreateDeviceId();
    const r = await fetch("/api/credits/consume", {
      method: "POST",
      headers: { "x-device-id": id },
    });
    if (r.ok) {
      const j = (await r.json()) as { clientOnly?: boolean };
      if (j.clientOnly) {
        if (!localTryConsume()) return false;
        const l = readLocalWallet();
        setCredits(l.credits);
        broadcastWalletSync();
        return true;
      }
      await sync();
      broadcastWalletSync();
      return true;
    }
    if (r.status === 402 && !backend) {
      if (localTryConsume()) {
        const l = readLocalWallet();
        setCredits(l.credits);
        broadcastWalletSync();
        return true;
      }
    }
    return false;
  }, [backend, unlimitedUntil, sync]);

  const hasUnlimited = useCallback(() => {
    return localUnlimitedActive(unlimitedUntil);
  }, [unlimitedUntil]);

  return {
    credits,
    unlimitedUntil,
    backend,
    ready,
    hasCompletedPurchase,
    refresh: sync,
    purchase,
    consume,
    hasUnlimited,
  };
}
