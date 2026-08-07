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

export interface CreateSaleRepoDTO {
  tenantId: string;
  userId: string;
  customerId?: string;
  total: number;
  paymentMethod: PaymentMethod;
  items: CreateSaleItemRepoDTO[];
}

const salesRepository = {
  async createSale(data: CreateSaleRepoDTO) {
    return prisma.sale.create({
      data: {
        tenantId: data.tenantId,
        userId: data.userId,
        customerId: data.customerId,
        total: data.total,
        paymentMethod: data.paymentMethod,
        items: {
          create: data.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            priceAtSale: item.priceAtSale,
          }))
        }
      },
      include: {
        items: true,
      }
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
