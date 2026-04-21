import tenantRepository from "../repositories/tenant.repository";
import { slugify } from "@/core/utils/slugify";
import bcrypt from "bcryptjs";


const tenantService = {
  async registerBusiness(data: any) {
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
        whatsApp: data.whatsapp,
        slug: slug,
      };

      const adminData = {
        name: data.ownerName,
        email: data.email,
        password: hashedPassword,
      };

      return await tenantRepository.createTenantWithAdmin(tenantData, adminData);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        if (field === 'email') return {error: 'El correo electrónico ya está registrado. Intenta con otro.'};
        if (field === 'slug') return {error: 'El nombre del negocio ya está en uso o es muy similar a uno existente.'};
      }
      
      return {error: error.message || 'Error inesperado al registrar el negocio. Por favor intenta de nuevo.'};
    }
  },

  async getAllTenants() {
    try {
      const tenants = await tenantRepository.getAllTenants();
      return tenants;
    } catch (error) {
      console.error('Error al obtener los tenants:', error);
      throw error;
    }
  },
}

export default tenantService;