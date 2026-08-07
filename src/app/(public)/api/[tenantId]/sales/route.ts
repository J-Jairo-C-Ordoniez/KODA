import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import salesController from '@/backend/core/sales/controllers/sales.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);

  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Number(url.searchParams.get('limit') || '50');

  let result: NextResponse;

  if (ctx.role === 'employee') {
    result = await salesController.getSalesByUser(ctx.tenantId, ctx.userId, { page, limit }) as NextResponse;
  } else {
    const filterUserId = url.searchParams.get('userId');
    if (filterUserId) {
      result = await salesController.getSalesByUser(ctx.tenantId, filterUserId, { page, limit }) as NextResponse;
    } else {
      result = await salesController.getSales(ctx.tenantId, { page, limit }) as NextResponse;
    }
  }

  secureHeaders(result);
  return result;
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);

  const denied = requireRoles(ctx, ['admin', 'employee', 'superAdmin']);
  if (denied) return denied;

  const body = await req.json();
  const result = await salesController.createSale(body, ctx.tenantId, ctx.userId) as NextResponse;
  secureHeaders(result);
  return result;
}
