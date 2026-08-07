import { NextRequest, NextResponse } from 'next/server';

export function getTenantContext(req: NextRequest) {
  const tenantId = req.headers.get('x-tenant-id') ?? '';
  const userId = req.headers.get('x-user-id') ?? '';
  const role = req.headers.get('x-user-role') ?? '';
  return { tenantId, userId, role };
}

export function requireRole(role: string, allowedRoles: string[]): NextResponse | null {
  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: 'Acción no permitida para este rol' }, { status: 403 });
  }
  return null;
}
