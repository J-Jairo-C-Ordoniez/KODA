import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '../services/sales.service';
import customerService from '@/core/modules/customers/services/customer.service';
import inventoryService from '@/core/modules/inventory/services/inventory.service';

const dashboardController = {
  async getStats(tenantId?: string) {
    try {
      const [
        salesDataToday,
        salesDataMonth,
        debtCustomers,
        lowStockItems,
        salesTrend
      ] = await Promise.all([
        salesService.getSalesToday(tenantId),
        salesService.getSalesMonth(tenantId),
        customerService.getCustomersWithDebt(tenantId),
        inventoryService.getLowStockItems(tenantId),
        salesService.getSalesTrend(tenantId)
      ]);

      console.log('lowStockItems', lowStockItems);

      return apiResponse.success({
        salesToday: salesDataToday,
        salesMonth: salesDataMonth,
        debtCustomers: debtCustomers,
        lowStockItems: lowStockItems,
        salesTrend: salesTrend
      });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener estadísticas', 500);
    }
  }
};

export default dashboardController;
