import prisma from '@/infrastructure/db/client';

export class CategoryRepository {
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { products: true } }
      }
    });
  }

  async getById(id) {
    return await prisma.category.findUnique({
      where: { categoryId: Number(id) },
      include: {
        _count: { select: { products: true } }
      }
    });
  }

  async create(data) {
    return await prisma.category.create({
      data: {
        name: data.name
      }
    });
  }

  async update(id, data) {
    return await prisma.category.update({
      where: { categoryId: Number(id) },
      data: {
        name: data.name
      }
    });
  }

  async delete(id) {
    return await prisma.category.delete({
      where: { categoryId: Number(id) }
    });
  }
}
