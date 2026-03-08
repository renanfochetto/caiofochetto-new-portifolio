// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['pt', 'en', 'es'] as const;
const defaultLocale = 'pt';

function getPreferredLocale(request: NextRequest): string {
  // 1. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // Parse: "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, qValue] = lang.split(';');
        const locale = code.trim().split('-')[0]; // en-US → en
        const quality = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0;
        return { locale, quality };
      })
      .sort((a, b) => b.quality - a.quality); // Sort by quality

    // Find first supported locale
    for (const { locale } of languages) {
      if (locales.includes(locale as any)) {
        return locale;
      }
    }
  }

  // 2. Fallback to default
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if already has locale or is static file
  if (
    locales.some(locale => pathname.startsWith(`/${locale}`)) ||
    pathname.includes('.') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Root path → detect and redirect
  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon|images|fonts|logos).*)',
  ],
};
