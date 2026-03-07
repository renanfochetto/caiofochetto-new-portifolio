import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".light"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
      },
      fontFamily: {
        // ✅ ATUALIZADO - Self-hosted fonts
        display: ['Fraunces', 'serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display - Hero e Títulos Muito Grandes
        "display-3xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2xl": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],

        // Heading - Títulos Médios (h1-h4)
        "h1": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h2": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3": ["1.25rem", { lineHeight: "1.3", fontWeight: "700" }],
        "h4": ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],

        // Body - Corpo de Texto
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-base": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body-xs": ["0.75rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
