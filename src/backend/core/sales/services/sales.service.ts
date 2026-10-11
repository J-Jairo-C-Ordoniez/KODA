import salesRepository, { PaginationOptions } from '../repositories/sales.repository';
import customerService from '@/backend/core/customers/services/customer.service';
import { PaymentMethod } from '@prisma/client';
import { CreateSaleDTO } from '../types';

export { type CreateSaleDTO } from '../types';

const salesService = {
  async registerSale(tenantId: string, userId: string, saleData: CreateSaleDTO) {
    return salesRepository.registerSale({
      tenantId,
      userId,
      customerId: saleData.customerId,
      paymentMethod: saleData.paymentMethod,
      items: saleData.items,
    });
  },

  async getAllSales(tenantId: string, pagination?: PaginationOptions) {
    return salesRepository.getSalesByTenant(tenantId, pagination);
  },

  async getSalesByUser(tenantId: string, userId: string, pagination?: PaginationOptions) {
    return salesRepository.getSalesByUser(tenantId, userId, pagination);
  },

  async getSalesToday(tenantId?: string) {
    if (!tenantId) return { totalRevenue: 0, totalOrders: 0 };
    return salesRepository.getSalesToday(tenantId);
  },

  async getSalesMonth(tenantId?: string) {
    if (!tenantId) return { totalRevenue: 0, totalOrders: 0 };
    return salesRepository.getSalesMonth(tenantId);
  },

  async getProfitMonth(tenantId?: string) {
    if (!tenantId) return { totalRevenue: 0, totalCost: 0, totalProfit: 0, margin: 0 };
    return salesRepository.getProfitMonth(tenantId);
  },

  async getSalesTrend(tenantId?: string) {
    if (!tenantId) return [];
    return salesRepository.getSalesTrend(tenantId);
  },

  async getSalesTodayItems(tenantId?: string) {
    if (!tenantId) return { totalItems: 0 };
    return salesRepository.getSalesTodayItems(tenantId);
  },

  async getPaymentsToday(tenantId?: string) {
    if (!tenantId) return { totalRevenue: 0, totalPayments: 0 };
    return customerService.getPaymentsToday(tenantId);
  },
};

export default salesService;
