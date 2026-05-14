import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext, requireRole } from '@/core/utils/tenantContext';
import productController from '@/core/modules/catalog/controllers/product.controller';

export async function GET(req: NextRequest) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);
  return await productController.getAllProducts(tenantId);
}

export async function POST(req: NextRequest) {
  const { tenantId, role } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  try {
    const data = await req.json();
    return await productController.createProduct(tenantId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al crear producto', 400);
  }
}
