import { Prisma } from '@prisma/client';
import prisma from '@/infrastructure/db/client';

const categoryRepository = {
  async getAll(tenantId: string) {
    return await prisma.category.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { products: true } }
      }
    });
  },

  async getById(tenantId: string, categoryId: string) {
    return await prisma.category.findFirst({
      where: { categoryId, tenantId },
      include: {
        _count: { select: { products: true } }
      }
    });
  },

  async create(tenantId: string, data: any) {
    const categoryData: Prisma.CategoryCreateInput = {
      name: data.name,
      description: data.description || null,
      icon: data.icon || 'Tag',
      tenant: { connect: { tenantId } }
    };
    return await prisma.category.create({
      data: categoryData
    });
  },

  async update(tenantId: string, categoryId: string, data: any) {
    const categoryData: Prisma.CategoryUpdateInput = {
      name: data.name,
      description: data.description,
      icon: data.icon
    };
    return await prisma.category.update({
      where: { categoryId, tenantId },
      data: categoryData
    });
  },

  async delete(tenantId: string, categoryId: string) {
    return await prisma.category.delete({
      where: { categoryId, tenantId }
    });
  }
};

export default categoryRepository;
