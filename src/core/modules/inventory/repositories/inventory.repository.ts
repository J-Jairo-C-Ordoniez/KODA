import prisma from '@/infrastructure/db/client';

const inventoryRepository = {
  async getInventoryByVariantId(variantId: string) {
    return await prisma.inventory.findFirst({
      where: { variantId: variantId },
    });
  },

  async getAllProductsWithInventory(tenantId: string) {
    return await prisma.product.findMany({
      where: { tenantId: tenantId },
      include: {
        category: true,
        variants: {
          include: {
            inventories: {
              take: 1,
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  },

  async createOrUpdateStock(variantId: string, stock: number) {
    const existing = await inventoryRepository.getInventoryByVariantId(variantId);
    if (existing) {
      return await prisma.inventory.update({
        where: { inventoryId: existing.inventoryId },
        data: { stock: stock }
      });
    } else {
      return await prisma.inventory.create({
        data: {
          variantId: variantId,
          stock: stock
        }
      });
    }
  },

  async getTotalStock(tenantId: string) {
    const result = await prisma.inventory.aggregate({
      where: {
        variant: {
          product: { tenantId: tenantId }
        }
      },
      _sum: { stock: true }
    });
    return result._sum.stock || 0;
  },

  async getLowStockItems(tenantId: string) {
    const items = await prisma.inventory.aggregate({
      where: {
        variant: {
          product: { tenantId: tenantId }
        },
        stock: { lt: 2 }
      },
      _count: {
        inventoryId: true,
      }
    });

    return { totalLowStockItems: items._count.inventoryId };
  },

  async getInvestedCapital(tenantId: string): Promise<number> {
    const variants = await prisma.variant.findMany({
      where: { product: { tenantId: tenantId } },
      include: { inventories: { select: { stock: true } } }
    });

    return variants.reduce((acc, variant) => {
      const totalStock = variant.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      const cost = Number(variant.cost || 0);
      return acc + (totalStock * cost);
    }, 0);
  },

  async getCriticalStockCount(tenantId: string): Promise<number> {
    const result = await prisma.inventory.count({
      where: {
        variant: { product: { tenantId: tenantId } },
        stock: { 
          gt: 0,
          lte: 4 
        }
      }
    });
    return result;
  },

  async getTopSales(tenantId: string, limit: number = 3) {
    const variants = await prisma.variant.findMany({
      where: { product: { tenantId: tenantId } },
      include: {
        product: { select: { name: true } },
        inventories: { select: { stock: true } },
        saleItems: { select: { quantity: true } }
      }
    });

    const topVariants = variants.map(v => {
      const totalSold = v.saleItems.reduce((sum, item) => sum + item.quantity, 0);
      const currentStock = v.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      
      return {
        variantId: v.variantId,
        productName: v.product.name,
        size: v.size,
        stock: currentStock,
        totalSold: totalSold
      };
    })
    .filter(v => v.totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, limit);

    return topVariants;
  },

  async getStagnantItems(tenantId: string, limit: number = 2) {
    const variants = await prisma.variant.findMany({
      where: {
        product: { tenantId: tenantId },
        inventories: { some: { stock: { gt: 0 } } }
      },
      include: {
        product: { select: { name: true } },
        inventories: { select: { stock: true } },
        saleItems: {
          include: { sale: { select: { createdAt: true } } },
          orderBy: { sale: { createdAt: 'desc' } },
          take: 1 
        }
      }
    });

    const now = new Date();
    
    const stagnant = variants.map(v => {
      const currentStock = v.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      
      // Si nunca se ha vendido, calculamos desde su fecha de creación
      let lastSaleDate = v.createdAt; 
      if (v.saleItems.length > 0) {
        lastSaleDate = v.saleItems[0].sale.createdAt;
      }

      // Cálculo de días usando milisegundos
      const diffTime = Math.abs(now.getTime() - lastSaleDate.getTime());
      const daysWithoutSale = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        variantId: v.variantId,
        productName: v.product.name,
        size: v.size,
        stock: currentStock,
        daysWithoutSale: daysWithoutSale
      };
    })
    .sort((a, b) => b.daysWithoutSale - a.daysWithoutSale) // Ordenar por los que llevan MÁS días
    .slice(0, limit);

    return stagnant;
  },

  async getOutOfStockItems(tenantId: string, limit: number = 2) {
    const variants = await prisma.variant.findMany({
      where: { product: { tenantId: tenantId } },
      include: {
        product: { select: { name: true } },
        inventories: { select: { stock: true } }
      }
    });

    const outOfStock = variants.filter(v => {
      const totalStock = v.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      return totalStock === 0;
    }).slice(0, limit);

    return outOfStock.map(v => ({
      variantId: v.variantId,
      productName: v.product.name,
      size: v.size,
      sku: v.sku
    }));
  }
};

export default inventoryRepository;