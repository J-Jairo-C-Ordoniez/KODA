import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { apiMiddleware } from '@/middlewares/api.middleware';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.match(/^\/api\/[^/]+\/(sales|customers|employees|settings|catalog|variants|inventory)/)) {
    const result = await apiMiddleware(req);
    if (result) return result;
  }

  if (pathname.startsWith('/dashboard')) {
    return (authMiddleware as any)(req);
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
