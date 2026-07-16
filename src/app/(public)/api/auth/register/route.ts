import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import { apiResponse } from '@/core/utils/apiResponse';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { businessName, name, email, password, whatsapp, type } = data;

    if (!businessName || !name || !email || !password || !whatsapp || !type) {
      return apiResponse.error('Todos los campos son obligatorios', 400);
    }

    return await tenantController.registerBusiness(data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error interno del servidor', 500);
  }
}