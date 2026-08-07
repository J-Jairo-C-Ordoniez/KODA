import prisma from '@/infrastructure/db/client';
import { CreateVariantDTO, UpdateVariantDTO } from '../types';
import { Prisma } from '@prisma/client';

const variantRepository = {
  async getAll(tenantId?: string) {
    return prisma.variant.findMany({
      where: tenantId ? { product: { tenantId } } : {},
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
        product: {
          select: { productId: true, name: true, tenantId: true }
        },
        images: {
          select: { imageId: true, content: true, isPrimary: true }
        },
        inventories: {
          select: { inventoryId: true, stock: true }
        }
      }
    });
  },

  async getById(variantId: string) {
    return prisma.variant.findUnique({
      where: { variantId },
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
        product: {
          select: { productId: true, name: true, tenantId: true }
        },
        images: {
          select: { imageId: true, content: true, isPrimary: true }
        },
        inventories: {
          select: { inventoryId: true, stock: true }
        }
      }
    });
  },

  async create(data: CreateVariantDTO & { image?: string }) {
    return prisma.$transaction(async (tx) => {
      const variant = await tx.variant.create({
        data: {
          productId: data.productId,
          name: data.name,
          sku: data.sku,
          color: data.color,
          size: data.size,
          price: Number(data.price),
          cost: Number(data.cost || 0),
          isActive: data.isActive ?? true
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
          stock: Number(data.stock || 0)
        }
      });

      return variant;
    });
  },

  async update(variantId: string, data: UpdateVariantDTO & { image?: string }) {
    return prisma.$transaction(async (tx) => {
      const updateData: Prisma.VariantUpdateInput = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.sku !== undefined) updateData.sku = data.sku;
      if (data.color !== undefined) updateData.color = data.color;
      if (data.size !== undefined) updateData.size = data.size;
      if (data.price !== undefined) updateData.price = Number(data.price);
      if (data.cost !== undefined) updateData.cost = Number(data.cost || 0);
      if (data.isActive !== undefined) updateData.isActive = data.isActive;

      const variant = await tx.variant.update({
        where: { variantId },
        data: updateData
      });

      if (data.image) {
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
        const stockVal = Number(data.stock);
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
    return prisma.variant.delete({
      where: { variantId }
    });
  },

  async incrementPopularity(variantId: string, amount = 1) {
    return prisma.variant.update({
      where: { variantId },
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
