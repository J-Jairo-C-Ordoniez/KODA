import prisma from '@/infrastructure/db/client';

export class InventoryRepository {
  async getInventoryByVariantId(variantId) {
    return await prisma.inventory.findFirst({
      where: { variantId: parseInt(variantId) },
    });
  }

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
  }

  async createOrUpdateStock(variantId, stock) {
    const existing = await this.getInventoryByVariantId(variantId);
    if (existing) {
      return await prisma.inventory.update({
        where: { inventoryId: existing.inventoryId },
        data: { stock: parseInt(stock) }
      });
    } else {
      return await prisma.inventory.create({
        data: {
          variantId: parseInt(variantId),
          stock: parseInt(stock)
        }
      });
    }
  }

  async getTotalStock() {
    const result = await prisma.inventory.aggregate({
      _sum: { stock: true }
    });
    return result._sum.stock || 0;
  }

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
}
