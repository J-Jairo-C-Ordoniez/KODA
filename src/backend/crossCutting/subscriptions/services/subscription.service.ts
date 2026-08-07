import subscriptionRepository from "../repositories/subscription.repository";
import { PaymentMethod } from "@prisma/client";

export interface ManualPaymentDTO {
  subscriptionId: string;
  amount: number;
  method: PaymentMethod;
  manualEndDate?: string;
}

export interface AssignPlanDTO {
  tenantId: string;
  planId: string;
  amount: number;
  method: PaymentMethod;
  manualEndDate?: string;
  isFreeTrial?: boolean;
}

const subscriptionService = {
  async getSubscription(tenantId: string) {
    return subscriptionRepository.getSubscriptionByTenantId(tenantId);
  },

  async getAllSubscriptions() {
    return subscriptionRepository.getAllSubscriptions();
  },

  async getSubscriptionStats() {
    return subscriptionRepository.getSubscriptionStats();
  },

  async registerManualPayment(data: ManualPaymentDTO) {
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

    return subscriptionRepository.registerManualPayment(
      data.subscriptionId, 
      data.amount, 
      data.method, 
      newEndDate,
      sub.tenantId
    );
  },

  async assignPlanAndPay(data: AssignPlanDTO) {
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

    return subscriptionRepository.assignPlanAndPay(
      data.tenantId,
      data.planId,
      finalAmount,
      data.method,
      newEndDate
    );
  }
};

export default subscriptionService;
