import subscriptionRepository from "../repositories/subscription.repository";
import { PaymentMethod } from "@prisma/client";

const subscriptionService = {
  async getAllSubscriptions() {
    try {
      return await subscriptionRepository.getAllSubscriptions();
    } catch (error) {
      throw error;
    }
  },

  async getSubscriptionStats() {
    try {
      return await subscriptionRepository.getSubscriptionStats();
    } catch (error) {
      throw error;
    }
  },

  async registerManualPayment(data: { subscriptionId: string; amount: number; method: PaymentMethod; manualEndDate?: string }) {
    try {
      const sub = await subscriptionRepository.getSubscriptionById(data.subscriptionId);
      if (!sub) throw new Error("Suscripción no encontrada");

      let newEndDate: Date;

      if (data.manualEndDate) {
        newEndDate = new Date(data.manualEndDate);
      } else {
        const currentEndDate = sub.endDate > new Date() ? sub.endDate : new Date();
        newEndDate = new Date(currentEndDate);
        
        if (sub.plan.interval.toLowerCase() === 'anual') {
          newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        } else {
          newEndDate.setMonth(newEndDate.getMonth() + 1);
        }
      }

      return await subscriptionRepository.registerManualPayment(
        data.subscriptionId, 
        data.amount, 
        data.method, 
        newEndDate,
        sub.tenantId
      );
    } catch (error) {
      throw error;
    }
  },

  async assignPlanAndPay(data: { tenantId: string; planId: string; amount: number; method: PaymentMethod; manualEndDate?: string; isFreeTrial?: boolean }) {
    try {
      const plan = await subscriptionRepository.getPlanById(data.planId);
      if (!plan) throw new Error("Plan no encontrado");

      let newEndDate: Date;

      if (data.manualEndDate) {
        newEndDate = new Date(data.manualEndDate);
      } else {
        newEndDate = new Date();
        
        if (plan.interval.toLowerCase() === 'anual') {
          newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        } else {
          newEndDate.setMonth(newEndDate.getMonth() + 1);
        }
      }

      const finalAmount = data.isFreeTrial ? 0 : data.amount;

      return await subscriptionRepository.assignPlanAndPay(
        data.tenantId,
        data.planId,
        finalAmount,
        data.method,
        newEndDate
      );
    } catch (error) {
      throw error;
    }
  }
}

export default subscriptionService;
