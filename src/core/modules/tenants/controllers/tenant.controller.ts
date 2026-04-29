import tenantService from "../services/tenant.service";
import { apiResponse } from "@/core/utils/apiResponse";

const tenantController = {
    async registerBusiness(data: any) {
        try {
            const tenant = await tenantService.registerBusiness(data);
            return apiResponse.success(tenant, 201);
        } catch (error: any) {
            return apiResponse.error(error.message || "Error al registrar el negocio", 400);
        }
    },

    async countAllTenants() {
        try {
            const tenants = await tenantService.countAllTenants();
            return apiResponse.success(tenants);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async countActiveTenants() {
        try {
            const count = await tenantService.countActiveTenants();
            return apiResponse.success(count);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getMonthlyIncomes() {
        try {
            const incomes = await tenantService.getMonthlyIncomes();
            return apiResponse.success(incomes);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getOnboardingHealth() {
        try {
            const health = await tenantService.getOnboardingHealth();
            return apiResponse.success(health);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getMonthlyChurnCount() {
        try {
            const churn = await tenantService.getMonthlyChurnCount();
            return apiResponse.success(churn);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getChurnRate() {
        try {
            const rate = await tenantService.getChurnRate();
            return apiResponse.success(rate);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getAllTenants() {
        try {
            const tenants = await tenantService.getAllTenants();
            return apiResponse.success(tenants);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getTenantsFiltered(search?: string, status?: string) {
        try {
            const tenants = await tenantService.getTenantsFiltered(search, status);
            return apiResponse.success(tenants);
        } catch (error: any) {
            return apiResponse.error(error.message, 500);
        }
    },

    async getTenantBySlug(slug: string) {
        try {
            const tenant = await tenantService.getTenantBySlug(slug);
            return apiResponse.success(tenant);
        } catch (error: any) {
            return apiResponse.error(error.message, 404);
        }
    }
}

export default tenantController;