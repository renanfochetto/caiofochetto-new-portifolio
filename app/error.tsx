// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (can send to monitoring service)
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Algo deu errado
        </h1>
        <p className="mb-6 text-muted-foreground">
          Desculpe, encontramos um erro inesperado. Nossa equipe já foi notificada.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Voltar ao início
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              Detalhes do erro (dev only)
            </summary>
            <pre className="mt-2 text-xs bg-muted p-4 rounded overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
