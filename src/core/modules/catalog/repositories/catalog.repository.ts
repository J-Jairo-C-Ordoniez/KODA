import prisma from '@/infrastructure/db/client';

export class CatalogRepository {
  async getAllProducts(filters = {}) {
    const { categoryId, gender, search, color, page = 1, limit = 12 } = filters;

    const whereClause = { isActive: true };

    const productFilters = {};
    if (categoryId) productFilters.categoryId = parseInt(categoryId);
    if (gender) productFilters.gender = { in: [gender, 'mixto'] };
    
    if (Object.keys(productFilters).length > 0) {
      whereClause.product = productFilters;
    }

    if (color) {
      const colorsArray = color.split(',').map(c => c.trim()).filter(Boolean);
      if (colorsArray.length > 0) {
        whereClause.color = { in: colorsArray };
      }
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
        skip,
        take: limit
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
  }

  async getColors() {
    const variants = await prisma.variant.findMany({
      select: { color: true },
      distinct: ['color'],
      where: { isActive: true }
    });
    
    return variants
      .filter(v => v.color && v.color.trim() !== '')
      .map(v => ({ 
        id: v.color, 
        name: v.color.charAt(0).toUpperCase() + v.color.slice(1).toLowerCase() 
      }));
  }

  async getProductById(productId) {
    return await prisma.product.findUnique({
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
    });
  }

  async getCategories() {
    return await prisma.category.findMany();
  }

  async getPopularVariants(limit = 10) {
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
  }

  async getVariantById(variantId) {
    return await prisma.variant.findUnique({
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
    });
  }
}
