import prisma from '@/infrastructure/db/client';

const inventoryRepository = {
  async getInventoryByVariantId(variantId: string) {
    return prisma.inventory.findFirst({
      where: { variantId },
    });
  },

  async getAllProductsWithInventory(tenantId: string) {
    return prisma.product.findMany({
      where: { tenantId },
      select: {
        productId: true,
        name: true,
        description: true,
        gender: true,
        isPublic: true,
        category: {
          select: { categoryId: true, name: true }
        },
        variants: {
          select: {
            variantId: true,
            name: true,
            sku: true,
            color: true,
            size: true,
            price: true,
            cost: true,
            popularity: true,
            isActive: true,
            inventories: {
              select: { inventoryId: true, stock: true },
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
      return prisma.inventory.update({
        where: { inventoryId: existing.inventoryId },
        data: { stock }
      });
    } else {
      return prisma.inventory.create({
        data: {
          variantId,
          stock
        }
      });
    }
  },

  async getTotalStock(tenantId: string) {
    const result = await prisma.inventory.aggregate({
      where: {
        variant: {
          product: { tenantId }
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
          product: { tenantId }
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
      where: { product: { tenantId } },
      select: {
        cost: true,
        inventories: { select: { stock: true } }
      }
    });

    return variants.reduce((acc, variant) => {
      const totalStock = variant.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      const cost = Number(variant.cost || 0);
      return acc + (totalStock * cost);
    }, 0);
  },

  async getCriticalStockCount(tenantId: string): Promise<number> {
    return prisma.inventory.count({
      where: {
        variant: { product: { tenantId } },
        stock: { 
          gt: 0,
          lte: 4 
        }
      }
    });
  },

  async getZeroStockCount(tenantId: string): Promise<number> {
    return prisma.inventory.count({
      where: {
        stock: 0,
        variant: { isActive: true, product: { tenantId } },
      },
    });
  },

  async getTopSales(tenantId: string, limit = 3) {
    const variants = await prisma.variant.findMany({
      where: { product: { tenantId } },
      select: {
        variantId: true,
        size: true,
        product: { select: { name: true } },
        inventories: { select: { stock: true } },
        saleItems: { select: { quantity: true } }
      }
    });

    return variants.map(v => {
      const totalSold = v.saleItems.reduce((sum, item) => sum + item.quantity, 0);
      const currentStock = v.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      
      return {
        variantId: v.variantId,
        productName: v.product.name,
        size: v.size,
        stock: currentStock,
        totalSold
      };
    })
    .filter(v => v.totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, limit);
  },

  async getStagnantItems(tenantId: string, limit = 2) {
    const variants = await prisma.variant.findMany({
      where: {
        product: { tenantId },
        inventories: { some: { stock: { gt: 0 } } }
      },
      select: {
        variantId: true,
        size: true,
        createdAt: true,
        product: { select: { name: true } },
        inventories: { select: { stock: true } },
        saleItems: {
          select: { sale: { select: { createdAt: true } } },
          orderBy: { sale: { createdAt: 'desc' } },
          take: 1 
        }
      }
    });

    const now = new Date();
    
    return variants.map(v => {
      const currentStock = v.inventories.reduce((sum, inv) => sum + inv.stock, 0);
      
      let lastSaleDate = v.createdAt; 
      if (v.saleItems.length > 0) {
        lastSaleDate = v.saleItems[0].sale.createdAt;
      }

      const diffTime = Math.abs(now.getTime() - lastSaleDate.getTime());
      const daysWithoutSale = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        variantId: v.variantId,
        productName: v.product.name,
        size: v.size,
        stock: currentStock,
        daysWithoutSale
      };
    })
    .sort((a, b) => b.daysWithoutSale - a.daysWithoutSale)
    .slice(0, limit);
  },

  async getOutOfStockItems(tenantId: string, limit = 2) {
    const variants = await prisma.variant.findMany({
      where: { product: { tenantId } },
      select: {
        variantId: true,
        sku: true,
        size: true,
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