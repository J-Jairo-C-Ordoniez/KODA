import prisma from "@/infrastructure/db/client";
import { SubscriptionStatus } from "@prisma/client";

const tenantRepository = {
  async createTenantWithAdmin(tenantData: any, adminData: any) {
    return await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          businessName: tenantData.businessName,
          type: tenantData.type || "ropa",
          whatsApp: tenantData.whatsApp,
          slug: tenantData.slug,
          status: SubscriptionStatus.noVerify,
        },
      });

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
  },

  async getAllTenants() {
    try {
      const tenants = await prisma.tenant.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { users: true, products: true } } }
      });

      return tenants;
    } catch (error) {
      return error;
    }
  },

  async findBySlug(slug: string) {
    return await prisma.tenant.findUnique({
      where: { slug },
    });
  },
}

export default tenantRepository;