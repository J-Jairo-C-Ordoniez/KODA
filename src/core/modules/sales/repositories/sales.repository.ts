import prisma from '@/infrastructure/db/client';
import { CreateSaleDTO } from '../services/sales.service';
import { PaymentMethod } from '@prisma/client';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

const salesRepository = {
  async createSale(tenantId: string, userId: string, data: CreateSaleDTO) {
    return prisma.$transaction(async (tx) => {
      const variantIds = data.items.map(item => item.variantId);

      const variants = await tx.variant.findMany({
        where: {
          variantId: { in: variantIds },
          product: { tenantId }
        },
        include: {
          inventories: true
        }
      });

      const variantMap = new Map(variants.map(v => [v.variantId, v]));
      const itemsToCreate = [];

      for (const item of data.items) {
        const variant = variantMap.get(item.variantId);

        if (!variant) {
          throw new Error(`Variante ${item.variantId} no encontrada o no pertenece a este comercio`);
        }

        const inventory = variant.inventories[0];
        if (!inventory || inventory.stock < item.quantity) {
          throw new Error(`Stock insuficiente para la variante: ${variant.name}`);
        }

        await tx.inventory.update({
          where: { inventoryId: inventory.inventoryId },
          data: { stock: { decrement: item.quantity } }
        });

        itemsToCreate.push({
          variantId: item.variantId,
          quantity: item.quantity,
          priceAtSale: variant.price
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
            create: itemsToCreate
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
    }, {
      timeout: 10000
    });
  },

  async getSalesByTenant(tenantId: string, { page = 1, limit = 50 }: PaginationOptions = {}) {
    const skip = (page - 1) * limit;
    return prisma.sale.findMany({
      where: { tenantId },
      include: {
        items: {
          include: {
            variant: {
              include: {
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
      include: {
        items: {
          include: {
            variant: {
              include: {
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
      totalRevenue: sales._sum.total || 0,
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
      totalRevenue: sales._sum.total || 0,
      totalOrders: sales._count.saleId || 0
    };
  },

  async getProfitMonth(tenantId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const items = await prisma.saleItem.findMany({
      where: {
        sale: {
          tenantId,
          createdAt: {
            gte: thirtyDaysAgo,
          },
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
    });

    let totalRevenue = 0;
    let totalCost = 0;

    for (const item of items) {
      const quantity = item.quantity;
      const price = Number(item.priceAtSale);
      const cost = Number(item.variant.cost);

      totalRevenue += price * quantity;
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

  // Total de prendas (unidades) vendidas hoy — suma de SaleItem.quantity
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

  // Ingresos por abonos (pagos de fiados - Capa 6) recibidos hoy
  async getPaymentsToday(tenantId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await prisma.payment.aggregate({
      where: {
        tenantId,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      _sum: { amount: true },
      _count: { paymentId: true },
    });

    return {
      totalRevenue: Number(result._sum.amount ?? 0),
      totalPayments: result._count.paymentId ?? 0,
    };
  },

  // Alertas urgentes: variantes con stock = 0 y clientes con deuda grave (> 30 días sin abonar)
  async getUrgentAlerts(tenantId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [zeroStockCount, severeDebtsCount] = await Promise.all([
      // Variantes activas con stock en 0
      prisma.inventory.count({
        where: {
          stock: 0,
          variant: { isActive: true, product: { tenantId } },
        },
      }),
      // Clientes con deuda > 0 cuyo último pago tiene más de 30 días (o nunca han abonado)
      prisma.customer.count({
        where: {
          tenantId,
          totalDebt: { gt: 0 },
          OR: [
            // Nunca han pagado pero tienen deuda
            { payments: { none: {} } },
            // Último pago fue hace más de 30 días
            {
              payments: {
                none: { createdAt: { gte: thirtyDaysAgo } },
              },
            },
          ],
        },
      }),
    ]);

    return {
      zeroStockCount,
      severeDebtsCount,
      total: zeroStockCount + severeDebtsCount,
    };
  },
};

export default salesRepository;
