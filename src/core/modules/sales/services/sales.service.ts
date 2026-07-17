import salesRepository, { PaginationOptions } from '../repositories/sales.repository';
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

  async getAllSales(tenantId: string, pagination?: PaginationOptions) {
    try {
      return await salesRepository.getSalesByTenant(tenantId, pagination);
    } catch (error: any) {
      throw new Error(`Error al obtener ventas: ${error.message}`);
    }
  },

  async getSalesByUser(tenantId: string, userId: string, pagination?: PaginationOptions) {
    try {
      return await salesRepository.getSalesByUser(tenantId, userId, pagination);
    } catch (error: any) {
      throw new Error(`Error al obtener ventas del empleado: ${error.message}`);
    }
  },

  async getSalesToday(tenantId?: string) {
    try {
      if (!tenantId) return { totalRevenue: 0, totalOrders: 0 };
      return await salesRepository.getSalesToday(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener métricas del dashboard: ${error.message}`);
    }
  },

  async getSalesMonth(tenantId?: string) {
    try {
      if (!tenantId) return { totalRevenue: 0, totalOrders: 0 };
      return await salesRepository.getSalesMonth(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener métricas del dashboard: ${error.message}`);
    }
  },

  async getProfitMonth(tenantId?: string) {
    try {
      if (!tenantId) return { totalRevenue: 0, totalCost: 0, totalProfit: 0, margin: 0 };
      return await salesRepository.getProfitMonth(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener métricas del dashboard: ${error.message}`);
    }
  },

  async getSalesTrend(tenantId?: string) {
    try {
      if (!tenantId) return [];
      return await salesRepository.getSalesTrend(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener tendencia de ventas: ${error.message}`);
    }
  },

  async getSalesTodayItems(tenantId?: string) {
    try {
      if (!tenantId) return { totalItems: 0 };
      return await salesRepository.getSalesTodayItems(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener prendas vendidas hoy: ${error.message}`);
    }
  },

  async getPaymentsToday(tenantId?: string) {
    try {
      if (!tenantId) return { totalRevenue: 0, totalPayments: 0 };
      return await salesRepository.getPaymentsToday(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener abonos del día: ${error.message}`);
    }
  },

  async getUrgentAlerts(tenantId?: string) {
    try {
      if (!tenantId) return { zeroStockCount: 0, severeDebtsCount: 0, total: 0 };
      return await salesRepository.getUrgentAlerts(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener alertas urgentes: ${error.message}`);
    }
  },
};

export default salesService;
