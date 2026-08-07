import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import productController from '@/backend/core/catalog/controllers/product.controller';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  const ctx = getTenantContext(req);
  const { productId } = await params;
  const res = await productController.getProductById(ctx.tenantId, productId);
  return secureHeaders(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { productId } = await params;
  const data = await req.json();
  const res = await productController.updateProduct(ctx.tenantId, productId, data);
  return secureHeaders(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { productId } = await params;
  const res = await productController.deleteProduct(ctx.tenantId, productId);
  return secureHeaders(res);
}
