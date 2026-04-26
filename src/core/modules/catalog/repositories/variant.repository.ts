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
      const variant = await tx.variant.update({
        where: { variantId },
        data: {
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
  }
};

export default variantRepository;
