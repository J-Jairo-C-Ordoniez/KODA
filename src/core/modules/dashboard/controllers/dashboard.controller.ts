import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '@/core/modules/sales/services/sales.service';
import customerService from '@/core/modules/customers/services/customer.service';
import inventoryService from '@/core/modules/inventory/services/inventory.service';
import subscriptionService from '@/core/modules/subscriptions/services/subscription.service';

const dashboardController = {
  async getSidebarStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const [salesToday, debtCustomers, lowStockItems] = await Promise.all([
        salesService.getSalesToday(tenantId),
        customerService.getCustomersWithDebt(tenantId),
        inventoryService.getLowStockItems(tenantId),
      ]);
      return apiResponse.success({ salesToday, debtCustomers, lowStockItems });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener sidebar', 500);
    }
  },

  async getGeneralStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const [salesTodayItems, paymentsToday, urgentAlerts, salesTrend] = await Promise.all([
        salesService.getSalesTodayItems(tenantId),
        salesService.getPaymentsToday(tenantId),
        salesService.getUrgentAlerts(tenantId),
        salesService.getSalesTrend(tenantId),
      ]);
      return apiResponse.success({ salesTodayItems, paymentsToday, urgentAlerts, salesTrend });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener vista general', 500);
    }
  },

  async getFinanceStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const salesMonth = await salesService.getSalesMonth(tenantId);
      return apiResponse.success({ salesMonth });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener finanzas', 500);
    }
  },

  async getInventoryStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const [totalProducts, lowStockItems, outOfStockItems] = await Promise.all([
        inventoryService.getLowStockItems(tenantId),
        inventoryService.getLowStockItems(tenantId),
        inventoryService.getLowStockItems(tenantId),
      ]);
      return apiResponse.success({ totalProducts, lowStockItems, outOfStockItems });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener inventario', 500);
    }
  },

  async getConfigStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const subscription = await subscriptionService.getSubscription(tenantId);

      return apiResponse.success({
        subscription: subscription ? {
          planName: subscription.plan.name,
          planPrice: Number(subscription.plan.price),
          interval: subscription.plan.interval,
          status: subscription.status,
          endDate: subscription.endDate,
        } : null,
      });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener configuración', 500);
    }
  }
};

export default dashboardController;