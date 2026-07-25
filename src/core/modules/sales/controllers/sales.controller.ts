import { apiResponse } from '@/core/utils/apiResponse';
import salesService from '../services/sales.service';
import { PaginationOptions } from '../repositories/sales.repository';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';
import prisma from '@/infrastructure/db/client';

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
  async createSale(data: any, tenantId: string, userId: string) {
    try {
      const parseResult = saleSchema.safeParse(data);

      if (!parseResult.success) {
        return apiResponse.error('Datos de venta inválidos', 400);
      }

      const saleData = parseResult.data;
      const customerId = saleData.customerId || undefined;

      if (saleData.paymentMethod === PaymentMethod.debt && !customerId) {
        return apiResponse.error('Un fiado requiere seleccionar un cliente', 400);
      }

      // Ensure total is computed if not provided
      let total = saleData.total ?? 0;
      if (!total || total <= 0) {
        // Compute total from variant prices in DB if total wasn't supplied
        const variantIds = saleData.items.map(i => i.variantId);
        const variants = await prisma.variant.findMany({
          where: {
            variantId: { in: variantIds },
            product: { tenantId },
          },
          select: { variantId: true, price: true }
        });
        const map = new Map(variants.map(v => [v.variantId, Number(v.price)]));
        total = saleData.items.reduce((acc, item) => acc + (map.get(item.variantId) ?? 0) * item.quantity, 0);
      }

      const sale = await salesService.registerSale(tenantId, userId, {
        items: saleData.items,
        customerId,
        total,
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
