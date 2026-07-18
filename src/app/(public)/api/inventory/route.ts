import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import inventoryController from '@/core/modules/inventory/controllers/inventory.controller';
import { apiResponse } from '@/core/utils/apiResponse';
import { requireRole } from '@/core/utils/tenantContext';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  return await inventoryController.getDashboardInventory(session.user.tenantId);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.tenantId) {
    return apiResponse.error('No autorizado', 401);
  }

  const denied = requireRole(session.user.role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  try {
    const data = await req.json();
    return await inventoryController.updateStock(data);
  } catch {
    return apiResponse.error('Error en la solicitud JSON', 400);
  }
}
