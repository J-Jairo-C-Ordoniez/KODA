import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import categoryController from '@/backend/core/catalog/controllers/category.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const res = await categoryController.getAllCategories(ctx.tenantId);
  return secureHeaders(res);
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const data = await req.json();
  const res = await categoryController.createCategory(ctx.tenantId, data);
  return secureHeaders(res);
}
