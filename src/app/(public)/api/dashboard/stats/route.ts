import dashboardController from '@/core/modules/sales/controllers/dashboard.controller';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return apiResponse.error('No autorizado', 401);
  }
  return await dashboardController.getStats(session.user.tenantId);
}
