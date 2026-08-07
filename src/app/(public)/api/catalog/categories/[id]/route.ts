import { NextRequest, NextResponse } from 'next/server';
import categoryController from '@/backend/core/catalog/controllers/category.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/categories/[id] — Public: get category detail ───────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const tenantId = req.nextUrl.searchParams.get('tenantId') ?? '';
  const result = await categoryController.getCategoryById(tenantId, id);
  return secureHeaders(result as NextResponse);
}
