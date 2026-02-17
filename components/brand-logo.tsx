// components/brand-logo.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BrandLogoProps {
  brandLogo: string;   // e.g. "budweiser"
  brand: string;       // e.g. "Budweiser" (para alt text)
  width?: number;
  height?: number;
}

export function BrandLogo({ brandLogo, brand, width = 128, height = 64 }: BrandLogoProps) {
  const [logoFolder, setLogoFolder] = useState("white"); // default white (dark mode)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      const html = document.documentElement;
      const hasDarkClass = html.classList.contains("dark");
      const dataTheme = html.getAttribute("data-theme");
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const isDarkBg = bodyBg === "rgb(0, 0, 0)" || bodyBg === "rgb(10, 10, 10)";

      const isDark = hasDarkClass || dataTheme === "dark" || isDarkBg;
      setLogoFolder(isDark ? "white" : "black");
    };

    // Check inicial com delay para garantir DOM pronto
    setTimeout(checkTheme, 50);

    // Observer para mudanças de tema em tempo real
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    // Durante SSR/hidratação: espaço reservado sem imagem (evita flash)
    return <div style={{ width, height }} />;
  }

  return (
    <div className="flex items-center justify-start" style={{ width, height }}>
      <Image
        src={`/logos/${logoFolder}/${brandLogo}.svg`}
        alt={`${brand} logo`}
        width={width}
        height={height}
        className="h-full w-auto max-w-full object-contain object-left"
        unoptimized
      />
    </div>
  );
}