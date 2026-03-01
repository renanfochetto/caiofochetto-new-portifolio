"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../providers/theme-provider";

const logos = [
  { name: "playstation", alt: "PlayStation" },
  { name: "coca-cola", alt: "Coca-Cola" },
  { name: "havaianas", alt: "Havaianas" },
  { name: "netflix", alt: "Netflix" },
  { name: "epic-games", alt: "Epic Games" },
  { name: "fortnite", alt: "Fortnite" },
  { name: "natura", alt: "Natura" },
  { name: "nestle", alt: "Nestlé" },
  { name: "powerade", alt: "Powerade", scale: 1.2 },
  { name: "bohemia", alt: "Bohemia" },
  { name: "budweiser", alt: "Budweiser" },
  { name: "michelob", alt: "Michelob", scale: 1.5 },
  { name: "ambev", alt: "Ambev" },
  { name: "gatorade", alt: "Gatorade", scale: 1.3 },
  { name: "betfair", alt: "Betfair" },
  { name: "ufc", alt: "UFC" },
  { name: "puma", alt: "Puma" },
  { name: "fia", alt: "FIA" },
  { name: "formulae", alt: "Formula E" },
  { name: "neve", alt: "Neve" },
  { name: "intimus", alt: "Íntimus" },
  { name: "kimberly-clark", alt: "Kimberly Clark", scale: 1.5 },
  { name: "sony", alt: "Sony" },
  { name: "cultura", alt: "TV Cultura", scale: 1.2 },
  { name: "record", alt: "Rede Record", scale: 1.2 },
  { name: "history", alt: "History Channel" },
  { name: "ae", alt: "A&E" },
  { name: "lifetime", alt: "Lifetime" },
  { name: "facebook", alt: "Facebook" },
  { name: "globo", alt: "Rede Globo" },
];

export function LogoCarousel() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 150,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="relative flex-shrink-0 transition-opacity duration-300 mx-8 md:mx-12"
              style={{
                opacity: 0.65,
                width: "120px",
                height: "64px",
                transform: logo.scale ? `scale(${logo.scale})` : "none",
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
