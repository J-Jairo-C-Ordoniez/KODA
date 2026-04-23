import { DashboardController } from '@/core/modules/sales/controllers/dashboard.controller';

export async function GET(req) {
  const controller = new DashboardController();
  return controller.getStats();
}
