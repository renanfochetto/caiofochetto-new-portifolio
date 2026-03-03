"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";
import { TrendingUp, Film } from "lucide-react";
import { springTransitions } from "@/hooks/use-animation";

type WorkView = "performance" | "production";

interface WorkToggleProps {
  value: WorkView;
  onChange: (view: WorkView) => void;
}

export function WorkToggle({ value, onChange }: WorkToggleProps) {
  const { t } = useI18n();

  return (
    <div className="flex justify-center mb-12">
      <div className="relative inline-flex items-center gap-1 rounded-full border border-neutral-600 bg-card p-1">
        {/* Botão Performance */}
        <button
          onClick={() => onChange("performance")}
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
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-primary/90"
              transition={springTransitions.smooth}
            />
          )}
          <TrendingUp className="relative z-10 h-4 w-4 flex-shrink-0" />
          <span className="relative z-10 whitespace-nowrap">{t.work.togglePerformance}</span>
        </button>

        {/* Botão Production */}
        <button
          onClick={() => onChange("production")}
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
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-primary/90"
              transition={springTransitions.smooth}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">{t.work.toggleProduction}</span>
          <Film className="relative z-10 h-4 w-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
