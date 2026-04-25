import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function GET(req: Request, { params }: { params: { tenantId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.tenantId !== params.tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  return customerController.getCustomers(params.tenantId);
}

export async function POST(req: Request, { params }: { params: { tenantId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.tenantId !== params.tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  const data = await req.json();
  return customerController.createCustomer(params.tenantId, data);
}
