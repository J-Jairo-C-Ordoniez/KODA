import { NextResponse } from 'next/server';
import { getSessionContext, requireSuperAdmin, secureHeaders } from '@/backend/core/utils/routeGuard';
import subscriptionController from '@/backend/crossCutting/subscriptions/controllers/subscription.controller';

export async function GET(): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const result = await subscriptionController.getSubscriptionStats();
  return secureHeaders(result as NextResponse);
}
