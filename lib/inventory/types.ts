export type InventoryReport = {
  version: 1;
  markdown?: string;
  refactorMarkdown?: string;
  persona?: string;
  source?: string;
  pinned?: boolean;
  teaser?: {
    criticalRiskCount?: number;
    missingClauseCount?: number;
    securityScore?: number;
    categoryTitles?: string[];
  } | null;
  red?: string[];
  yellow?: string[];
  green?: string[];
};

export type InventoryRow = {
  id: string;
  contract_title: string | null;
  original_text: string | null;
  ai_report: InventoryReport | null;
  risk_score: number | null;
  created_at: string;
};

export function isPinned(row: InventoryRow): boolean {
  return Boolean(row.ai_report?.pinned);
}

export function titleFromText(text: string, fallback: string): string {
  const line = text
    .split("\n")
    .map((s) => s.trim())
    .find((s) => s.length > 8);
  if (!line) return fallback;
  return line.slice(0, 72);
}
