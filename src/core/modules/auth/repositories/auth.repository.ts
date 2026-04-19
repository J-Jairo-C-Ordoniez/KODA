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
