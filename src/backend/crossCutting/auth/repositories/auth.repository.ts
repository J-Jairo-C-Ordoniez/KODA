import prisma from '@/infrastructure/db/client';
import { CodeType } from '@prisma/client';

const authRepository = {
  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(data: { tenantId?: string; name: string; email: string; password: string; role: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role as any,
        ...(data.tenantId && { tenantId: data.tenantId }),
      },
    });
  },

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { userId },
    });
  },

  async createCode(data: { userId: string; code: string; type: string; deadLine: Date }) {
    return prisma.code.create({
      data: {
        code: data.code,
        type: data.type as CodeType,
        deadLine: data.deadLine,
        userId: data.userId
      }
    });
  },

  async getLatestCodeByUserId(userId: string, type: string) {
    return prisma.code.findFirst({
      where: { 
        userId,
        type: type as CodeType
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async updateUserPassword(userId: string, newPassword: string) {
    return prisma.user.update({
      where: { userId },
      data: { password: newPassword }
    });
  },

  async deleteUserCodes(userId: string) {
    return prisma.code.deleteMany({
      where: { userId }
    });
  }
};

export default authRepository;
