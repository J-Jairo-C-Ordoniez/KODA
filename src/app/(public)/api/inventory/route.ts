import inventoryController from '@/core/modules/inventory/controllers/inventory.controller';
import { apiResponse } from '@/core/utils/apiResponse';

export async function GET() {
  return await inventoryController.getDashboardInventory();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return await inventoryController.updateStock(data);
  } catch (error) {
    return apiResponse.error("Error en la solicitud JSON", 400);
  }
}
