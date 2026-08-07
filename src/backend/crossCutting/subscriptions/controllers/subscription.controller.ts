import subscriptionService from "../services/subscription.service";
import { apiResponse } from "@/backend/core/utils/apiResponse";
import { PaymentMethod } from "@prisma/client";

const subscriptionController = {
  async getAllSubscriptions() {
    try {
      const subs = await subscriptionService.getAllSubscriptions();
      return apiResponse.success(subs);
    } catch (error: any) {
      return apiResponse.error(error.message, 500);
    }
  },

  async getSubscriptionStats() {
    try {
      const stats = await subscriptionService.getSubscriptionStats();
      return apiResponse.success(stats);
    } catch (error: any) {
      return apiResponse.error(error.message, 500);
    }
  },

  async registerManualPayment(data: { subscriptionId: string; amount: number; method: PaymentMethod; manualEndDate?: string }) {
    try {
      const result = await subscriptionService.registerManualPayment(data);
      return apiResponse.success(result, 201);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async assignPlanAndPay(data: { tenantId: string; planId: string; amount: number; method: PaymentMethod; manualEndDate?: string; isFreeTrial?: boolean }) {
    try {
      const result = await subscriptionService.assignPlanAndPay(data);
      return apiResponse.success(result, 201);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  }
}

export default subscriptionController;
