import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext } from '@/core/utils/tenantContext';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; customerId: string }> }
) {
  const resolvedParams = await params;
  const { tenantId: headerTenantId } = getTenantContext(req);
  const tenantId = headerTenantId || resolvedParams.tenantId;

  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const customerId = resolvedParams.customerId;
  const data = await req.json();
  return customerController.registerPayment(tenantId, customerId, data);
}
