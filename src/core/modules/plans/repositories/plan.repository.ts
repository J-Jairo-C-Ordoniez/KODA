import prisma from '@/infrastructure/db/client';

export class PlanRepository {
  async getAllPlans() {
    return await prisma.plan.findMany({
      orderBy: { price: 'asc' }
    });
  }
}
