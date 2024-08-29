import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return response;
}

export const config = {
  matcher: '/app/form/:path*',
};
