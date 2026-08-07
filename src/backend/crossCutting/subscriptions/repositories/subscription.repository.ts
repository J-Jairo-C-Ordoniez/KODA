import prisma from "@/infrastructure/db/client";
import { PaymentMethod } from "@prisma/client";

const subscriptionRepository = {
  async getSubscriptionByTenantId(tenantId: string) {
    return prisma.subscription.findUnique({
      where: { tenantId },
      include: { plan: true }
    });
  },

  async getAllSubscriptions() {
    return prisma.tenant.findMany({
      select: {
        tenantId: true,
        businessName: true,
        slug: true,
        type: true,
        status: true,
        whatsApp: true,
        createdAt: true,
        subscription: {
          include: { plan: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getSubscriptionStats() {
    const subs = await prisma.subscription.findMany({
      select: {
        status: true,
        plan: {
          select: { price: true, interval: true }
        }
      },
      where: {
        status: { in: ['active', 'pastDue', 'mora'] }
      }
    });

    let mrr = 0;
    let activeCount = 0;
    let pastDueCount = 0;

    for (const sub of subs) {
      if (sub.status === 'active') activeCount++;
      if (sub.status === 'pastDue' || sub.status === 'mora') pastDueCount++;
      
      const price = Number(sub.plan.price);
      if (sub.plan.interval.toLowerCase() === 'anual') {
        mrr += (price / 12);
      } else {
        mrr += price;
      }
    }

    return { mrr, activeCount, pastDueCount };
  },

  async getSubscriptionById(subscriptionId: string) {
    return prisma.subscription.findUnique({
      where: { subscriptionId },
      include: { plan: true, tenant: true }
    });
  },

  async registerManualPayment(subscriptionId: string, amount: number, method: PaymentMethod, newEndDate: Date, tenantId: string) {
    return prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          subscriptionId,
          amount,
          paymentMethod: method,
        }
      });

      const updatedSub = await tx.subscription.update({
        where: { subscriptionId },
        data: {
          endDate: newEndDate,
          status: 'active'
        }
      });

      await tx.tenant.update({
        where: { tenantId },
        data: { status: 'active' }
      });

      return { transaction, updatedSub };
    });
  },
  
  async getPlanById(planId: string) {
    return prisma.plan.findUnique({ where: { planId } });
  },

  async assignPlanAndPay(tenantId: string, planId: string, amount: number, method: PaymentMethod, endDate: Date) {
    return prisma.$transaction(async (tx) => {
      const newSub = await tx.subscription.create({
        data: {
          tenantId,
          planId,
          endDate,
          status: 'active'
        }
      });

      const transaction = await tx.transaction.create({
        data: {
          subscriptionId: newSub.subscriptionId,
          amount,
          paymentMethod: method,
          reference: 'Asignación Inicial'
        }
      });

      await tx.tenant.update({
        where: { tenantId },
        data: { status: 'active' }
      });

      return { transaction, newSub };
    });
  }
};

export default subscriptionRepository;
