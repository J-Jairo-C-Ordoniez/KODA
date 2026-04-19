import { TenantRepository } from "../repositories/tenant.repository";
import { slugify } from "@/core/utils/slugify";
import bcrypt from "bcryptjs";

export class TenantService {
  private repository: TenantRepository;

  constructor() {
    this.repository = new TenantRepository();
  }

  async registerBusiness(data: any) {
    try {
      // 1. Generate unique slug
      let slug = slugify(data.businessName);
      const existingTenant = await this.repository.findBySlug(slug);
      
      if (existingTenant) {
        // If slug exists, add random suffix
        slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
      }

      // 2. Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // 3. Create Tenant + User
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

      return await this.repository.createTenantWithAdmin(tenantData, adminData);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        if (field === 'email') throw new Error('Este correo electrónico ya está registrado. Intenta con otro.');
        if (field === 'slug') throw new Error('El nombre de este negocio ya está en uso o es muy similar a uno existente.');
      }
      
      console.error('Registration Error Details:', error);
      throw new Error(error.message || 'Error inesperado al registrar el negocio. Por favor intenta de nuevo.');
    }
  }
}
