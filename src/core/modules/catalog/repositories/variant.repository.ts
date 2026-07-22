import prisma from '@/infrastructure/db/client';

const variantRepository = {
  async getAll(tenantId?: string) {
    return await prisma.variant.findMany({
      where: tenantId ? { product: { tenantId } } : {},
      include: { 
        product: true,
        images: true,
        inventories: true
      }
    });
  },

  async getById(variantId: string) {
    return await prisma.variant.findUnique({
      where: { variantId: variantId },
      include: { product: true }
    });
  },

  async create(data: any) {
    return await prisma.$transaction(async (tx) => {
      const variant = await tx.variant.create({
        data: {
          productId: data.productId,
          name: data.name,
          sku: data.sku,
          color: data.color,
          size: data.size,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost || 0),
          isActive: data.isActive === true || data.isActive === 'true'
        }
      });

      if (data.image) {
        await tx.image.create({
          data: {
            variantId: variant.variantId,
            content: data.image,
            isPrimary: true
          }
        });
      }

      await tx.inventory.create({
        data: {
          variantId: variant.variantId,
          stock: parseInt(data.stock || 0)
        }
      });

      return variant;
    });
  },

  async update(variantId: string, data: any) {
    return await prisma.$transaction(async (tx) => {
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.sku !== undefined) updateData.sku = data.sku;
      if (data.color !== undefined) updateData.color = data.color;
      if (data.size !== undefined) updateData.size = data.size;
      if (data.price !== undefined) updateData.price = parseFloat(data.price);
      if (data.cost !== undefined) updateData.cost = parseFloat(data.cost || 0);
      if (data.isActive !== undefined) updateData.isActive = data.isActive === true || data.isActive === 'true';

      const variant = await tx.variant.update({
        where: { variantId },
        data: updateData
      });

      if (data.image) {
        // Update or create primary image
        const existingImage = await tx.image.findFirst({
          where: { variantId, isPrimary: true }
        });

        if (existingImage) {
          await tx.image.update({
            where: { imageId: existingImage.imageId },
            data: { content: data.image }
          });
        } else {
          await tx.image.create({
            data: {
              variantId,
              content: data.image,
              isPrimary: true
            }
          });
        }
      }

      if (data.stock !== undefined) {
        const stockVal = parseInt(data.stock);
        const existingStock = await tx.inventory.findFirst({
          where: { variantId }
        });

        if (existingStock) {
          await tx.inventory.update({
            where: { inventoryId: existingStock.inventoryId },
            data: { stock: stockVal }
          });
        } else {
          await tx.inventory.create({
            data: {
              variantId,
              stock: stockVal
            }
          });
        }
      }

      return variant;
    });
  },

  async delete(variantId: string) {
    return await prisma.variant.delete({
      where: { variantId: variantId }
    });
  },

  async incrementPopularity(variantId: string, amount = 1) {
    return await prisma.variant.update({
      where: { variantId: variantId },
      data: {
        popularity: {
          increment: amount
        }
      }
    });
  },

  async getTotalStock(tenantId?: string) {
    const result = await prisma.inventory.aggregate({
      _sum: { stock: true },
      where: tenantId ? {
        variant: {
          product: { tenantId }
        }
      } : {}
    });
    return result._sum.stock || 0;
  },
};

export default variantRepository;
