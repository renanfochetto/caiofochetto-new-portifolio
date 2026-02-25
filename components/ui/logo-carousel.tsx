"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../providers/theme-provider";

const logos = [
  { name: "ae", alt: "A+E Networks" },
  { name: "ambev", alt: "Ambev" },
  { name: "betfair", alt: "Betfair" },
  { name: "budweiser", alt: "Budweiser" },
  { name: "formulae", alt: "Formula E" },
  { name: "history", alt: "History Channel" },
  { name: "jellysmack", alt: "Jellysmack" },
  { name: "lifetime", alt: "Lifetime" },
  { name: "octagon", alt: "Octagon" },
  { name: "netflix", alt: "Netflix" },
  { name: "natura", alt: "Natura" },
  { name: "havaianas", alt: "Havaianas" },
  { name: "playground", alt: "Playground" },
  { name: "bohemia", alt: "Bohemia" },
  { name: "nestle", alt: "Nestlé" },
];

export function LogoCarousel() {
  const { theme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const duplicatedLogos = [...logos, ...logos];
  const logoFolder = theme === "dark" ? "white" : "black";

  if (!mounted) {
    return (
      <div className="border-t border-neutral-600 pt-6">
        <div className="relative overflow-hidden" style={{ height: "64px" }} />
      </div>
    );
  }

  return (
    <div className="border-t border-neutral-600 pt-6">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max items-center"
          animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
          transition={
            prefersReducedMotion
              ? {}
              : {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }
          }
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="relative flex-shrink-0 transition-opacity duration-300 mx-6 md:mx-10"
              style={{
                opacity: 0.65,
                width: "120px",
                height: "64px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
            >
              <Image
                src={`/logos/${logoFolder}/${logo.name}.svg`}
                alt={logo.alt}
                fill
                className="object-contain object-center"
                unoptimized
                priority={idx < 15}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient fade nas extremidades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
}
