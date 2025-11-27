import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/profile'];
const authRoutes = ['/auth'];

export async function proxy(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  // const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // const token = (await cookies()).get('accessToken')?.value;
  // const decoded = jwtDecode(token || '');
  // console.log(decoded);

  // Redirect to login if accessing protected page without token
  // if (isProtectedRoute && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Redirect to dashboard if accessing auth pages with valid token
  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIn0.Z3-t9JoZZvXQ3e9JbfZDsY2K3udXT_eQcKr0v8YM20I';
// const cookieStore = await cookies();
// cookieStore.set('accessToken', token, {
//   httpOnly: true,
//   secure: true,
//   expires: expiresAt,
//   sameSite: 'lax',
//   path: '/',
// });
