import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PRIVATE_API_REGEX = /^\/api\/[^/]+\/(sales|customers|employees|settings|catalog|variants)/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (PRIVATE_API_REGEX.test(pathname)) {
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    const res = NextResponse.next();
    res.headers.set('x-tenant-id', (token.tenantId as string) ?? '');
    res.headers.set('x-user-id', (token.sub as string) ?? '');
    res.headers.set('x-user-role', (token.role as string) ?? '');
    return res;
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === '/dashboard') {
      switch (token.role as string) {
        case 'superAdmin':
          return NextResponse.redirect(new URL('/dashboard/admin/metrics', req.url));
        case 'admin':
        case 'owner':
          return NextResponse.redirect(new URL('/dashboard/business', req.url));
        case 'employee':
          return NextResponse.redirect(new URL('/dashboard/employee/sales', req.url));
        default:
          return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:tenantId/sales/:path*',
    '/api/:tenantId/customers/:path*',
    '/api/:tenantId/employees/:path*',
    '/api/:tenantId/settings/:path*',
    '/api/:tenantId/catalog/:path*',
    '/api/:tenantId/variants/:path*',
  ],
};
