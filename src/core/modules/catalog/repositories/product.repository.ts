import prisma from '@/infrastructure/db/client';

const productRepository = {
  async getAll(tenantId: string) {
    return await prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: { category: true, variants: { include: { images: true, inventories: true } } }
    });
  },

  async getById(tenantId: string, productId: string) {
    return await prisma.product.findFirst({
      where: { productId, tenantId },
      include: { category: true, variants: { include: { images: true, inventories: true } } }
    });
  },

  async create(tenantId: string, data: any) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: data.categoryId,
        tenantId,
      }
    });
  },

  async update(tenantId: string, productId: string, data: any) {
    return await prisma.product.update({
      where: { productId, tenantId },
      data: {
        name: data.name,
        description: data.description,
        gender: data.gender,
        categoryId: data.categoryId
      }
    });
  },

  async delete(tenantId: string, productId: string) {
    return await prisma.product.delete({
      where: { productId, tenantId }
    });
  }
};

export default productRepository;
