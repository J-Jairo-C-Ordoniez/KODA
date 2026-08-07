import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import categoryController from '@/backend/core/catalog/controllers/category.controller';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; categoryId: string }> }
) {
  const ctx = getTenantContext(req);
  const { categoryId } = await params;
  const res = await categoryController.getCategoryById(ctx.tenantId, categoryId);
  return secureHeaders(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; categoryId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { categoryId } = await params;
  const data = await req.json();
  const res = await categoryController.updateCategory(ctx.tenantId, categoryId, data);
  return secureHeaders(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; categoryId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { categoryId } = await params;
  const res = await categoryController.deleteCategory(ctx.tenantId, categoryId);
  return secureHeaders(res);
}
