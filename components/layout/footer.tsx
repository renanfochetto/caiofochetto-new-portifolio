"use client";

import { useI18n } from "@/context/i18n-provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-neutral-600 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-row flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 text-xs text-muted-foreground">
          <p className="text-xs">&copy; {new Date().getFullYear()} Caio Fochetto.</p>
          <p className="text-xs">
            {t.footer.developedBy}{" "}
            <a
              href="https://renanfochetto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 transition-colors hover:text-primary"
            >
              Renan Fochetto
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
