"use client";

import { m } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";
import { TrendingUp, Film } from "@/lib/icons";
import { springTransitions } from "@/hooks/use-animation";
import { trackWorkToggle } from "@/lib/analytics/track";

type WorkView = "performance" | "production";

interface WorkToggleProps {
  value: WorkView;
  onChange: (view: WorkView) => void;
}

export function WorkToggle({ value, onChange }: WorkToggleProps) {
  const { t } = useI18n();

  const handleChange = (newView: WorkView) => {
    if (newView !== value) {
      trackWorkToggle(newView);
    }
    onChange(newView);
  };

  return (
    <div className="flex justify-center mb-12">
      <div className="relative inline-flex items-center gap-1 rounded-full border border-neutral-600 bg-card p-1">
        {/* Botão Performance */}
        <button
          onClick={() => handleChange("performance")}
          className={`
            relative
            inline-flex items-center justify-center gap-2
            rounded-full 
            px-6 py-2.5 
            text-xs sm:text-sm font-medium 
            transition-colors duration-200
            min-w-[130px] sm:min-w-[140px]
            ${
            value === "performance"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-primary"
          }
          `}
          aria-pressed={value === "performance"}
          aria-label={t.work.ariaPerformance}
        >
          {value === "performance" && (
            <m.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-primary/90"
              transition={springTransitions.smooth}
            />
          )}
          <TrendingUp className="relative z-10 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="relative z-10 whitespace-nowrap">{t.work.togglePerformance}</span>
        </button>

        {/* Botão Production */}
        <button
          onClick={() => handleChange("production")}
          className={`
            relative
            inline-flex items-center justify-center gap-2
            rounded-full 
            px-6 py-2.5 
            text-xs sm:text-sm font-medium 
            transition-colors duration-200
            min-w-[130px] sm:min-w-[140px]
            ${
            value === "production"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-primary"
          }
          `}
          aria-pressed={value === "production"}
          aria-label={t.work.ariaProduction}
        >
          {value === "production" && (
            <m.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-primary/90"
              transition={springTransitions.smooth}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">{t.work.toggleProduction}</span>
          <Film className="relative z-10 h-4 w-4 flex-shrink-0" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
