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

  async getTotalStock() {
    const result = await prisma.inventory.aggregate({
      _sum: { stock: true }
    });
    return result._sum.stock || 0;
  },

  async getLowStockItems(limit = 10) {
    return await prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: {
        variant: {
          include: {
            product: true
          }
        }
      },
      take: limit,
      orderBy: { stock: 'asc' }
    });
  }
};

export default inventoryRepository;
