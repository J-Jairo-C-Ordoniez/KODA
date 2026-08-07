import { NextRequest, NextResponse } from 'next/server';
import productController from '@/backend/core/catalog/controllers/product.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/products/[id] — Public: get product detail ──────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const tenantId = req.nextUrl.searchParams.get('tenantId') ?? '';
  const result = await productController.getProductById(tenantId, id);
  return secureHeaders(result as NextResponse);
}
