import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext, requireRole } from '@/core/utils/tenantContext';
import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: NextRequest) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);
  return await categoryController.getAllCategories(tenantId);
}

export async function POST(req: NextRequest) {
  const { tenantId, role } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  try {
    const data = await req.json();
    return await categoryController.createCategory(tenantId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al crear categoría', 400);
  }
}
