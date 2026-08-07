import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import productController from '@/backend/core/catalog/controllers/product.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const res = await productController.getAllProducts(ctx.tenantId);
  return secureHeaders(res);
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const data = await req.json();
  const res = await productController.createProduct(ctx.tenantId, data);
  return secureHeaders(res);
}
