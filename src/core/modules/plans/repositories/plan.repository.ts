import prisma from '@/infrastructure/db/client';

const planRepository = {
  async getAllPlans() {
    return await prisma.plan.findMany({
      orderBy: { price: 'asc' }
    });
  },

  async getPlanById(planId: string) {
    return await prisma.plan.findUnique({
      where: { planId }
    });
  },

  async createPlan(data: any) {
    return await prisma.plan.create({
      data: {
        ...data,
        price: Number(data.price)
      }
    });
  },

  async updatePlan(planId: string, data: any) {
    return await prisma.plan.update({
      where: { planId },
      data: {
        ...data,
        price: data.price ? Number(data.price) : undefined
      }
    });
  },

  async deletePlan(planId: string) {
    // Verificar si hay suscripciones asociadas
    const associatedSubs = await prisma.subscription.count({
      where: { planId }
    });

    if (associatedSubs > 0) {
      throw new Error(`No se puede eliminar el plan: tiene ${associatedSubs} suscripciones asociadas.`);
    }

    return await prisma.plan.delete({
      where: { planId }
    });
  }
};

export default planRepository;
