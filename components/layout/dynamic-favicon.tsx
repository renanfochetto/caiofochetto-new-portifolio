"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";

export function DynamicFavicon() {
  const { theme } = useTheme();

  useEffect(() => {
    // ✅ BUSCAR favicon existente
    let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    // ✅ Se não existe, criar um novo
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      document.head.appendChild(favicon);
    }

    // ✅ ATUALIZAR href (não remover e criar novo)
    const svg = theme === 'dark'
      ? `<svg width="32" height="32" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
          <rect fill="black" width="480" height="480" rx="100"/>
          <path fill="#CAFF00" d="M160.24 367.48C132.507 367.48 110.533 359.8 94.32 344.44C78.1067 328.867 70 306.68 70 277.88V224.12C70 195.32 78.1067 173.24 94.32 157.88C110.533 142.307 132.507 134.52 160.24 134.52C187.76 134.52 208.987 142.093 223.92 157.24C239.067 172.173 246.64 192.76 246.64 219V220.92H205.04V217.72C205.04 204.493 201.307 193.613 193.84 185.08C186.587 176.547 175.387 172.28 160.24 172.28C145.307 172.28 133.573 176.867 125.04 186.04C116.507 195.213 112.24 207.693 112.24 223.48V278.52C112.24 294.093 116.507 306.573 125.04 315.96C133.573 325.133 145.307 329.72 160.24 329.72C175.387 329.72 186.587 325.453 193.84 316.92C201.307 308.173 205.04 297.293 205.04 284.28V278.52H246.64V283C246.64 309.24 239.067 329.933 223.92 345.08C208.987 360.013 187.76 367.48 160.24 367.48ZM281.057 363V139H421.858V177.4H323.298V231.48H414.178V269.88H323.298V363H281.057Z"/>
        </svg>`
      : `<svg width="32" height="32" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
          <rect fill="white" width="480" height="480" rx="100"/>
          <path fill="#FF0077" d="M160.24 367.48C132.507 367.48 110.533 359.8 94.32 344.44C78.1067 328.867 70 306.68 70 277.88V224.12C70 195.32 78.1067 173.24 94.32 157.88C110.533 142.307 132.507 134.52 160.24 134.52C187.76 134.52 208.987 142.093 223.92 157.24C239.067 172.173 246.64 192.76 246.64 219V220.92H205.04V217.72C205.04 204.493 201.307 193.613 193.84 185.08C186.587 176.547 175.387 172.28 160.24 172.28C145.307 172.28 133.573 176.867 125.04 186.04C116.507 195.213 112.24 207.693 112.24 223.48V278.52C112.24 294.093 116.507 306.573 125.04 315.96C133.573 325.133 145.307 329.72 160.24 329.72C175.387 329.72 186.587 325.453 193.84 316.92C201.307 308.173 205.04 297.293 205.04 284.28V278.52H246.64V283C246.64 309.24 239.067 329.933 223.92 345.08C208.987 360.013 187.76 367.48 160.24 367.48ZM281.057 363V139H421.858V177.4H323.298V231.48H414.178V269.88H323.298V363H281.057Z"/>
        </svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // ✅ REVOGAR URL antigo antes de criar novo
    if (favicon.href && favicon.href.startsWith('blob:')) {
      URL.revokeObjectURL(favicon.href);
    }

    // ✅ ATUALIZAR href
    favicon.href = url;

    // ✅ Cleanup: revogar quando componente desmontar
    return () => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    };
  }, [theme]);

  return null;
}
