import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext, requireRole } from '@/core/utils/tenantContext';
import salesController from '@/core/modules/sales/controllers/sales.controller';

export async function POST(req: NextRequest) {
  const { tenantId, userId, role } = getTenantContext(req);

  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'employee', 'superAdmin']);
  if (denied) return denied;

  try {
    const data = await req.json();
    return await salesController.createSale(data, tenantId, userId);
  } catch {
    return apiResponse.error('Error en la solicitud JSON', 400);
  }
}

export async function GET(req: NextRequest) {
  const { tenantId, userId, role } = getTenantContext(req);

  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Number(url.searchParams.get('limit') || '50');

  if (role === 'employee') {
    return await salesController.getSalesByUser(tenantId, userId, { page, limit });
  }
  const filterUserId = url.searchParams.get('userId');
  if (filterUserId) {
    return await salesController.getSalesByUser(tenantId, filterUserId, { page, limit });
  }

  return await salesController.getSales(tenantId, { page, limit });
}
