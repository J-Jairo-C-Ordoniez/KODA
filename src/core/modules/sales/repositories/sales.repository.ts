import prisma from '@/infrastructure/db/client';
import { CreateSaleDTO } from '../services/sales.service';
import { PaymentMethod } from '@prisma/client';

export class SalesRepository {
  async createSale(tenantId: string, userId: string, data: CreateSaleDTO) {
    return prisma.$transaction(async (tx) => {
      // 1. Verificar stock y descontarlo para cada item
      for (const item of data.items) {
        const inventory = await tx.inventory.findFirst({
          where: { variantId: item.variantId }
        });

        if (!inventory || inventory.stock < item.quantity) {
          throw new Error('Stock insuficiente para la variante ' + item.variantId);
        }

        await tx.inventory.update({
          where: { inventoryId: inventory.inventoryId },
          data: { stock: inventory.stock - item.quantity }
        });
      }

      // 2. Registrar la venta maestra
      const sale = await tx.sale.create({
        data: {
          tenantId,
          userId,
          customerId: data.customerId,
          total: data.total,
          paymentMethod: data.paymentMethod,
          items: {
            create: data.items.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
              // Ideally price comes from DB, but we get the payload total for now
              priceAtSale: 0 
            }))
          }
        }
      });

      // 3. Update debt if needed (Capa 6)
      if (data.paymentMethod === PaymentMethod.debt && data.customerId) {
        await tx.customer.update({
          where: { customerId: data.customerId, tenantId }, // Ensures tenant isolation
          data: { totalDebt: { increment: data.total } }
        });
      }

      return sale;
    });
  }

  async getSalesByTenant(tenantId: string) {
    return prisma.sale.findMany({
      where: { tenantId },
      include: {
        items: true,
        user: { select: { name: true } },
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // pagination logic should be added
    });
  }
}
