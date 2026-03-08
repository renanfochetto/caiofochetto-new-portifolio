// app/[locale]/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/types';

export default function LocaleError({
                                      error,
                                      reset,
                                    }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'pt';

  const messages = {
    pt: {
      title: 'Algo deu errado',
      description: 'Desculpe, encontramos um erro inesperado.',
      retry: 'Tentar novamente',
      home: 'Voltar ao início',
    },
    en: {
      title: 'Something went wrong',
      description: 'Sorry, we encountered an unexpected error.',
      retry: 'Try again',
      home: 'Back to home',
    },
    es: {
      title: 'Algo salió mal',
      description: 'Lo sentimos, encontramos un error inesperado.',
      retry: 'Intentar de nuevo',
      home: 'Volver al inicio',
    },
  };

  const t = messages[locale];

  useEffect(() => {
    console.error(`Locale error (${locale}):`, error);
  }, [error, locale]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          {t.title}
        </h1>
        <p className="mb-6 text-muted-foreground">
          {t.description}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.retry}
          </button>

          <Link
            href={`/${locale}`}
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
