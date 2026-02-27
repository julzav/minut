import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  if (!session) {
    const signIn = new URL('/sign-in', request.url);
    signIn.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/room/:path*'] };
