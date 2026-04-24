import salesRepository from '../repositories/sales.repository';
import { PaymentMethod } from '@prisma/client';

export interface SaleItemData {
  variantId: string;
  quantity: number;
}

export interface CreateSaleDTO {
  items: SaleItemData[];
  customerId?: string;
  total: number;
  paymentMethod: PaymentMethod;
}

const salesService = {
  async registerSale(tenantId: string, userId: string, saleData: CreateSaleDTO) {
    try {
      const newSale = await salesRepository.createSale(tenantId, userId, saleData);
      return newSale;
    } catch (error: any) {
      throw new Error(`Error al registrar la venta: ${error.message}`);
    }
  },

  async getAllSales(tenantId: string) {
    try {
      return await salesRepository.getSalesByTenant(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener ventas: ${error.message}`);
    }
  },

  async getDashboardMetrics(tenantId?: string) {
    try {
      // Stub for dashboard metrics, tenantId might be undefined if global
      if (!tenantId) return { totalRevenue: 0, totalOrders: 0 };
      return await salesRepository.getDashboardMetrics(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener métricas del dashboard: ${error.message}`);
    }
  }
};

export default salesService;
