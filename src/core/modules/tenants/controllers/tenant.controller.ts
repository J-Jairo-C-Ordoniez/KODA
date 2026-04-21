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

    async getAllTenants() {
        try {
            const tenants = await tenantService.getAllTenants();
            return tenants;
        } catch (error) {
            return error;
        }
    },
}

export default tenantController;