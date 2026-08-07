import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import variantController from '@/backend/core/catalog/controllers/variant.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const res = await variantController.getAllVariants(ctx.tenantId);
  return secureHeaders(res);
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const data = await req.json();
  const res = await variantController.createVariant(ctx.tenantId, data);
  return secureHeaders(res);
}
