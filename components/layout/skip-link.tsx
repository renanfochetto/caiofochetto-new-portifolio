"use client";

import {useI18n} from "@/components/providers/i18n-provider";

export function SkipLink() {
  const {t} = useI18n();

  return (
    <a
      href="#main-content"
      className="
    sr-only
    focus:not-sr-only
    focus:fixed
    focus:top-4
    focus:left-4
    focus:z-[9999]
    focus:px-4
    focus:py-2
    focus:bg-primary
    focus:text-primary-foreground
    focus:rounded-md
    focus:text-sm
    focus:font-medium
    focus:shadow-xl
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-primary
    focus:transition-all
    focus:duration-200"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
