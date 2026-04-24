import prisma from '@/infrastructure/db/client';

const planRepository = {
  async getAllPlans() {
    return await prisma.plan.findMany({
      orderBy: { price: 'asc' }
    });
  }
};

export default planRepository;
