export type RagHitType = "kanun_maddesi" | "emsal_karar" | "hukuki_not";

export type RagHit = {
  id: string;
  type: RagHitType;
  content: string;
  category?: string | null;
  source?: string | null;
  similarity: number;
  metadata?: Record<string, unknown> | null;
  /** UI / prompt atıf etiketi — örn. TBK m.344 veya Emsal #ab12 */
  citeLabel: string;
  /** metadata madde eşleşmesi vektör skorunun önüne geçer */
  exact?: boolean;
};

export type LegalGrounding = {
  hits: RagHit[];
  groundingBlock: string;
  allowedCites: string[];
  retrieved: boolean;
};
