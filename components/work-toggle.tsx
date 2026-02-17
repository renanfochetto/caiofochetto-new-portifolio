"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type WorkView = "performance" | "production";

interface WorkToggleProps {
  value: WorkView;
  onChange: (view: WorkView) => void;
}

export function WorkToggle({ value, onChange }: WorkToggleProps) {
  const { locale } = useI18n();

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-600 bg-card p-1">
        <button
          onClick={() => onChange("performance")}
          className={`
            rounded-full px-6 py-2.5 text-sm font-medium 
            transition-all duration-200
            ${
              value === "performance"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
          aria-pressed={value === "performance"}
          aria-label={
            locale === "pt"
              ? "Ver cases de performance"
              : "View performance cases"
          }
        >
          {locale === "pt" ? "Performance" : "Performance"}
        </button>
        
        <button
          onClick={() => onChange("production")}
          className={`
            rounded-full px-6 py-2.5 text-sm font-medium 
            transition-all duration-200
            ${
              value === "production"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
          aria-pressed={value === "production"}
          aria-label={
            locale === "pt"
              ? "Ver cases de produção"
              : "View production cases"
          }
        >
          {locale === "pt" ? "Produção" : "Production"}
        </button>
      </div>
    </div>
  );
}
