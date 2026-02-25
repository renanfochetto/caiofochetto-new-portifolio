"use client";

import { useCounter, prefersReducedMotion } from "@/hooks/use-animation";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter - Anima números ao entrar na viewport
 * 
 * Suporta:
 * - Numbers: 634, 75, 7.5
 * - Strings: "+634%", "75M+", "7.5%", "1M+", "-15%"
 */
export function AnimatedCounter({
  value,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasStarted(true);
    }
  }, [isInView]);

  // Parse da string para extrair número, prefixo e sufixo
  const parseValue = (val: string | number) => {
    // Se já for number, retorna direto
    if (typeof val === "number") {
      return { number: val, prefix: "", suffix: "", decimals: 0 };
    }

    // Parse de string
    const cleaned = val.trim();

    // Detectar prefixo (+ ou -)
    const prefix = cleaned.startsWith("+") ? "+" : cleaned.startsWith("-") ? "-" : "";

    // Detectar sufixo (%, M+, K+, etc)
    const suffixMatch = cleaned.match(/([%MKmk]\+?|[A-Za-z]+)$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";

    // Extrair número (com decimais)
    const numberMatch = cleaned.match(/[\d,.]+/);
    if (!numberMatch) return { number: 0, prefix, suffix, decimals: 0 };

    const numberStr = numberMatch[0].replace(/,/g, "");
    const number = parseFloat(numberStr);

    // Contar decimais
    const decimals = numberStr.includes(".")
      ? numberStr.split(".")[1].length
      : 0;

    return { number, prefix, suffix, decimals };
  };

  const { number, prefix, suffix, decimals } = parseValue(value);

  // ✅ Passar decimals para o useCounter
  const displayNumber = useCounter(hasStarted ? number : 0, duration, decimals);
  const shouldReduce = prefersReducedMotion();

  // Formatar com decimais corretos
  const formattedNumber = decimals > 0
    ? (shouldReduce ? number : displayNumber).toFixed(decimals)
    : Math.floor(shouldReduce ? number : displayNumber).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
