import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// ─── Types ─────────────────────────────────────────────────────────────────────
export type AppRole = 'superAdmin' | 'admin' | 'employee';

export interface TenantContext {
  tenantId: string;
  userId: string;
  role: AppRole;
}

// ─── Security headers added to every API response ─────────────────────────────
export function secureHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '0');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

// ─── Read identity injected by proxy.ts ───────────────────────────────────────
// Used by routes under /api/[tenantId]/* that are already guarded by proxy
export function getTenantContext(req: NextRequest): TenantContext {
  return {
    tenantId: req.headers.get('x-tenant-id') ?? '',
    userId:   req.headers.get('x-user-id') ?? '',
    role:     (req.headers.get('x-user-role') ?? '') as AppRole,
  };
}

// ─── Read session for routes outside tenant scope (dashboard, superAdmin) ─────
// Used by routes under /api/dashboard/* and /api/plans|tenants|subscriptions
export async function getSessionContext(): Promise<TenantContext | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return {
    tenantId: session.user.tenantId ?? '',
    userId:   session.user.id ?? '',
    role:     session.user.role as AppRole,
  };
}

// ─── Guard helpers ─────────────────────────────────────────────────────────────
export function requireTenantContext(ctx: TenantContext): NextResponse | null {
  if (!ctx.tenantId || !ctx.userId) {
    return secureHeaders(
      NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    );
  }
  return null;
}

export function requireRoles(ctx: TenantContext, allowed: AppRole[]): NextResponse | null {
  if (!allowed.includes(ctx.role)) {
    return secureHeaders(
      NextResponse.json({ success: false, error: 'Acceso denegado para este rol' }, { status: 403 })
    );
  }
  return null;
}

export function requireSuperAdmin(ctx: TenantContext | null): NextResponse | null {
  if (!ctx) {
    return secureHeaders(
      NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    );
  }
  return requireRoles(ctx, ['superAdmin']);
}
