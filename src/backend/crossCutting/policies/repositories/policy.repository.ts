import prisma from '@/infrastructure/db/client';

const policyRepository = {
  async getPolicyByTitle(title: string) {
    return prisma.policy.findFirst({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      }
    });
  },

  async getLatestPolicy() {
    return prisma.policy.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async updatePolicy(data: { policyId: number; content: any }) {
    return prisma.policy.update({
      where: {
        policyId: data.policyId
      },
      data: {
        content: data.content
      }
    });
  }
};

export default policyRepository;
