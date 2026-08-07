import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// ─── Route classification ──────────────────────────────────────────────────────
// Tenant-scoped private API routes (require valid JWT + inject context headers)
const TENANT_API_REGEX = /^\/api\/[^/]+\/(sales|customers|employees|settings|catalog|variants)/;

// Dashboard BFF routes (require valid JWT)
const DASHBOARD_API_REGEX = /^\/api\/dashboard/;

// Super-admin routes (require valid JWT + superAdmin role)
const ADMIN_API_REGEX = /^\/api\/(tenants|subscriptions|plans)(\/|$)/;

// Security headers applied to every proxied response
function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '0');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  res.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  return res;
}

function unauthorized(message = 'No autorizado'): NextResponse {
  const res = NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
  return applySecurityHeaders(res);
}

function forbidden(message = 'Acceso denegado'): NextResponse {
  const res = NextResponse.json(
    { success: false, error: message },
    { status: 403 }
  );
  return applySecurityHeaders(res);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ─── Tenant-scoped private API ─────────────────────────────────────────────
  if (TENANT_API_REGEX.test(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return unauthorized();

    const res = NextResponse.next();
    // Inject verified identity headers for downstream route handlers
    res.headers.set('x-tenant-id', (token.tenantId as string) ?? '');
    res.headers.set('x-user-id', (token.sub as string) ?? '');
    res.headers.set('x-user-role', (token.role as string) ?? '');
    res.headers.set('Cache-Control', 'no-store');
    return applySecurityHeaders(res);
  }

  // ─── Dashboard BFF routes ──────────────────────────────────────────────────
  if (DASHBOARD_API_REGEX.test(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return unauthorized();

    const res = NextResponse.next();
    res.headers.set('x-user-id', (token.sub as string) ?? '');
    res.headers.set('x-user-role', (token.role as string) ?? '');
    res.headers.set('x-tenant-id', (token.tenantId as string) ?? '');
    res.headers.set('Cache-Control', 'no-store');
    return applySecurityHeaders(res);
  }

  // ─── Super-admin restricted API ───────────────────────────────────────────
  // Only superAdmin can access tenants/subscriptions/plans mutation endpoints
  if (ADMIN_API_REGEX.test(pathname) && req.method !== 'GET') {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return unauthorized();
    if (token.role !== 'superAdmin') return forbidden();

    const res = NextResponse.next();
    res.headers.set('x-user-id', (token.sub as string) ?? '');
    res.headers.set('x-user-role', (token.role as string) ?? '');
    res.headers.set('Cache-Control', 'no-store');
    return applySecurityHeaders(res);
  }

  // ─── Dashboard UI redirect ─────────────────────────────────────────────────
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
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
          return NextResponse.redirect(new URL('/dashboard/business', req.url));
        case 'employee':
          return NextResponse.redirect(new URL('/dashboard/employee/sales', req.url));
        default:
          return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  // ─── All other routes: apply security headers and pass through ─────────────
  const res = NextResponse.next();
  return applySecurityHeaders(res);
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
    '/api/dashboard/:path*',
    '/api/tenants/:path*',
    '/api/subscriptions/:path*',
    '/api/plans/:path*',
  ],
};
