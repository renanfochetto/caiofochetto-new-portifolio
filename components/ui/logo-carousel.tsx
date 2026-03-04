"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../providers/theme-provider";
import {  useI18n } from "@/components/providers/i18n-provider";

const logos = [
  { name: "playstation", alt: "Logo PlayStation" },
  { name: "coca-cola", alt: "Logo Coca-Cola" },
  { name: "havaianas", alt: "Logo Havaianas" },
  { name: "netflix", alt: "Logo Netflix" },
  { name: "epic-games", alt: "Logo Epic Games" },
  { name: "fortnite", alt: "Logo Fortnite" },
  { name: "natura", alt: "Logo Natura" },
  { name: "nestle", alt: "Logo Nestlé" },
  { name: "powerade", alt: "Logo Powerade", scale: 1.2 },
  { name: "bohemia", alt: "Logo Bohemia" },
  { name: "budweiser", alt: "Logo Budweiser" },
  { name: "michelob", alt: "Logo Michelob", scale: 1.5 },
  { name: "ambev", alt: "Logo Ambev" },
  { name: "gatorade", alt: "Logo Gatorade", scale: 1.3 },
  { name: "betfair", alt: "Logo Betfair" },
  { name: "ufc", alt: "Logo UFC" },
  { name: "puma", alt: "Logo Puma" },
  { name: "fia", alt: "Logo FIA" },
  { name: "formulae", alt: "Logo Formula E" },
  { name: "neve", alt: "Logo Neve" },
  { name: "intimus", alt: "Logo Íntimus" },
  { name: "kimberly-clark", alt: "Logo Kimberly Clark", scale: 1.5 },
  { name: "sony", alt: "Logo Sony" },
  { name: "cultura", alt: "Logo TV Cultura", scale: 1.2 },
  { name: "record", alt: "Logo Rede Record", scale: 1.2 },
  { name: "history", alt: "Logo History Channel" },
  { name: "ae", alt: "Logo A&E" },
  { name: "lifetime", alt: "Logo Lifetime" },
  { name: "facebook", alt: "Logo Facebook" },
  { name: "globo", alt: "Logo Rede Globo" },
];

export function LogoCarousel() {
  const { theme } = useTheme();
  const { t } = useI18n();
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
      <div
        className="relative overflow-hidden"
        role="region"
        aria-label={t.footer.carouselLabel}
      >
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
