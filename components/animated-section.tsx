"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUpVariants, containerVariants, prefersReducedMotion } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  staggerChildren = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const shouldReduce = prefersReducedMotion();

  const variants = staggerChildren ? containerVariants : fadeInUpVariants;

  if (shouldReduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    <motion.div
      custom={index}
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
