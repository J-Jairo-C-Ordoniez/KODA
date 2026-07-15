import policyController from '@/core/modules/policies/controllers/policy.controller';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';

export async function GET() {
  return await policyController.getLatestPolicy();
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'superAdmin') {
    return apiResponse.error('No autorizado. Solo superAdmin puede actualizar políticas', 401);
  }

  try {
    const data = await req.json();
    return await policyController.updatePolicy(data);
  } catch (error) {
    return apiResponse.error('Error en la solicitud JSON', 400);
  }
}