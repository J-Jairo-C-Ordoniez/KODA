import prisma from '@/infrastructure/db/client';

export class PolicyRepository {
  async getPolicyByTitle(title: string) {
    try {
      return await prisma.policy.findFirst({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      });
    } catch (error) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  }

  async getLatestPolicy() {
    try {
      return await prisma.policy.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  }

  async updatePolicy(content) {
    try {
      return await prisma.policy.update({
        where: {
          policyId: content.policyId
        },
        data: {
          content: content.content
        }
      });
    } catch (error) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  }
}
