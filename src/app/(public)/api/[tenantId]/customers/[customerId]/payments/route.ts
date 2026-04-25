import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';
import { NextResponse } from 'next/server';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function POST(req: Request, { params }: { params: { tenantId: string; customerId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.tenantId !== params.tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  const data = await req.json();
  return customerController.registerPayment(params.tenantId, params.customerId, data);
}
