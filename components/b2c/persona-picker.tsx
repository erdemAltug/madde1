"use client";

import { cn } from "@/lib/utils";
import { PERSONAS, type PersonaId } from "@/lib/personas";

type Props = {
  value: PersonaId | null;
  onChange: (p: PersonaId) => void;
  disabled?: boolean;
};

export function PersonaPicker({ value, onChange, disabled }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900">Kimsin?</p>
      <p className="text-xs text-slate-600">
        Analizi senin durumuna göre kişiselleştirelim — ağır hukuk dili yok.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(p.id)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              value === p.id
                ? "border-madde-blue bg-madde-blue/[0.06] text-slate-900 ring-1 ring-madde-blue"
                : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            <span className="font-semibold">{p.label}</span>
            <span className="mt-0.5 block text-xs font-normal text-slate-600">
              {p.hint}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
