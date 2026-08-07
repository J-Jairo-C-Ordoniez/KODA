import { NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/mrr — Public: monthly recurring revenue ─────────────────
export async function GET(): Promise<NextResponse> {
  const result = await tenantController.getMonthlyIncomes();
  return secureHeaders(result as NextResponse);
}