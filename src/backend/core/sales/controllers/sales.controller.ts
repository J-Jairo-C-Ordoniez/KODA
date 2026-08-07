import { apiResponse } from '@/backend/core/utils/apiResponse';
import salesService from '../services/sales.service';
import { PaginationOptions } from '../repositories/sales.repository';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';
import { CreateSaleInput } from '../types';

const saleSchema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  customerId: z.string().optional().nullable(),
  total: z.number().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

const salesController = {
  async createSale(data: unknown, tenantId: string, userId: string) {
    try {
      const parseResult = saleSchema.safeParse(data);

      if (!parseResult.success) {
        return apiResponse.error('Datos de venta inválidos', 400);
      }

      const saleData: CreateSaleInput = parseResult.data;
      const customerId = saleData.customerId || undefined;

      if (saleData.paymentMethod === PaymentMethod.debt && !customerId) {
        return apiResponse.error('Un fiado requiere seleccionar un cliente', 400);
      }

      const sale = await salesService.registerSale(tenantId, userId, {
        items: saleData.items,
        customerId,
        total: saleData.total,
        paymentMethod: saleData.paymentMethod,
      });
      return apiResponse.success(sale, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al procesar la venta', 500);
    }
  },

  async getSales(tenantId: string, pagination?: PaginationOptions) {
    try {
      const sales = await salesService.getAllSales(tenantId, pagination);
      return apiResponse.success(sales);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener ventas', 500);
    }
  },

  async getSalesByUser(tenantId: string, userId: string, pagination?: PaginationOptions) {
    try {
      const sales = await salesService.getSalesByUser(tenantId, userId, pagination);
      return apiResponse.success(sales);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener ventas del empleado', 500);
    }
  }
};

export default salesController;
