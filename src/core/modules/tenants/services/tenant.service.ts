import tenantRepository from "../repositories/tenant.repository";
import { slugify } from "@/core/utils/slugify";
import bcrypt from "bcryptjs";
import { RegisterTenantData, RegisterAdminData, UpdateStoreProfileData } from "../repositories/tenant.repository";


interface RegisterFormData extends RegisterTenantData, RegisterAdminData { }


const tenantService = {
  async registerBusiness(data: RegisterFormData) {
    try {
      let slug = slugify(data.businessName);
      const existingTenant = await tenantRepository.findBySlug(slug);

      if (existingTenant) {
        slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const tenantData = {
        businessName: data.businessName,
        type: data.type,
        whatsApp: data.whatsApp,
        slug: slug,
      };

      const adminData = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      };

      return await tenantRepository.createTenantWithAdmin(tenantData, adminData);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        if (field === 'email') return { error: 'El correo electrónico ya está registrado. Intenta con otro.' };
        if (field === 'slug') return { error: 'El nombre del negocio ya está en uso o es muy similar a uno existente.' };
      }

      return { error: error.message || 'Error inesperado al registrar el negocio. Por favor intenta de nuevo.' };
    }
  },

  async countAllTenants() {
    try {
      const tenants = await tenantRepository.countAllTenants();
      return tenants;
    } catch (error) {
      console.error('Error al obtener los tenants:', error);
      throw error;
    }
  },

  async countActiveTenants() {
    try {
      const count = await tenantRepository.countActiveTenants();

      return count;
    } catch (error) {
      return error;
    }
  },

  async countSuspendedTenants() {
    try {
      const count = await tenantRepository.countSuspendedTenants();

      return count;
    } catch (error) {
      return error;
    }
  },

  async getMonthlyIncomes() {
    try {
      return await tenantRepository.getMonthlyIncomes();
    } catch (error) {
      return error;
    }
  },

  async getOnboardingHealth() {
    try {
      return await tenantRepository.getOnboardingHealth();
    } catch (error) {
      return error;
    }
  },

  async getMonthlyChurnCount() {
    try {
      return await tenantRepository.getMonthlyChurnCount();
    } catch (error) {
      return error;
    }
  },

  async getChurnRate() {
    try {
      return await tenantRepository.getChurnRate();
    } catch (error) {
      return error;
    }
  },

  async getAllTenants() {
    try {
      const tenants = await tenantRepository.getAllTenants();
      return tenants;
    } catch (error) {
      return error;
    }
  },

  async getTenantsFiltered(search?: string, status?: string) {
    try {
      const tenants = await tenantRepository.getTenantsFiltered(search, status);
      return tenants;
    } catch (error) {
      return error;
    }
  },

  async getTenantBySlug(slug: string) {
    try {
      const tenant = await tenantRepository.findBySlug(slug);
      return tenant;
    } catch (error) {
      return error;
    }
  },

  async updateTenantStatus(tenantId: string, status: string) {
    try {
      return await tenantRepository.updateTenantStatus(tenantId, status);
    } catch (error) {
      return error;
    }
  },

  async getStoreProfile(tenantId: string) {
    try {
      const tenant = await tenantRepository.getStoreProfile(tenantId);

      if (!tenant) {
        throw new Error("Información de la tienda no encontrada.");
      }

      return {
        tenantId: tenant.tenantId,
        businessName: tenant.businessName,
        description: tenant.description,
        whatsApp: tenant.whatsApp,
        slug: tenant.slug,
        logo: tenant.aboutUs.length > 0 ? tenant.aboutUs[0].logo : null
      };
    } catch (error) {
      throw error;
    }
  },

  async updateStoreProfile(tenantId: string, data: UpdateStoreProfileData) {
    try {

      const currentTenant = await tenantRepository.getStoreProfile(tenantId);

      if (!currentTenant) {
        throw new Error("La tienda no existe.");
      }

      if (data.slug !== currentTenant.slug) {

        const slugExists = await tenantRepository.findBySlug(data.slug);

        if (slugExists) {
          throw new Error(
            "El enlace del catálogo ya está siendo utilizado."
          );
        }
      }

      return await tenantRepository.updateStoreProfile(
        tenantId,
        data
      );

    } catch (error) {
      throw error;
    }
  }
}

export default tenantService;