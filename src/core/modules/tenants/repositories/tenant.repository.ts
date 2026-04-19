import prisma from "@/infrastructure/db/client";
import { SubscriptionStatus } from "@prisma/client";

export class TenantRepository {
  async createTenantWithAdmin(tenantData: any, adminData: any) {
    return await prisma.$transaction(async (tx) => {
      // 1. Create the Tenant
      const tenant = await tx.tenant.create({
        data: {
          businessName: tenantData.businessName,
          type: tenantData.type || "ropa",
          whatsApp: tenantData.whatsApp,
          slug: tenantData.slug,
          status: SubscriptionStatus.noVerify,
        },
      });

      // 2. Create the Admin User for this Tenant
      const user = await tx.user.create({
        data: {
          tenantId: tenant.tenantId,
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
          role: "admin",
          isVerified: true,
        },
      });

      return { tenant, user };
    });
  }

  async findBySlug(slug: string) {
    return await prisma.tenant.findUnique({
      where: { slug },
    });
  }
}
