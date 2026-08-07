import salesService from '@/backend/core/sales/services/sales.service';
import customerService from '@/backend/core/customers/services/customer.service';
import inventoryService from '@/backend/core/inventory/services/inventory.service';
import subscriptionService from '@/backend/crossCutting/subscriptions/services/subscription.service';
import tenantService from '@/backend/crossCutting/tenants/services/tenant.service';

const dashboardService = {
  async getSidebarStats(tenantId: string) {
    const [salesToday, debtCustomers, lowStockItems] = await Promise.all([
      salesService.getSalesToday(tenantId),
      customerService.getCustomersWithDebt(tenantId),
      inventoryService.getLowStockItems(tenantId),
    ]);
    return { salesToday, debtCustomers, lowStockItems };
  },

  async getGeneralStats(tenantId: string) {
    const [salesToday, paymentsToday, urgentAlerts, salesTrend] = await Promise.all([
      salesService.getSalesToday(tenantId),
      customerService.getPaymentsToday(tenantId),
      dashboardService.getUrgentAlerts(tenantId),
      salesService.getSalesTrend(tenantId),
    ]);
    return { salesToday, paymentsToday, urgentAlerts, salesTrend };
  },

  async getFinanceStats(tenantId: string) {
    const [salesMonth, profitMonth, debtCustomers, topDebtors] = await Promise.all([
      salesService.getSalesMonth(tenantId),
      salesService.getProfitMonth(tenantId),
      customerService.getCustomersWithDebt(tenantId),
      customerService.getTopDebtors(tenantId),
    ]);
    return { salesMonth, profitMonth, debtCustomers, topDebtors };
  },

  async getInventoryStats(tenantId: string) {
    return inventoryService.getInventoryDashboardStats(tenantId);
  },

  async getConfigStats(tenantId: string) {
    const [profile, subscription] = await Promise.all([
      tenantService.getStoreProfile(tenantId),
      subscriptionService.getSubscription(tenantId)
    ]);
    return {
      profile,
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
    };
  },

  async getUrgentAlerts(tenantId: string) {
    const [zeroStockCount, severeDebtsCount] = await Promise.all([
      inventoryService.getZeroStockCount(tenantId),
      customerService.getSevereDebtsCount(tenantId),
    ]);
    return {
      zeroStockCount,
      severeDebtsCount,
      total: zeroStockCount + severeDebtsCount,
    };
  }
};

export default dashboardService;
