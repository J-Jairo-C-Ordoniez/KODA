import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import salesController from '@/core/modules/sales/controllers/sales.controller';
import { apiResponse } from '@/core/utils/apiResponse';

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;

  if (!session || (session.user.tenantId !== resolvedParams.tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await salesController.createSale(data, resolvedParams.tenantId, session.user.id);
  } catch (error) {
    return apiResponse.error('Error en la solicitud JSON', 400);
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;

  if (!session || (session.user.tenantId !== resolvedParams.tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await salesController.getSales(resolvedParams.tenantId);
}
