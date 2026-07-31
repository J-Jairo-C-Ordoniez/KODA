import prisma from '@/infrastructure/db/client';
import { type Prisma } from '@prisma/client';

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
    };

    // Build the product-level filter
    const productFilter: any = {};
    if (tenantId) productFilter.tenantId = tenantId;

    if (category && category.trim().length > 0) {
      productFilter.category = {
        is: {
          OR: [
            { categoryId: category },
            { name: { equals: category.trim(), mode: 'insensitive' } }
          ]
        }
      };
    }

    if (gender) {
      productFilter.gender = { in: [gender, 'mixto'] as any };
    }

    if (Object.keys(productFilter).length > 0) {
      whereClause.product = { is: productFilter };
    }

    if (color && color.length > 0 && color[0].trim().length > 0) {
      whereClause.OR = color.map((c) => ({
        color: { equals: c.trim(), mode: 'insensitive' }
      }));
    }

    if (search && search.trim().length > 0) {
      const s = search.trim();
      const searchConditions = [
        { name: { contains: s, mode: 'insensitive' as const } },
        { color: { contains: s, mode: 'insensitive' as const } },
        { product: { is: { name: { contains: s, mode: 'insensitive' as const } } } },
        { product: { is: { description: { contains: s, mode: 'insensitive' as const } } } },
        { product: { is: { category: { is: { name: { contains: s, mode: 'insensitive' as const } } } } } },
      ];

      if (whereClause.OR) {
        whereClause.AND = [{ OR: whereClause.OR }, { OR: searchConditions }];
        delete whereClause.OR;
      } else {
        whereClause.OR = searchConditions;
      }
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
          sku: true,
          price: true,
          color: true,
          size: true,
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

  async getProductById(productId: string) {
    return await prisma.product.findUnique({
      where: { productId: productId },
      include: {
        category: true,
        variants: {
          include: {
            images: true,
            inventories: true
          }
        }
      }
    });
  },

  async getPopularVariants(tenantId: string, limit = 10) {
    return await prisma.variant.findMany({
      where: {
        isActive: true,
        product: { tenantId },
      },
      orderBy: { popularity: 'desc' },
      take: limit,
      select: {
        variantId: true,
        name: true,
        sku: true,
        price: true,
        color: true,
        size: true,
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
    });
  },

  async getVariantById(variantId: string) {
    return await prisma.variant.findUnique({
      where: { variantId: variantId },
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
    });
  }
}

export default catalogRepository;