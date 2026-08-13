"use client";

import { useCallback, useEffect, useState } from "react";
import { IS_PUBLIC_BETA } from "@/lib/launch";

export const GUEST_DAILY_LIMIT = 3;
export const REGISTERED_DAILY_LIMIT = 10;
const GUEST_STORAGE_KEY = "clause-daily-analyses";

type DailyAnalysisData = {
  count: number;
  date: string; // YYYY-MM-DD format
};

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function storageKeyForUser(userId?: string | null): string {
  return userId ? `clause-daily-analyses-${userId}` : GUEST_STORAGE_KEY;
}

function readDailyAnalyses(userId?: string | null): DailyAnalysisData {
  if (typeof window === "undefined") {
    return { count: 0, date: getTodayString() };
  }
  const stored = localStorage.getItem(storageKeyForUser(userId));
  if (!stored) {
    return { count: 0, date: getTodayString() };
  }
  try {
    const data = JSON.parse(stored) as DailyAnalysisData;
    const today = getTodayString();
    // Eğer farklı gündeyse, sayacı sıfırla
    if (data.date !== today) {
      return { count: 0, date: today };
    }
    return data;
  } catch {
    return { count: 0, date: getTodayString() };
  }
}

function saveDailyAnalyses(data: DailyAnalysisData, userId?: string | null): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKeyForUser(userId), JSON.stringify(data));
}

export function useDailyAnalysis(userId?: string | null) {
  const limit = userId ? REGISTERED_DAILY_LIMIT : GUEST_DAILY_LIMIT;
  const [remaining, setRemaining] = useState(limit);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = readDailyAnalyses(userId);
    setRemaining(Math.max(0, limit - data.count));
    setIsLoaded(true);
  }, [userId, limit]);

  const canAnalyze = useCallback(() => {
    if (IS_PUBLIC_BETA) return true;
    if (!isLoaded) return false;
    return remaining > 0;
  }, [isLoaded, remaining]);

  const consumeAnalysis = useCallback(() => {
    if (IS_PUBLIC_BETA) return;
    const data = readDailyAnalyses(userId);
    const today = getTodayString();

    const newData: DailyAnalysisData = {
      count: data.count + 1,
      date: today,
    };

    saveDailyAnalyses(newData, userId);
    setRemaining(Math.max(0, limit - newData.count));
  }, [userId, limit]);

  const resetIfNewDay = useCallback(() => {
    const data = readDailyAnalyses(userId);
    const today = getTodayString();
    if (data.date !== today) {
      setRemaining(limit);
    }
  }, [userId, limit]);

  useEffect(() => {
    resetIfNewDay();
    const interval = setInterval(resetIfNewDay, 60000);
    return () => clearInterval(interval);
  }, [resetIfNewDay]);

  return {
    remaining,
    canAnalyze,
    consumeAnalysis,
    isLoaded,
    limit,
    guestLimit: GUEST_DAILY_LIMIT,
    registeredLimit: REGISTERED_DAILY_LIMIT,
  };
}