import prisma from '@/infrastructure/db/client';

const productRepository = {
  async getAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true, variants: true }
    });
  },

  async getById(productId: string) {
    return await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
      include: { category: true, variants: true }
    });
  },

  async create(data: any) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: parseInt(data.categoryId),
        tenantId: data.tenantId,
      }
    });
  },

  async update(productId: string, data: any) {
    return await prisma.product.update({
      where: { productId: parseInt(productId) },
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: parseInt(data.categoryId)
      }
    });
  },

  async delete(productId: string) {
    return await prisma.product.delete({
      where: { productId: parseInt(productId) }
    });
  }
};

export default productRepository;
