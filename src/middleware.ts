import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardPath = path.startsWith('/accounts/dashboard');
  const isProblemPath = path.startsWith('/accounts/problems');
  const isPublicPath = path === '/accounts/signIn' || path === '/accounts/signUp';
  const isProtectedPath = isDashboardPath || isProblemPath;
  const token = request.cookies.get(process.env.TOKEN_NAME!)?.value || '';

  if (isProtectedPath && !token) {
    // If trying to access protected paths without a token, redirect to sign-in
    return NextResponse.redirect(new URL('/accounts/signIn', request.nextUrl));
  }

  if (isPublicPath && token) {
    // If trying to access sign-in/sign-up with a token, redirect to dashboard
    return NextResponse.redirect(new URL(`/accounts/dashboard`, request.nextUrl));
  }
}


export const config = {
  matcher: [
    '/accounts/dashboard/:path*',
    '/accounts/problems/:path*',
    '/accounts/signIn',
    '/accounts/signUp',
  ],
}