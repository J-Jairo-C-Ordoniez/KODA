import prisma from '@/infrastructure/db/client';

export class ProductRepository {
  async getAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true, variants: true }
    });
  }

  async getById(productId) {
    return await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
      include: { category: true, variants: true }
    });
  }

  async create(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: parseInt(data.categoryId)
      }
    });
  }

  async update(productId, data) {
    return await prisma.product.update({
      where: { productId: parseInt(productId) },
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: parseInt(data.categoryId)
      }
    });
  }

  async delete(productId) {
    return await prisma.product.delete({
      where: { productId: parseInt(productId) }
    });
  }
}
