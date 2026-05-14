import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext } from '@/core/utils/tenantContext';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const { customerId } = await params;
  const data = await req.json();
  return customerController.registerPayment(tenantId, customerId, data);
}
