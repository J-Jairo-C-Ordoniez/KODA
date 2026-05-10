import { apiResponse } from '@/core/utils/apiResponse';
import planService from '../services/plan.service';

const planController = {
  async getPlans() {
    try {
      const plans = await planService.getPlans();
      return apiResponse.success(plans);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error interno del servidor', 500);
    }
  },

  async createPlan(data: any) {
    try {
      const plan = await planService.createPlan(data);
      return apiResponse.success(plan, 201);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async updatePlan(id: string, data: any) {
    try {
      const plan = await planService.updatePlan(id, data);
      return apiResponse.success(plan);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async deletePlan(id: string) {
    try {
      await planService.deletePlan(id);
      return apiResponse.success({ message: 'Plan eliminado correctamente' });
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  }
};

export default planController;
