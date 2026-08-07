import tenantService, { RegisterFormData } from "../services/tenant.service";
import { apiResponse } from "@/backend/core/utils/apiResponse";

const tenantController = {
  async registerBusiness(data: RegisterFormData) {
    try {
      const tenant = await tenantService.registerBusiness(data);
      return apiResponse.success(tenant, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al registrar el negocio", 400);
    }
  },

  async countAllTenants() {
    try {
      const count = await tenantService.countAllTenants();
      return apiResponse.success({ count });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al contar negocios", 500);
    }
  },

  async countActiveTenants() {
    try {
      const count = await tenantService.countActiveTenants();
      return apiResponse.success({ count });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al contar negocios activos", 500);
    }
  },

  async countSuspendedTenants() {
    try {
      const count = await tenantService.countSuspendedTenants();
      return apiResponse.success({ count });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al contar negocios suspendidos", 500);
    }
  },

  async getMonthlyIncomes() {
    try {
      const incomes = await tenantService.getMonthlyIncomes();
      return apiResponse.success(incomes);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener ingresos mensuales", 500);
    }
  },

  async getOnboardingHealth() {
    try {
      const health = await tenantService.getOnboardingHealth();
      return apiResponse.success(health);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener salud del onboarding", 500);
    }
  },

  async getMonthlyChurnCount() {
    try {
      const churn = await tenantService.getMonthlyChurnCount();
      return apiResponse.success(churn);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener tasa de abandono mensual", 500);
    }
  },

  async getChurnRate() {
    try {
      const rate = await tenantService.getChurnRate();
      return apiResponse.success(rate);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener tasa de churn", 500);
    }
  },

  async getAllTenants() {
    try {
      const tenants = await tenantService.getAllTenants();
      return apiResponse.success(tenants);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener negocios", 500);
    }
  },

  async getTenantsFiltered(search?: string | null, status?: string | null) {
    try {
      const tenants = await tenantService.getTenantsFiltered(search || undefined, status || undefined);
      return apiResponse.success(tenants);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al buscar negocios", 500);
    }
  },

  async getTenantBySlug(slug: string) {
    try {
      const tenant = await tenantService.getTenantBySlug(slug);
      return apiResponse.success(tenant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Negocio no encontrado", 404);
    }
  },

  async updateTenantStatus(tenantId: string, status: string) {
    try {
      const tenant = await tenantService.updateTenantStatus(tenantId, status);
      return apiResponse.success(tenant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar estado del negocio", 500);
    }
  }
};

export default tenantController;