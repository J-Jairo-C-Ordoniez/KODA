import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext } from '@/core/utils/tenantContext';
import customerController from '@/core/modules/customers/controllers/customer.controller';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const { customerId } = await params;
  const data = await req.json();
  return customerController.updateCustomer(tenantId, customerId, data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const { customerId } = await params;
  return customerController.deleteCustomer(tenantId, customerId);
}
