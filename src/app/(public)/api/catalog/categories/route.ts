import { NextRequest, NextResponse } from 'next/server';
import categoryController from '@/backend/core/catalog/controllers/category.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/categories — Public: list categories for a tenant ────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const tenantId = req.nextUrl.searchParams.get('tenantId') ?? '';
  const result = await categoryController.getAllCategories(tenantId);
  return secureHeaders(result as NextResponse);
}
