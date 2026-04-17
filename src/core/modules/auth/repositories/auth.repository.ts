import prisma from '@/infrastructure/db/client';

export class AuthRepository {
  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async getUserById(userId) {
    return await prisma.user.findUnique({
      where: { userId: parseInt(userId) },
    });
  }

  async createCode(data) {
    return await prisma.code.create({
      data: {
        code: data.code,
        type: data.type,
        deadLine: data.deadLine,
        userId: data.userId
      }
    });
  }

  async getLatestCodeByUserId(userId, type) {
    return await prisma.code.findFirst({
      where: { 
        userId: parseInt(userId),
        type: type
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTenantWithAdmin(data: {
    businessName: string;
    ownerName: string;
    email: string;
    password: string;
    whatsApp: string;
    slug: string;
    planId: string;
  }) {
    return await prisma.$transaction(async (tx) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          businessName: data.businessName,
          whatsApp: data.whatsApp,
          slug: data.slug,
          status: 'active', // For demo/initial purpose, let's keep it active or as needed
        },
      });

      // 2. Create User (Admin)
      const user = await tx.user.create({
        data: {
          tenantId: tenant.tenantId,
          name: data.ownerName,
          email: data.email,
          password: data.password,
          role: 'admin',
          isVerified: true,
        },
      });

      // 3. Create initial Subscription
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30); // 30 days trial

      await tx.subscription.create({
        data: {
          tenantId: tenant.tenantId,
          planId: data.planId,
          endDate: endDate,
          status: 'active',
        },
      });

      return { tenant, user };
    });
  }

  async updateUserPassword(userId, newPassword) {
    return await prisma.user.update({
      where: { userId: parseInt(userId) },
      data: { password: newPassword }
    });
  }

  async deleteUserCodes(userId) {
    return await prisma.code.deleteMany({
      where: { userId: parseInt(userId) }
    });
  }
}
