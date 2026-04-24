import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '../services/sales.service';
import inventoryService from '@/core/modules/inventory/services/inventory.service';
import catalogService from '@/core/modules/catalog/services/catalog.service';

const dashboardController = {
  async getStats(tenantId?: string) {
    try {
      const [
        salesData,
        inventoryData,
        topProducts
      ] = await Promise.all([
        salesService.getDashboardMetrics(tenantId),
        inventoryService.getDashboardData(), // May need tenantId filter if applicable
        catalogService.getPopularVariants(5)
      ]);

      return apiResponse.success({
        sales: salesData,
        inventory: inventoryData,
        topProducts
      });
    } catch (error: any) {
      console.error('Error in DashboardController:', error);
      return apiResponse.error(error.message || 'Error al obtener estadísticas', 500);
    }
  }
};

export default dashboardController;
