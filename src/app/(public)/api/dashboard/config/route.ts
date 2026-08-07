import { type NextRequest, NextResponse } from 'next/server';
import { getTenantContext, secureHeaders } from '@/backend/core/utils/routeGuard';
import dashboardController from '@/backend/aggregation/dashboard/controllers/dashboard.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const result = await dashboardController.getConfigStats(ctx.tenantId);
  return secureHeaders(result as NextResponse);
}

export async function PUT(req: NextRequest) {
  const ctx = getTenantContext(req);
  const body = await req.json();
  const result = await dashboardController.updateStoreProfile(ctx.tenantId, body);
  return secureHeaders(result as NextResponse);
}