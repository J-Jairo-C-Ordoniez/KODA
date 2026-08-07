import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import {
  getSessionContext,
  requireSuperAdmin,
  secureHeaders,
} from '@/backend/core/utils/routeGuard';

// ─── PATCH /api/tenants/status — SuperAdmin only: update tenant status ─────────
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const { tenantId, status } = await req.json();
  const result = await tenantController.updateTenantStatus(tenantId, status);
  return secureHeaders(result as NextResponse);
}
