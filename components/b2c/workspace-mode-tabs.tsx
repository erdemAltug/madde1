"use client";

import { cn } from "@/lib/utils";

export type WorkspaceMode = "analyze" | "create";

type Props = {
  mode: WorkspaceMode;
  onModeChange: (m: WorkspaceMode) => void;
  disabled?: boolean;
};

export function WorkspaceModeTabs({ mode, onModeChange, disabled }: Props) {
  const tabs: { id: WorkspaceMode; label: string }[] = [
    { id: "analyze", label: "Sözleşme analizi" },
    { id: "create", label: "Sözleşme oluştur" },
  ];
  return (
    <div
      role="tablist"
      className="flex w-full gap-1 rounded-lg border border-slate-200 bg-slate-100/80 p-1 sm:inline-flex"
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={mode === t.id}
          disabled={disabled}
          onClick={() => onModeChange(t.id)}
          className={cn(
            "min-h-11 flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors sm:flex-none sm:px-4",
            mode === t.id
              ? "bg-white text-madde-blue shadow-sm"
              : "text-slate-600 hover:text-slate-900",
            disabled && "opacity-50",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
