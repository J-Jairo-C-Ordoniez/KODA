import { apiResponse } from '@/core/utils/apiResponse';
import planService from '../services/plan.service';

const planController = {
  async getPlans() {
    try {
      const plans = await planService.getPlans();
      return apiResponse.success(plans);
    } catch (error: any) {
      console.error('Error in PlanController:', error);
      return apiResponse.error(error.message || 'Error interno del servidor', 500);
    }
  }
};

export default planController;
