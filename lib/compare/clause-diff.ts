/**
 * Sözleşme sürüm karşılaştırma: metni maddelere böler, maddeleri numara/başlık ile eşler,
 * değişenler için kelime düzeyinde fark üretir. Tamamen istemcide çalışır.
 */

export type Clause = { key: string; title: string; body: string };

export type WordOp = { type: "same" | "add" | "del"; text: string };

export type ClauseChange =
  | { kind: "added"; clause: Clause; risk: RiskFlag[] }
  | { kind: "removed"; clause: Clause; risk: RiskFlag[] }
  | { kind: "changed"; before: Clause; after: Clause; ops: WordOp[]; risk: RiskFlag[] }
  | { kind: "same"; clause: Clause };

export type RiskFlag = { label: string; hint: string };

const HEADING =
  /^\s*(?:madde|md\.?|article)\s*(\d+[a-z]?)\b[\s.:\-–—)]*(.*)$|^\s*(\d{1,2})[.)]\s+(.*)$/i;

export function splitClauses(text: string): Clause[] {
  const lines = text.replace(/\r/g, "").split("\n");
  const clauses: Clause[] = [];
  let current: Clause | null = null;
  const preamble: string[] = [];

  for (const line of lines) {
    const m = line.match(HEADING);
    if (m) {
      if (current) clauses.push(current);
      const num = (m[1] ?? m[3] ?? "").toLowerCase();
      const rest = (m[2] ?? m[4] ?? "").trim();
      current = { key: `m${num}`, title: `Madde ${num}${rest ? ` — ${rest.slice(0, 60)}` : ""}`, body: rest };
      continue;
    }
    if (current) current.body += `${current.body ? "\n" : ""}${line}`;
    else preamble.push(line);
  }
  if (current) clauses.push(current);

  const pre = preamble.join("\n").trim();
  if (pre) clauses.unshift({ key: "giris", title: "Giriş / taraflar", body: pre });

  // Madde başlığı yoksa paragraflara böl
  if (clauses.length <= 1) {
    return text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p, i) => ({ key: `p${i + 1}`, title: `Paragraf ${i + 1}`, body: p }));
  }
  return clauses.map((c) => ({ ...c, body: c.body.trim() }));
}

function tokenize(s: string): string[] {
  return s.split(/(\s+)/).filter((t) => t.length > 0);
}

/** LCS tabanlı kelime farkı. Uzun maddelerde O(n·m) bellek sınırlanır. */
export function diffWords(a: string, b: string): WordOp[] {
  const x = tokenize(a);
  const y = tokenize(b);
  if (x.length * y.length > 400_000) {
    return [
      { type: "del", text: a },
      { type: "add", text: b },
    ];
  }
  const n = x.length;
  const m = y.length;
  const dp: Uint16Array[] = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i]![j] = x[i] === y[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }
  const ops: WordOp[] = [];
  const push = (type: WordOp["type"], text: string) => {
    const last = ops[ops.length - 1];
    if (last && last.type === type) last.text += text;
    else ops.push({ type, text });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (x[i] === y[j]) {
      push("same", x[i]!);
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) {
      push("del", x[i++]!);
    } else {
      push("add", y[j++]!);
    }
  }
  while (i < n) push("del", x[i++]!);
  while (j < m) push("add", y[j++]!);
  return ops;
}

const RISK_RULES: Array<{ re: RegExp; label: string; hint: string }> = [
  { re: /cezai şart|cezai sart|tazminat öde/i, label: "Cezai şart", hint: "Ödeyeceğiniz ceza ya da tazminat tutarı değişmiş olabilir." },
  { re: /artış|artis|zam|tüfe|tufe|endeks|%\s*\d+|\d+\s*%/i, label: "Ücret / artış", hint: "Kira, ücret ya da artış oranı değişmiş. Yasal tavanla karşılaştırın." },
  { re: /fesih|feshet|sona er|tahliye/i, label: "Fesih / tahliye", hint: "Sözleşmenin bitirilme koşulları değişmiş." },
  { re: /depozito|güvence|teminat/i, label: "Depozito / teminat", hint: "Teminat tutarı ya da iade koşulu değişmiş." },
  { re: /rekabet|münhasır|munhasir|gizlilik/i, label: "Rekabet / gizlilik", hint: "Ayrıldıktan sonra sizi bağlayan yükümlülükler değişmiş olabilir." },
  { re: /süre|sure|gün|gun|ay içinde|yıl|yil/i, label: "Süre", hint: "Bir süre ya da son tarih değişmiş. Takviminize ekleyin." },
  { re: /fikri mülkiyet|telif|kaynak kod|devr/i, label: "Hak devri", hint: "Ürettiğiniz işin sahipliği değişmiş olabilir." },
  { re: /yetkili mahkeme|tahkim|icra daire/i, label: "Uyuşmazlık yeri", hint: "Dava açılacak yer ya da yöntem değişmiş." },
];

function riskFlags(text: string): RiskFlag[] {
  return RISK_RULES.filter((r) => r.re.test(text)).map(({ label, hint }) => ({ label, hint }));
}

function normalizeTitle(c: Clause): string {
  return c.title.replace(/^madde\s*\d+[a-z]?\s*—?\s*/i, "").toLocaleLowerCase("tr-TR").trim();
}

export function compareContracts(oldText: string, newText: string): ClauseChange[] {
  const before = splitClauses(oldText);
  const after = splitClauses(newText);
  const used = new Set<number>();
  const changes: ClauseChange[] = [];

  const findMatch = (c: Clause): number => {
    let idx = after.findIndex((a, i) => !used.has(i) && a.key === c.key);
    if (idx === -1) {
      const t = normalizeTitle(c);
      if (t) idx = after.findIndex((a, i) => !used.has(i) && normalizeTitle(a) === t);
    }
    return idx;
  };

  for (const b of before) {
    const idx = findMatch(b);
    if (idx === -1) {
      changes.push({ kind: "removed", clause: b, risk: riskFlags(b.body) });
      continue;
    }
    used.add(idx);
    const a = after[idx]!;
    if (a.body.replace(/\s+/g, " ") === b.body.replace(/\s+/g, " ")) {
      changes.push({ kind: "same", clause: a });
    } else {
      const ops = diffWords(b.body, a.body);
      const changedText = ops.filter((o) => o.type !== "same").map((o) => o.text).join(" ");
      changes.push({ kind: "changed", before: b, after: a, ops, risk: riskFlags(changedText) });
    }
  }
  after.forEach((a, i) => {
    if (!used.has(i)) changes.push({ kind: "added", clause: a, risk: riskFlags(a.body) });
  });
  return changes;
}
