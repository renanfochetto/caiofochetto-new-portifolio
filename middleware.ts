import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Se estiver na raiz, fazer rewrite silencioso para /pt
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/pt', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Executar apenas na raiz
  matcher: ['/'],
};
