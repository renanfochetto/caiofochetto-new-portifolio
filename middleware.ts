// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Redirect root to /pt (default locale)
  if (pathname === '/') {
    const url = new URL('/pt', request.url)
    url.search = search // Preserve query params
    return NextResponse.redirect(url, 308) // Permanent redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
