import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '../services/sales.service';
import customerService from '@/core/modules/customers/services/customer.service';
import inventoryService from '@/core/modules/inventory/services/inventory.service';
import prisma from '@/infrastructure/db/client';

const dashboardController = {
  async getStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const [
        salesToday,
        salesMonth,
        debtCustomers,
        lowStockItems,
        salesTrend,
        subscription,
      ] = await Promise.all([
        salesService.getSalesToday(tenantId),
        salesService.getSalesMonth(tenantId),
        customerService.getCustomersWithDebt(tenantId),
        inventoryService.getLowStockItems(tenantId),
        salesService.getSalesTrend(tenantId),
        prisma.subscription.findUnique({
          where: { tenantId },
          include: { plan: { select: { name: true, price: true, interval: true } } },
        }),
      ]);

      return apiResponse.success({
        salesToday,
        salesMonth,
        debtCustomers,
        lowStockItems,
        salesTrend,
        subscription: subscription
          ? {
              planName: subscription.plan.name,
              planPrice: Number(subscription.plan.price),
              interval: subscription.plan.interval,
              status: subscription.status,
              endDate: subscription.endDate,
            }
          : null,
      });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener estadísticas', 500);
    }
  },
};

export default dashboardController;
