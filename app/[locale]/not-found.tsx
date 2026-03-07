"use client";

import Link from "next/link";
import { ArrowLeft } from "@/lib/icons";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  const locale = pathname?.split('/')[1] || 'pt';

  const texts = {
    pt: {
      code: "404",
      title: "Página não encontrada",
      description: "A página que você está procurando não existe.",
      button: "Voltar para Home"
    },
    en: {
      code: "404",
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      button: "Back to Home"
    },
    es: {
      code: "404",
      title: "Página no encontrada",
      description: "La página que buscas no existe.",
      button: "Volver al Inicio"
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.pt;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-background text-foreground">
      {/* ✅ MUDANÇA: font-mono → font-heading */}
      <p className="font-heading text-6xl font-bold text-primary tracking-wider">
        {t.code}
      </p>
      <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-2 text-base text-muted-foreground md:text-lg">
        {t.description}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.button}
      </Link>
    </div>
  );
}
