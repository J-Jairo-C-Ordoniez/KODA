import prisma from '@/infrastructure/db/client';

export class VariantRepository {
  async getAll() {
    return await prisma.variant.findMany({
      include: { product: true }
    });
  }

  async getById(variantId) {
    return await prisma.variant.findUnique({
      where: { variantId: parseInt(variantId) },
      include: { product: true }
    });
  }

  async create(data) {
    return await prisma.variant.create({
      data: {
        productId: parseInt(data.productId),
        name: data.name,
        sku: data.sku,
        color: data.color,
        size: data.size,
        price: parseFloat(data.price),
        image: data.image,
        isActive: data.isActive === true || data.isActive === 'true'
      }
    });
  }

  async update(variantId, data) {
    return await prisma.variant.update({
      where: { variantId: parseInt(variantId) },
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
  }

  async delete(variantId) {
    return await prisma.variant.delete({
      where: { variantId: parseInt(variantId) }
    });
  }

  async incrementPopularity(variantId, amount = 1) {
    return await prisma.variant.update({
      where: { variantId: parseInt(variantId) },
      data: {
        popularity: {
          increment: amount
        }
      }
    });
  }
}
