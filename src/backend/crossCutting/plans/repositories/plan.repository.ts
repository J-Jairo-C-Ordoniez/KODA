import prisma from '@/infrastructure/db/client';

export interface PlanData {
  name: string;
  description: string;
  price: number;
  interval: string;
  feature?: string[];
}

const planRepository = {
  async getAllPlans() {
    return prisma.plan.findMany({
      orderBy: { price: 'asc' }
    });
  },

  async getPlanById(planId: string) {
    return prisma.plan.findUnique({
      where: { planId }
    });
  },

  async createPlan(data: PlanData) {
    return prisma.plan.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        interval: data.interval || 'Mensual',
        feature: data.feature || [],
      }
    });
  },

  async updatePlan(planId: string, data: Partial<PlanData>) {
    return prisma.plan.update({
      where: { planId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: Number(data.price) }),
        ...(data.interval !== undefined && { interval: data.interval }),
        ...(data.feature !== undefined && { feature: data.feature }),
      }
    });
  },

  async deletePlan(planId: string) {
    const associatedSubs = await prisma.subscription.count({
      where: { planId }
    });

    if (associatedSubs > 0) {
      throw new Error(`No se puede eliminar el plan: tiene ${associatedSubs} suscripciones asociadas.`);
    }

    return prisma.plan.delete({
      where: { planId }
    });
  }
};

export default planRepository;
