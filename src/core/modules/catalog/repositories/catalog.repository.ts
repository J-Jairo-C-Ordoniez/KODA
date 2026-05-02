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
    };

    // Build the product-level filter
    const productFilter: any = {};
    if (tenantId) productFilter.tenantId = tenantId;
    if (category && category.length > 0) productFilter.categoryId = category;
    if (gender) productFilter.gender = { in: [gender, 'mixto'] as any };

    if (search && search.trim().length > 0) {
      // When searching, use a broad OR across variant + product fields
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { color: { contains: search, mode: 'insensitive' } },
        { product: { name: { contains: search, mode: 'insensitive' } } },
        { product: { description: { contains: search, mode: 'insensitive' } } },
        { product: { category: { name: { contains: search, mode: 'insensitive' } } } },
      ];
      // Still scope to this tenant if provided
      if (Object.keys(productFilter).length > 0) {
        whereClause.product = { is: productFilter };
      }
    } else {
      if (Object.keys(productFilter).length > 0) {
        whereClause.product = { is: productFilter };
      }
    }

    if (color && color.length > 0) {
      whereClause.color = { in: color };
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