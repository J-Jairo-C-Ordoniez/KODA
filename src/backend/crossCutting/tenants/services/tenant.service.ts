import tenantRepository from "../repositories/tenant.repository";
import { slugify } from "@/backend/core/utils/slugify";
import bcrypt from "bcryptjs";
import { RegisterTenantData, RegisterAdminData, UpdateStoreProfileData } from "../repositories/tenant.repository";

export interface RegisterFormData extends RegisterTenantData, RegisterAdminData {}

const tenantService = {
  async registerBusiness(data: RegisterFormData) {
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
      slug,
    };

    const adminData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    return tenantRepository.createTenantWithAdmin(tenantData, adminData);
  },

  async countAllTenants() {
    return tenantRepository.countAllTenants();
  },

  async countActiveTenants() {
    return tenantRepository.countActiveTenants();
  },

  async countSuspendedTenants() {
    return tenantRepository.countSuspendedTenants();
  },

  async getMonthlyIncomes() {
    return tenantRepository.getMonthlyIncomes();
  },

  async getOnboardingHealth() {
    return tenantRepository.getOnboardingHealth();
  },

  async getMonthlyChurnCount() {
    return tenantRepository.getMonthlyChurnCount();
  },

  async getChurnRate() {
    return tenantRepository.getChurnRate();
  },

  async getAllTenants() {
    return tenantRepository.getAllTenants();
  },

  async getTenantsFiltered(search?: string, status?: string) {
    return tenantRepository.getTenantsFiltered(search, status);
  },

  async getTenantBySlug(slug: string) {
    const tenant = await tenantRepository.findBySlug(slug);
    if (!tenant) throw new Error("Negocio no encontrado");
    return tenant;
  },

  async updateTenantStatus(tenantId: string, status: string) {
    return tenantRepository.updateTenantStatus(tenantId, status);
  },

  async getStoreProfile(tenantId: string) {
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
  },

  async updateStoreProfile(tenantId: string, data: UpdateStoreProfileData) {
    const currentTenant = await tenantRepository.getStoreProfile(tenantId);

    if (!currentTenant) {
      throw new Error("La tienda no existe.");
    }

    if (data.slug !== currentTenant.slug) {
      const slugExists = await tenantRepository.findBySlug(data.slug);

      if (slugExists) {
        throw new Error("El enlace del catálogo ya está siendo utilizado.");
      }
    }

    return tenantRepository.updateStoreProfile(tenantId, data);
  }
};

export default tenantService;