import prisma from '@/infrastructure/db/client';

const employeeRepository = {
  async getEmployeesByTenant(tenantId: string) {
    return prisma.user.findMany({
      where: { tenantId, role: 'employee' },
      select: {
        userId: true,
        name: true,
        email: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { sales: true }
        },
        sales: {
          select: {
            saleId: true,
            total: true,
            paymentMethod: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async getEmployeeById(userId: string, tenantId: string) {
    return prisma.user.findFirst({
      where: { userId, tenantId, role: 'employee' },
      select: {
        userId: true,
        name: true,
        email: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        _count: { select: { sales: true } }
      }
    });
  },

  async createEmployee(data: { tenantId: string; name: string; email: string; password: string; avatar?: string }) {
    return prisma.user.create({
      data: {
        tenantId: data.tenantId,
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'employee',
        avatar: data.avatar,
        isVerified: true
      },
      select: {
        userId: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true
      }
    });
  },

  async updateEmployee(userId: string, tenantId: string, data: { name?: string; email?: string; password?: string; avatar?: string }) {
    return prisma.user.update({
      where: { userId, tenantId },
      data,
      select: {
        userId: true,
        name: true,
        email: true,
        avatar: true,
        updatedAt: true
      }
    });
  },

  async deleteEmployee(userId: string, tenantId: string) {
    return prisma.user.delete({
      where: { userId, tenantId }
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
};

export default employeeRepository;
