"use client";

import {useI18n} from "@/components/providers/i18n-provider";
import { trackEmailClick } from "@/lib/analytics/track";

export function Footer() {
  const {t} = useI18n();
  const handleEmailClick = () => {
    trackEmailClick('footer');
  }

  return (
    <footer className="border-t border-neutral-600 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col min-[460px]:flex-row min-[460px]:justify-between items-center gap-3 min-[460px]:gap-2 sm:gap-4 text-xs text-muted-foreground">
          {/* Email do Caio */}
          <a
            href="mailto:caiofochetto@gmail.com"
            onClick={handleEmailClick}
            className="text-xs text-foreground/70 transition-colors hover:text-primary active:scale-95"
          >
            caiofochetto@gmail.com
          </a>

          {/* Desenvolvido por */}
          <p className="text-xs">
            {t.footer.developedBy}{" "}
            <a
              href="https://renanfochetto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 transition-colors hover:text-primary active:scale-95"
            >
              Renan Fochetto
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
