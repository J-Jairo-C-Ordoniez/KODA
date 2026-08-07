import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import {
  getSessionContext,
  requireSuperAdmin,
  secureHeaders,
} from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/search — SuperAdmin only: filtered tenant list ───────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const search = req.nextUrl.searchParams.get('search');
  const status = req.nextUrl.searchParams.get('status');

  const result = await tenantController.getTenantsFiltered(search, status);
  return secureHeaders(result as NextResponse);
}