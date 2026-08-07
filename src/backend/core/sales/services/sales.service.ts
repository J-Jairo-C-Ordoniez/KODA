import salesRepository, { PaginationOptions } from '../repositories/sales.repository';
import catalogService from '@/backend/core/catalog/services/catalog.service';
import inventoryService from '@/backend/core/inventory/services/inventory.service';
import customerService from '@/backend/core/customers/services/customer.service';
import { PaymentMethod } from '@prisma/client';
import { CreateSaleDTO } from '../types';

export { type CreateSaleDTO } from '../types';

const salesService = {
  async registerSale(tenantId: string, userId: string, saleData: CreateSaleDTO) {
    const itemsToCreate = [];

    for (const item of saleData.items) {
      const variant = await catalogService.getVariantById(item.variantId);

      // Decrement stock in inventory domain
      await inventoryService.decreaseStock(item.variantId, item.quantity);

      // Increment variant popularity in catalog domain
      await catalogService.incrementPopularity(item.variantId, item.quantity);

      itemsToCreate.push({
        variantId: item.variantId,
        quantity: item.quantity,
        priceAtSale: Number(variant.price),
      });
    }

    const calculatedTotal = itemsToCreate.reduce(
      (acc, item) => acc + item.priceAtSale * item.quantity,
      0
    );
    const finalTotal = (saleData.total && saleData.total > 0) ? saleData.total : calculatedTotal;

    // Register sale record in sales domain
    const newSale = await salesRepository.createSale({
      tenantId,
      userId,
      customerId: saleData.customerId,
      total: finalTotal,
      paymentMethod: saleData.paymentMethod,
      items: itemsToCreate,
    });

    // Update customer debt if credit sale
    if (saleData.paymentMethod === PaymentMethod.debt && saleData.customerId) {
      await customerService.addDebt(tenantId, saleData.customerId, finalTotal);
    }

    return newSale;
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
