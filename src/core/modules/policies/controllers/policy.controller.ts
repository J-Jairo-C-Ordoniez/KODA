import { apiResponse } from '@/core/utils/apiResponse';
import policyService from '../services/policy.service';

const policyController = {
  async getPolicyByTitle(title: string) {
    try {
      const data = await policyService.getPolicyByTitle(title);
      if (!data) {
        return apiResponse.error(`No se encontró la política: ${title}`, 404);
      }
      return apiResponse.success(data);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener política', 500);
    }
  },

  async getLatestPolicy() {
    try {
      const data = await policyService.getLatestPolicy();
      if (!data) {
        return apiResponse.error('No se encontraron políticas', 404);
      }
      return apiResponse.success(data);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener la última política', 500);
    }
  },

  async updatePolicy(data: any) {
    try {
      const updated = await policyService.updatePolicy(data);
      return apiResponse.success(updated);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al actualizar política', 500);
    }
  }
};

export default policyController;
