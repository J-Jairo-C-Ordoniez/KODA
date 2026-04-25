import prisma from '@/infrastructure/db/client';

const inventoryRepository = {
  async getInventoryByVariantId(variantId: string) {
    return await prisma.inventory.findFirst({
      where: { variantId: variantId },
    });
  },

  async getAllProductsWithInventory() {
    return await prisma.product.findMany({
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
  }
};

export default inventoryRepository;
