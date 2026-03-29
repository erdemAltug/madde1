"use client";

import { useCallback, useEffect, useState } from "react";
import { getOrCreateDeviceId } from "@/lib/device-id";

const DAILY_FREE_LIMIT = 3;
const STORAGE_KEY = "clause-daily-analyses";

type DailyAnalysisData = {
  count: number;
  date: string; // YYYY-MM-DD format
};

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function readDailyAnalyses(): DailyAnalysisData {
  if (typeof window === "undefined") {
    return { count: 0, date: getTodayString() };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
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

function saveDailyAnalyses(data: DailyAnalysisData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useDailyAnalysis() {
  const [remaining, setRemaining] = useState(DAILY_FREE_LIMIT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = readDailyAnalyses();
    setRemaining(Math.max(0, DAILY_FREE_LIMIT - data.count));
    setIsLoaded(true);
  }, []);

  const canAnalyze = useCallback(() => {
    if (!isLoaded) return false;
    return remaining > 0;
  }, [isLoaded, remaining]);

  const consumeAnalysis = useCallback(() => {
    const data = readDailyAnalyses();
    const today = getTodayString();
    
    const newData: DailyAnalysisData = {
      count: data.count + 1,
      date: today,
    };
    
    saveDailyAnalyses(newData);
    setRemaining(Math.max(0, DAILY_FREE_LIMIT - newData.count));
  }, []);

  const resetIfNewDay = useCallback(() => {
    const data = readDailyAnalyses();
    const today = getTodayString();
    if (data.date !== today) {
      setRemaining(DAILY_FREE_LIMIT);
    }
  }, []);

  // Her yüklemede gün kontrolü
  useEffect(() => {
    resetIfNewDay();
    // Her dakika kontrol et
    const interval = setInterval(resetIfNewDay, 60000);
    return () => clearInterval(interval);
  }, [resetIfNewDay]);

  return {
    remaining,
    canAnalyze,
    consumeAnalysis,
    isLoaded,
    limit: DAILY_FREE_LIMIT,
  };
}