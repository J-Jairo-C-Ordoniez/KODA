import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/counts — Public: tenant count metrics ───────────────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get('type') ?? 'all';

  let result: NextResponse;
  if (type === 'active') {
    result = await tenantController.countActiveTenants() as NextResponse;
  } else if (type === 'suspended') {
    result = await tenantController.countSuspendedTenants() as NextResponse;
  } else {
    result = await tenantController.countAllTenants() as NextResponse;
  }

  return secureHeaders(result);
}