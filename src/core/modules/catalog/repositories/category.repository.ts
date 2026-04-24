import prisma from '@/infrastructure/db/client';

const categoryRepository = {
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { products: true } }
      }
    });
  },

  async getById(id: string) {
    return await prisma.category.findUnique({
      where: { categoryId: Number(id) },
      include: {
        _count: { select: { products: true } }
      }
    });
  },

  async create(data: any) {
    return await prisma.category.create({
      data: {
        name: data.name
      }
    });
  },

  async update(id: string, data: any) {
    return await prisma.category.update({
      where: { categoryId: Number(id) },
      data: {
        name: data.name
      }
    });
  },

  async delete(id: string) {
    return await prisma.category.delete({
      where: { categoryId: Number(id) }
    });
  }
};

export default categoryRepository;
