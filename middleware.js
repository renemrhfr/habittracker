import { NextResponse } from 'next/server';

export async function middleware(request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`, {
    headers: {
      cookie: request.headers.get('cookie'),
    },
  });
  if (!res.ok) {
    return NextResponse.redirect(new URL('/login-form', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};