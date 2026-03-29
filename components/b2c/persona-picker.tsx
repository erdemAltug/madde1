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
    <div className="space-y-3">
      <p className="text-lg font-semibold text-slate-700">
        Analizi Senin İçin Özelleştirelim (Kimsin?)
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(p.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-all flex items-start gap-3",
                value === p.id
                  ? "border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50"
                  : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm",
                disabled && "pointer-events-none opacity-50",
              )}
            >
              <div className={cn(
                "shrink-0 p-2 rounded-lg",
                value === p.id ? "bg-indigo-100" : "bg-slate-100"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  value === p.id ? "text-indigo-600" : "text-slate-600"
                )} />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">{p.label}</span>
                <span className="text-xs text-slate-500 font-medium">{p.hint}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
