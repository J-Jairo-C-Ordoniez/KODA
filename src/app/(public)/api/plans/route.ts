import { type NextRequest, NextResponse } from 'next/server';
import { getSessionContext, requireSuperAdmin, secureHeaders } from '@/backend/core/utils/routeGuard';
import planController from '@/backend/crossCutting/plans/controllers/plan.controller';

// GET is public — no auth guard required
export async function GET(): Promise<NextResponse> {
  const result = await planController.getPlans();
  return secureHeaders(result as NextResponse);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const data = await req.json();
  const result = await planController.createPlan(data);
  return secureHeaders(result as NextResponse);
}
