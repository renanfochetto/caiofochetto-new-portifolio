"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "../ui/language-switcher";

export function Header() {
  const { locale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.paddingRight = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.paddingRight = "";
      }
    };
  }, [menuOpen]);

  const navItems = [
    { label: t.header.work, href: `/${locale}#work` },
    { label: t.header.experience, href: `/${locale}#experience` },
    { label: t.header.about, href: `/${locale}#about` },
    { label: t.header.contact, href: `/${locale}#contact` },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-neutral-600 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors duration-200 hover:text-primary active:scale-95"
        >
          CAIO FOCHETTO<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-muted-foreground transition-colors hover:text-primary active:scale-95"
            >
              {item.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="
              flex items-center justify-center gap-1.5 
              rounded-full 
              border border-neutral-600
              hover:border-primary
              active:scale-95
              px-2.5 py-1
              min-w-[44px]
              text-xs
              text-muted-foreground
              hover:text-primary
              transition-all duration-200
              bg-card
            "
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Language switcher */}
          <LanguageSwitcher variant="desktop" />
        </div>

        {/* Mobile - apenas hamburguer */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative h-10 w-10 text-foreground flex items-center justify-center transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-0 right-0 top-14 z-40 bg-background md:hidden"
            style={{ height: 'calc(100vh - 3.5rem)' }}
          >
            <div className="flex h-full flex-col items-center justify-between px-6 py-16">
              {/* Navigation links */}
              <div className="flex flex-col gap-6 text-center">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-bold text-foreground transition-all duration-200 hover:text-primary active:text-primary/80 active:scale-90"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Theme and language toggles */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                className="flex flex-col items-center gap-8 border-t border-neutral-600 pt-16 w-full"
              >
                {/* Language switcher */}
                <div className="flex justify-center w-full">
                  <LanguageSwitcher variant="mobile" />
                </div>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="
                    flex items-center justify-center gap-2
                    rounded-full 
                    border border-neutral-600
                    hover:border-primary
                    active:scale-95
                    px-6 py-2.5
                    text-sm font-medium 
                    text-muted-foreground
                    hover:text-primary
                    transition-all duration-200
                    bg-card
                  "
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
