// hooks/use-animation.tsx
"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function useCounter(
  value: number,
  duration: number = 2,
  decimals: number = 0
) {
  const count = useMotionValue(0);

  const formatted = useTransform(count, (latest) => {
    if (decimals > 0) {
      return parseFloat(latest.toFixed(decimals));
    }
    return Math.round(latest);
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const shouldReduce = prefersReducedMotion();

    if (shouldReduce) {
      setDisplayValue(value);
      return;
    }

    const animation = animate(count, value, {
      duration: duration,
      ease: "easeOut",
    });

    const unsubscribe = formatted.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, duration, decimals, count, formatted]);

  return displayValue;
}

// Animation variants
export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

// Spring transitions (reutilizáveis)
export const springTransitions = {
  // Suave e rápido (botões, toggles)
  smooth: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },

  // Mais quique (elementos leves)
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20,
  },

  // Muito suave (elementos pesados)
  soft: {
    type: "spring" as const,
    stiffness: 200,
    damping: 40,
  },
};
