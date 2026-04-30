import prisma from '@/infrastructure/db/client';
import { CreateSaleDTO } from '../services/sales.service';
import { PaymentMethod } from '@prisma/client';

const salesRepository = {
  async createSale(tenantId: string, userId: string, data: CreateSaleDTO) {
    return prisma.$transaction(async (tx) => {
      const variantIds = data.items.map(item => item.variantId);
      
      // Fetch all variants with their current inventory in one query
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

        // Update inventory
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

  async getSalesByTenant(tenantId: string) {
    return prisma.sale.findMany({
      where: { tenantId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  select: { name: true }
                }
              }
            }
          }
        },
        user: { select: { name: true } },
        customer: true,
        tenant: {
          select: {
            businessName: true,
            whatsApp: true,
            description: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  },

  async getSalesByUser(tenantId: string, userId: string) {
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
        customer: true,
        tenant: {
          select: { businessName: true, whatsApp: true, description: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  },

  async getSalesToday(tenantId: string) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const sales = await prisma.sale.aggregate({
      where: {
        tenantId,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
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
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const sales = await prisma.sale.aggregate({
      where: {
        tenantId,
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
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

    // Group by day
    const trendMap: Record<string, number> = {};
    
    // Initialize last 30 days with 0
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
  }
};

export default salesRepository;
