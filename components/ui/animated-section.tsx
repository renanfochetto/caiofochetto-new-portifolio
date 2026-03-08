"use client";

import { ReactNode } from "react";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUpVariants,
  containerVariants,
  heroVariants,
  prefersReducedMotion
} from "@/hooks/use-animation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  hero?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  staggerChildren = false,
  hero = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const shouldReduce = prefersReducedMotion();

  const variants = hero
    ? heroVariants
    : staggerChildren
      ? containerVariants
      : fadeInUpVariants;

  if (shouldReduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </m.div>
  );
}

// Componente para itens individuais dentro de uma seção animada
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function AnimatedItem({
  children,
  className = "",
  index = 0,
}: AnimatedItemProps) {
  const shouldReduce = prefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      custom={index}
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </m.div>
  );
}
