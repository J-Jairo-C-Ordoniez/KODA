import { apiResponse } from '@/backend/core/utils/apiResponse';
import dashboardService from '../services/dashboard.service';
import tenantService from '@/backend/crossCutting/tenants/services/tenant.service';

const dashboardController = {
  async getSidebarStats(tenantId: string) {
    try {
      const stats = await dashboardService.getSidebarStats(tenantId);
      return apiResponse.success(stats);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener estadísticas de barra lateral', 500);
    }
  },

  async getGeneralStats(tenantId: string) {
    try {
      const stats = await dashboardService.getGeneralStats(tenantId);
      return apiResponse.success(stats);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener vista general', 500);
    }
  },

  async getFinanceStats(tenantId: string) {
    try {
      const stats = await dashboardService.getFinanceStats(tenantId);
      return apiResponse.success(stats);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener estadísticas financieras', 500);
    }
  },

  async getInventoryStats(tenantId: string) {
    try {
      const stats = await dashboardService.getInventoryStats(tenantId);
      return apiResponse.success(stats);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener estadísticas de inventario', 500);
    }
  },

  async getConfigStats(tenantId: string) {
    try {
      const configStats = await dashboardService.getConfigStats(tenantId);
      return apiResponse.success(configStats);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener configuración de la tienda', 500);
    }
  },

  async updateStoreProfile(
    tenantId: string,
    body: {
      businessName: string;
      description: string;
      whatsApp: string;
      slug: string;
    }
  ) {
    try {
      const profile = await tenantService.updateStoreProfile(tenantId, body);
      return apiResponse.success(profile);
    } catch (error: any) {
      return apiResponse.error(error.message || 'No fue posible actualizar la tienda', 500);
    }
  },
};

export default dashboardController;