import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── POST /api/auth/register — Public: register a new business tenant ─────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const result = await tenantController.registerBusiness(data);
  return secureHeaders(result as NextResponse);
}