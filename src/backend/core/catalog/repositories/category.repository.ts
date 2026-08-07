import { type Prisma } from '@prisma/client';
import prisma from '@/infrastructure/db/client';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types';

const categoryRepository = {
  async getAll(tenantId: string) {
    return prisma.category.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: {
        categoryId: true,
        tenantId: true,
        name: true,
        description: true,
        icon: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { products: true } }
      }
    });
  },

  async getById(tenantId: string, categoryId: string) {
    return prisma.category.findFirst({
      where: { categoryId, tenantId },
      select: {
        categoryId: true,
        tenantId: true,
        name: true,
        description: true,
        icon: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { products: true } }
      }
    });
  },

  async create(tenantId: string, data: CreateCategoryDTO) {
    const categoryData: Prisma.CategoryCreateInput = {
      name: data.name,
      description: data.description || null,
      icon: data.icon || 'Tag',
      tenant: { connect: { tenantId } }
    };
    return prisma.category.create({
      data: categoryData
    });
  },

  async update(tenantId: string, categoryId: string, data: UpdateCategoryDTO) {
    const categoryData: Prisma.CategoryUpdateInput = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.icon !== undefined && { icon: data.icon }),
    };
    return prisma.category.update({
      where: { categoryId, tenantId },
      data: categoryData
    });
  },

  async delete(tenantId: string, categoryId: string) {
    return prisma.category.delete({
      where: { categoryId, tenantId }
    });
  }
};

export default categoryRepository;
