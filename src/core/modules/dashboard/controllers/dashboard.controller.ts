import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '@/core/modules/sales/services/sales.service';
import customerService from '@/core/modules/customers/services/customer.service';
import inventoryService from '@/core/modules/inventory/services/inventory.service';
import subscriptionService from '@/core/modules/subscriptions/services/subscription.service';
import tenantService from '@/core/modules/tenants/services/tenant.service';

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
      const [salesToday, paymentsToday, urgentAlerts, salesTrend] = await Promise.all([
        salesService.getSalesToday(tenantId),
        salesService.getPaymentsToday(tenantId),
        salesService.getUrgentAlerts(tenantId),
        salesService.getSalesTrend(tenantId),
      ]);
      return apiResponse.success({ salesToday, paymentsToday, urgentAlerts, salesTrend });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener vista general', 500);
    }
  },

  async getFinanceStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const [salesMonth, profitMonth, debtCustomers, topDebtors] = await Promise.all([
        salesService.getSalesMonth(tenantId),
        salesService.getProfitMonth(tenantId),
        customerService.getCustomersWithDebt(tenantId),
        customerService.getTopDebtors(tenantId),
      ]);

      return apiResponse.success({
        salesMonth,
        profitMonth,
        debtCustomers,
        topDebtors,
      });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener finanzas', 500);
    }
  },

  async getInventoryStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);
    try {
      const dashboardData = await inventoryService.getInventoryDashboardStats(tenantId);
      return apiResponse.success(dashboardData);

    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al procesar las estadísticas de inventario', 500);
    }
  },

  async getConfigStats(tenantId?: string) {
    if (!tenantId) return apiResponse.error('Tenant requerido', 400);

    try {
      const [profile, subscription] = await Promise.all([
        tenantService.getStoreProfile(tenantId),
        subscriptionService.getSubscription(tenantId)
      ]);

      return apiResponse.success({
        profile: profile,
        subscription: subscription ? {
          status: subscription.status,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          plan: {
            name: subscription.plan.name,
            price: Number(subscription.plan.price),
            interval: subscription.plan.interval,
            features: subscription.plan.feature
          }
        } : null,
      });

    } catch (error: any) {
      console.error("[STORE_STATS_ERROR]", error);
      return apiResponse.error(error.message || 'Error al obtener la información de la tienda', 500);
    }
  }
};

export default dashboardController;