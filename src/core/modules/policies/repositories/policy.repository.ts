import prisma from '@/infrastructure/db/client';

const policyRepository = {
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
    } catch (error: any) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  },

  async getLatestPolicy() {
    try {
      return await prisma.policy.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error: any) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  },

  async updatePolicy(content: any) {
    try {
      return await prisma.policy.update({
        where: {
          policyId: content.policyId
        },
        data: {
          content: content.content
        }
      });
    } catch (error: any) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  }
};

export default policyRepository;
