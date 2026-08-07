import { type NextRequest, NextResponse } from 'next/server';
import { getSessionContext, requireSuperAdmin, secureHeaders } from '@/backend/core/utils/routeGuard';
import subscriptionController from '@/backend/crossCutting/subscriptions/controllers/subscription.controller';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const data = await req.json();
  const result = await subscriptionController.assignPlanAndPay(data);
  return secureHeaders(result as NextResponse);
}
