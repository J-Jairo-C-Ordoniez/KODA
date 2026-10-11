import prisma from '@/infrastructure/db/client';
import { PaymentMethod } from '@prisma/client';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface CreateSaleItemRepoDTO {
  variantId: string;
  quantity: number;
  priceAtSale: number;
}

export interface RegisterSaleRepoDTO {
  tenantId: string;
  userId: string;
  customerId?: string;
  paymentMethod: PaymentMethod;
  items: Array<{
    variantId: string;
    quantity: number;
  }>;
}

const salesRepository = {
  async registerSale(data: RegisterSaleRepoDTO) {
    return prisma.$transaction(async (tx) => {
      const quantitiesByVariant = new Map<string, number>();
      for (const item of data.items) {
        quantitiesByVariant.set(
          item.variantId,
          (quantitiesByVariant.get(item.variantId) ?? 0) + item.quantity,
        );
      }

      const variantIds = [...quantitiesByVariant.keys()];
      const variants = await tx.variant.findMany({
        where: {
          variantId: { in: variantIds },
          product: { tenantId: data.tenantId },
        },
        select: {
          variantId: true,
          price: true,
          inventories: {
            select: { inventoryId: true, stock: true },
            orderBy: { createdAt: 'asc' },
            take: 1,
          },
        },
      });

      if (variants.length !== variantIds.length) {
        throw new Error('Una o más variantes no están disponibles para esta tienda');
      }

      const items = [] as CreateSaleItemRepoDTO[];

      for (const variant of variants) {
        const quantity = quantitiesByVariant.get(variant.variantId)!;
        const inventory = variant.inventories[0];

        if (!inventory) {
          throw new Error('La variante no tiene inventario configurado');
        }

        const stockUpdate = await tx.inventory.updateMany({
          where: {
            inventoryId: inventory.inventoryId,
            stock: { gte: quantity },
          },
          data: { stock: { decrement: quantity } },
        });

        if (stockUpdate.count !== 1) {
          throw new Error(`Stock insuficiente para una de las variantes seleccionadas`);
        }

        await tx.variant.update({
          where: { variantId: variant.variantId },
          data: { popularity: { increment: quantity } },
        });

        items.push({
          variantId: variant.variantId,
          quantity,
          priceAtSale: Number(variant.price),
        });
      }

      const total = items.reduce((sum, item) => sum + item.priceAtSale * item.quantity, 0);

      if (data.paymentMethod === PaymentMethod.debt) {
        if (!data.customerId) {
          throw new Error('Un fiado requiere seleccionar un cliente');
        }

        const debtUpdate = await tx.customer.updateMany({
          where: { customerId: data.customerId, tenantId: data.tenantId },
          data: { totalDebt: { increment: total } },
        });

        if (debtUpdate.count !== 1) {
          throw new Error('Cliente no encontrado');
        }
      }

      return tx.sale.create({
        data: {
          tenantId: data.tenantId,
          userId: data.userId,
          customerId: data.customerId,
          total,
          paymentMethod: data.paymentMethod,
          items: { create: items },
        },
        include: { items: true },
      });
    }, {
      maxWait: 5000,
      timeout: 10000,
    });
  },

  async getSalesByTenant(tenantId: string, { page = 1, limit = 50 }: PaginationOptions = {}) {
    const skip = (page - 1) * limit;
    return prisma.sale.findMany({
      where: { tenantId },
      select: {
        saleId: true,
        total: true,
        paymentMethod: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            priceAtSale: true,
            variant: {
              select: {
                name: true,
                product: { select: { name: true } }
              }
            }
          }
        },
        user: { select: { name: true } },
        customer: { select: { customerId: true, name: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  },

  async getSalesByUser(tenantId: string, userId: string, { page = 1, limit = 50 }: PaginationOptions = {}) {
    const skip = (page - 1) * limit;
    return prisma.sale.findMany({
      where: { tenantId, userId },
      select: {
        saleId: true,
        total: true,
        paymentMethod: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            priceAtSale: true,
            variant: {
              select: {
                name: true,
                product: { select: { name: true } }
              }
            }
          }
        },
        user: { select: { name: true } },
        customer: { select: { customerId: true, name: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  },

  async getSalesToday(tenantId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const sales = await prisma.sale.aggregate({
      where: {
        tenantId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      _sum: { total: true },
      _count: { saleId: true }
    });

    return {
      totalRevenue: Number(sales._sum.total || 0),
      totalOrders: sales._count.saleId || 0
    };
  },

  async getSalesMonth(tenantId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const sales = await prisma.sale.aggregate({
      where: {
        tenantId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _sum: { total: true },
      _count: { saleId: true }
    });

    return {
      totalRevenue: Number(sales._sum.total || 0),
      totalOrders: sales._count.saleId || 0
    };
  },

  async getProfitMonth(tenantId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [salesAggregate, items] = await Promise.all([
      prisma.sale.aggregate({
        where: {
          tenantId,
          createdAt: { gte: thirtyDaysAgo },
        },
        _sum: { total: true },
      }),
      prisma.saleItem.findMany({
        where: {
          sale: {
            tenantId,
            createdAt: { gte: thirtyDaysAgo },
          },
        },
        select: {
          quantity: true,
          priceAtSale: true,
          variant: {
            select: {
              cost: true,
            },
          },
        },
      }),
    ]);

    const totalRevenue = Number(salesAggregate._sum.total || 0);

    let totalCost = 0;
    for (const item of items) {
      const quantity = item.quantity || 0;
      const cost = Number(item.variant?.cost ?? 0);
      totalCost += cost * quantity;
    }

    const totalProfit = totalRevenue - totalCost;

    const margin =
      totalRevenue > 0
        ? Number(((totalProfit / totalRevenue) * 100).toFixed(1))
        : 0;

    return {
      totalRevenue,
      totalCost,
      totalProfit,
      margin,
    };
  },

  async getSalesTrend(tenantId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sales = await prisma.sale.findMany({
      where: {
        tenantId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        total: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const trendMap: Record<string, number> = {};

    for (let i = 0; i <= 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      trendMap[dateStr] = 0;
    }

    sales.forEach(sale => {
      const dateStr = sale.createdAt.toISOString().split('T')[0];
      if (trendMap[dateStr] !== undefined) {
        trendMap[dateStr] += Number(sale.total);
      }
    });

    return Object.entries(trendMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  async getSalesTodayItems(tenantId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await prisma.saleItem.aggregate({
      where: {
        sale: {
          tenantId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
      },
      _sum: { quantity: true },
    });

    return { totalItems: result._sum.quantity ?? 0 };
  },
};

export default salesRepository;
