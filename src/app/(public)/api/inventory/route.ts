import { InventoryController } from '@/core/modules/inventory/controllers/inventory.controller';

const controller = new InventoryController();

export async function GET(req) {
  return controller.getDashboardInventory(req);
}

export async function POST(req) {
  return controller.updateStock(req);
}
