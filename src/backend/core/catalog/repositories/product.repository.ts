import prisma from '@/infrastructure/db/client';
import { CreateProductDTO, UpdateProductDTO } from '../types';

const productRepository = {
  async getAll(tenantId: string) {
    return prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: {
        productId: true,
        tenantId: true,
        categoryId: true,
        name: true,
        description: true,
        gender: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: { categoryId: true, name: true }
        },
        variants: {
          select: {
            variantId: true,
            productId: true,
            name: true,
            sku: true,
            color: true,
            size: true,
            price: true,
            cost: true,
            popularity: true,
            isActive: true,
            images: {
              select: { imageId: true, content: true, isPrimary: true }
            },
            inventories: {
              select: { inventoryId: true, stock: true }
            }
          }
        }
      }
    });
  },

  async getById(tenantId: string, productId: string) {
    return prisma.product.findFirst({
      where: { productId, tenantId },
      select: {
        productId: true,
        tenantId: true,
        categoryId: true,
        name: true,
        description: true,
        gender: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: { categoryId: true, name: true }
        },
        variants: {
          select: {
            variantId: true,
            productId: true,
            name: true,
            sku: true,
            color: true,
            size: true,
            price: true,
            cost: true,
            popularity: true,
            isActive: true,
            images: {
              select: { imageId: true, content: true, isPrimary: true }
            },
            inventories: {
              select: { inventoryId: true, stock: true }
            }
          }
        }
      }
    });
  },

  async create(tenantId: string, data: CreateProductDTO) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description || '',
        gender: data.gender,
        categoryId: data.categoryId,
        isPublic: data.isPublic ?? true,
        tenantId,
      }
    });
  },

  async update(tenantId: string, productId: string, data: UpdateProductDTO) {
    return prisma.product.update({
      where: { productId, tenantId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.gender !== undefined && { gender: data.gender }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
      }
    });
  },

  async delete(tenantId: string, productId: string) {
    return prisma.product.delete({
      where: { productId, tenantId }
    });
  }
};

export default productRepository;
