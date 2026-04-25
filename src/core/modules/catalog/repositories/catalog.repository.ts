import prisma from '@/infrastructure/db/client';
import { Prisma } from '@prisma/client';

const catalogRepository = {
  async getCategories(tenantId: string) {
    const tenantCategories = await prisma.category.findMany({
      where: { tenantId: tenantId },
      select: {
        categoryId: true,
        name: true,
      }
    });

    return tenantCategories;
  },

  async getColors(tenantId: string) {
    const colors = await prisma.variant.findMany({
      where: { product: { tenantId: tenantId } },
      select: {
        variantId: true,
        color: true
      },
      distinct: ['color']
    });

    return colors;
  },

  async getPublicCatalog(tenantId: string, filters: { category?: string, gender?: string, search?: string, color?: string[], page?: number, limit?: number }) {
    const { category, gender, search, color, page = 1, limit = 12 } = filters;

    const whereClause: Prisma.VariantWhereInput = {
      isActive: true,
      product: {
        is: {
          tenantId: tenantId,
          ...(category && typeof category === 'string' && category.length > 0 && { categoryId: category }),
          ...(gender && { gender: { in: [gender, 'mixto'] as any } }),
        }
      }
    };

    if (color && color.length > 0) {
      whereClause.color = { in: color };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { product: { name: { contains: search } } },
        { product: { description: { contains: search } } }
      ];
    }

    const skip = (page - 1) * limit;

    const [variants, total] = await Promise.all([
      prisma.variant.findMany({
        where: whereClause,
        orderBy: { popularity: 'desc' },
        skip,
        take: limit,
        select: {
          variantId: true,
          name: true,
          price: true,
          color: true,
          inventories: {
            select: { stock: true }
          },
          product: {
            select: {
              productId: true,
              name: true,
              gender: true,
              category: {
                select: { name: true }
              }
            }
          },
          images: {
            select: { imageId: true, content: true },
            take: 2
          }
        }
      }),

      prisma.variant.count({
        where: whereClause
      })
    ]);

    return {
      items: variants,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  },

  async getProductById(productId) {
    return /* await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
      include: {
        category: true,
        variants: {
          include: {
            images: true,
            inventories: true
          }
        }
      }
    }); */
  },

  async getPopularVariants(tenantId: string, limit = 10) {
    return await prisma.variant.findMany({
      where: { isActive: true },
      include: {
        product: {
          include: {
            category: true
          }
        },
        images: true,
        inventories: true
      },
      orderBy: {
        popularity: 'desc'
      },
      take: limit
    });
  },

  async getVariantById(variantId) {
    return /* await prisma.variant.findUnique({
      where: { variantId: parseInt(variantId) },
      include: {
        product: {
          include: {
            category: true,
            variants: {
              where: { isActive: true },
              include: {
                images: true,
                inventories: true
              }
            }
          }
        },
        images: true,
        inventories: true
      }
    }); */
  }
}


export default catalogRepository;