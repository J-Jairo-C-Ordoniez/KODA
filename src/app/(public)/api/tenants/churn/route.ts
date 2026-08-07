import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/churn — Public: churn metrics ───────────────────────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get('type') ?? 'MonthlyChurnCount';

  let result: NextResponse;
  if (type === 'ChurnRate') {
    result = await tenantController.getChurnRate() as NextResponse;
  } else {
    result = await tenantController.getMonthlyChurnCount() as NextResponse;
  }

  return secureHeaders(result);
}