import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/slug — Public: resolve tenant by slug ───────────────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const result = await tenantController.getTenantBySlug(slug);
  return secureHeaders(result as NextResponse);
}
