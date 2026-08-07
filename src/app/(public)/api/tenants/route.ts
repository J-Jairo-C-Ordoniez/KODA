import { NextRequest, NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import {
  getSessionContext,
  requireSuperAdmin,
  secureHeaders,
} from '@/backend/core/utils/routeGuard';

// ─── POST /api/tenants — Public: register a new tenant ────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const result = await tenantController.registerBusiness(data);
  return secureHeaders(result as NextResponse);
}

// ─── GET /api/tenants — SuperAdmin only: list all tenants ─────────────────────
export async function GET(): Promise<NextResponse> {
  const ctx = await getSessionContext();
  const guard = requireSuperAdmin(ctx);
  if (guard) return guard;

  const result = await tenantController.getAllTenants();
  return secureHeaders(result as NextResponse);
}
