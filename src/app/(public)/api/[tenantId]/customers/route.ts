import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const { tenantId } = await params;

  if (!session || session.user.tenantId !== tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  return customerController.getCustomers(tenantId);
}

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const { tenantId } = await params;

  if (!session || session.user.tenantId !== tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  const data = await req.json();
  return customerController.createCustomer(tenantId, data);
}
