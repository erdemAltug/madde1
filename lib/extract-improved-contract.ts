/** # 🟢 İyileştirilmiş Versiyon başlığından sonraki gövdeyi ayıkla */
export function extractImprovedContractSection(markdown: string): string | null {
  const re =
    /#\s*🟢\s*İyileştirilmiş\s*Versiyon[^\n]*\n([\s\S]*?)(?=\n#\s*[^#]|\n##\s|$)/i;
  const m = markdown.match(re);
  if (m?.[1]) return m[1].trim();
  const loose = /#\s*🟢[^\n]*\n([\s\S]+)/i.exec(markdown);
  return loose?.[1]?.trim() ?? null;
}
