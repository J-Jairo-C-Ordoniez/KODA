import { type NextRequest, NextResponse } from 'next/server';
import { getSessionContext, requireSuperAdmin, secureHeaders } from '@/backend/core/utils/routeGuard';
import planController from '@/backend/crossCutting/plans/controllers/plan.controller';

// GET is public — no auth guard required
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const result = await planController.getPlan(id);
  return secureHeaders(result as NextResponse);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const { id } = await params;
  const data = await req.json();
  const result = await planController.updatePlan(id, data);
  return secureHeaders(result as NextResponse);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const { id } = await params;
  const result = await planController.deletePlan(id);
  return secureHeaders(result as NextResponse);
}
