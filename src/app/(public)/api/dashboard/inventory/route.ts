import { type NextRequest, NextResponse } from 'next/server';
import { getTenantContext, secureHeaders } from '@/backend/core/utils/routeGuard';
import dashboardController from '@/backend/aggregation/dashboard/controllers/dashboard.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const result = await dashboardController.getInventoryStats(ctx.tenantId);
  return secureHeaders(result as NextResponse);
}