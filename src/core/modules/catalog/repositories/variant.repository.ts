import prisma from '@/infrastructure/db/client';

const variantRepository = {
  async getAll() {
    return await prisma.variant.findMany({
      include: { product: true }
    });
  },

  async getById(variantId: string) {
    return await prisma.variant.findUnique({
      where: { variantId: variantId },
      include: { product: true }
    });
  },

  async create(data: any) {
    return await prisma.variant.create({
      data: {
        productId: data.productId, // should be string directly
        name: data.name,
        sku: data.sku,
        color: data.color,
        size: data.size,
        price: parseFloat(data.price),
        image: data.image,
        isActive: data.isActive === true || data.isActive === 'true'
      }
    });
  },

  async update(variantId: string, data: any) {
    return await prisma.variant.update({
      where: { variantId: variantId },
      data: {
        name: data.name,
        sku: data.sku,
        color: data.color,
        size: data.size,
        price: parseFloat(data.price),
        image: data.image,
        isActive: data.isActive === true || data.isActive === 'true'
      }
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
