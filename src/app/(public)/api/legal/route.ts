import { NextRequest, NextResponse } from 'next/server';
import policyController from '@/backend/crossCutting/policies/controllers/policy.controller';
import {
  getSessionContext,
  requireSuperAdmin,
  secureHeaders,
} from '@/backend/core/utils/routeGuard';

// ─── GET /api/legal — Public: retrieve latest policy ──────────────────────────
export async function GET(): Promise<NextResponse> {
  const result = await policyController.getLatestPolicy();
  return secureHeaders(result as NextResponse);
}

// ─── POST /api/legal — SuperAdmin only: create / update policy ─────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const data = await req.json();
  const result = await policyController.updatePolicy(data);
  return secureHeaders(result as NextResponse);
}