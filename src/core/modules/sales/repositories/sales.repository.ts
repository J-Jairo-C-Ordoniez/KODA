import prisma from '@/infrastructure/db/client';
import { CreateSaleDTO } from '../services/sales.service';
import { PaymentMethod } from '@prisma/client';

const salesRepository = {
  async createSale(tenantId: string, userId: string, data: CreateSaleDTO) {
    return prisma.$transaction(async (tx) => {
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
              priceAtSale: 0 
            }))
          }
        }
      });

      if (data.paymentMethod === PaymentMethod.debt && data.customerId) {
        await tx.customer.update({
          where: { customerId: data.customerId, tenantId }, 
          data: { totalDebt: { increment: data.total } }
        });
      }

      return sale;
    });
  },

  async getSalesByTenant(tenantId: string) {
    return prisma.sale.findMany({
      where: { tenantId },
      include: {
        items: true,
        user: { select: { name: true } },
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  },

  async getDashboardMetrics(tenantId: string) {
    const totalSales = await prisma.sale.aggregate({
      where: { tenantId },
      _sum: { total: true },
      _count: { saleId: true }
    });
    return {
      totalRevenue: totalSales._sum.total || 0,
      totalOrders: totalSales._count.saleId || 0
    };
  }
};

export default salesRepository;
