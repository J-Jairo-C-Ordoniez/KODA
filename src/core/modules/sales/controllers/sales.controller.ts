import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '../services/sales.service';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';

const saleSchema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  customerId: z.string().optional(),
  total: z.number().positive(),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

const salesController = {
  async createSale(data: any, tenantId: string, userId: string) {
    try {
      const parseResult = saleSchema.safeParse(data);

      if (!parseResult.success) {
        return apiResponse.error('Datos de venta inválidos', 400);
      }

      const saleData = parseResult.data;

      if (saleData.paymentMethod === PaymentMethod.debt && !saleData.customerId) {
        return apiResponse.error('Un fiado requiere seleccionar un cliente', 400);
      }

      const sale = await salesService.registerSale(tenantId, userId, saleData);
      return apiResponse.success(sale, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al procesar la venta', 500);
    }
  },

  async getSales(tenantId: string) {
    try {
      const sales = await salesService.getAllSales(tenantId);
      return apiResponse.success(sales);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener ventas', 500);
    }
  }
};

export default salesController;
