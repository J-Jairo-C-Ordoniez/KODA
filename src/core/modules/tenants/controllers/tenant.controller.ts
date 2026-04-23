import tenantService from "../services/tenant.service";

const tenantController = {
    async registerBusiness(data: any) {
        try {
            const tenant = await tenantService.registerBusiness(data);
            return tenant;
        } catch (error) {
            return error;
        }
    },

    async countAllTenants() {
        try {
            const tenants = await tenantService.countAllTenants();
            return tenants;
        } catch (error) {
            return error;
        }
    },

    async countActiveTenants() {
        try {
            const count = await tenantService.countActiveTenants();
            return count;
        } catch (error) {
            return error;
        }
    },

    async getMonthlyIncomes() {
        try {
            return await tenantService.getMonthlyIncomes();
        } catch (error) {
            return error;
        }
    },

    async getOnboardingHealth() {
        try {
            return await tenantService.getOnboardingHealth();
        } catch (error) {
            return error;
        }
    },

    async getMonthlyChurnCount() {
        try {
            return await tenantService.getMonthlyChurnCount();
        } catch (error) {
            return error;
        }
    },

    async getChurnRate() {
        try {
            return await tenantService.getChurnRate();
        } catch (error) {
            return error;
        }
    },

    async getAllTenants() {
        try {
            const tenants = await tenantService.getAllTenants();
            return tenants;
        } catch (error) {
            return error;
        }
    },

    async getTenantsFiltered(search?: string, status?: string) {
        try {
            const tenants = await tenantService.getTenantsFiltered(search, status);
            return tenants;
        } catch (error) {
            return error;
        }
    },

    async getTenantBySlug(slug: string) {
        try {
            const tenant = await tenantService.getTenantBySlug(slug);
            return tenant;
        } catch (error) {
            return error;
        }
    }
}

export default tenantController;