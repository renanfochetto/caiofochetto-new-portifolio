"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ✅ DEFAULT: SEMPRE DARK (não importa preferência do sistema)
  const [theme, setTheme] = useState<Theme>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // ✅ Verificar APENAS localStorage (ignora prefers-color-scheme)
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    // Se tem preferência salva, usa ela. Senão, mantém dark.
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      applyTheme(theme);
    }
  }, [theme, isMounted]);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;
    if (newTheme === "light") {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
