import prisma from '@/infrastructure/db/client';

const authRepository = {
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(userData: any) {
    return await prisma.user.create({
      data: userData,
    });
  },

  async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { userId },
    });
  },

  async createCode(data: any) {
    return await prisma.code.create({
      data: {
        code: data.code,
        type: data.type,
        deadLine: data.deadLine,
        userId: data.userId
      }
    });
  },

  async getLatestCodeByUserId(userId: string, type: any) {
    return await prisma.code.findFirst({
      where: { 
        userId: userId,
        type: type
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async updateUserPassword(userId: string, newPassword: string) {
    return await prisma.user.update({
      where: { userId },
      data: { password: newPassword }
    });
  },

  async deleteUserCodes(userId: string) {
    return await prisma.code.deleteMany({
      where: { userId }
    });
  }
};

export default authRepository;
