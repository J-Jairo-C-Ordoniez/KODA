import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import variantController from '@/backend/core/catalog/controllers/variant.controller';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; variantId: string }> }
) {
  const ctx = getTenantContext(req);
  const { variantId } = await params;
  const res = await variantController.getVariantById(ctx.tenantId, variantId);
  return secureHeaders(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; variantId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { variantId } = await params;
  const data = await req.json();
  const res = await variantController.updateVariant(ctx.tenantId, variantId, data);
  return secureHeaders(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; variantId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { variantId } = await params;
  const res = await variantController.deleteVariant(ctx.tenantId, variantId);
  return secureHeaders(res);
}
