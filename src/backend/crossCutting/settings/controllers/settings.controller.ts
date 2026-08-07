import settingsService from '../services/settings.service';
import { apiResponse } from '@/backend/core/utils/apiResponse';

const settingsController = {
  async getSettings(tenantId: string) {
    try {
      const settings = await settingsService.getSettings(tenantId);
      return apiResponse.success(settings);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async updateTenant(tenantId: string, data: any) {
    try {
      const updated = await settingsService.updateTenant(tenantId, data);
      return apiResponse.success(updated);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async uploadLogo(tenantId: string, file: File) {
    try {
      const result = await settingsService.uploadLogo(tenantId, file);
      return apiResponse.success(result);
    } catch (error: any) {
      return apiResponse.error(error.message, 500);
    }
  },
};

export default settingsController;
