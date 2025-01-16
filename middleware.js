import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if the current path starts with "/admin"
  const isAdminRoute = pathname.startsWith('/admin');

  // Add the admin status to headers
  const response = NextResponse.next();
  response.headers.set('is-admin-route', isAdminRoute ? 'true' : 'false');

  return response;
}
