import prisma from "@/infrastructure/db/client";
import { SubscriptionStatus } from "@prisma/client";

export interface RegisterTenantData {
  businessName: string;
  whatsApp: string;
  type: string;
  slug: string;
}

export interface RegisterAdminData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateStoreProfileData {
  businessName: string;
  description: string;
  whatsApp: string;
  slug: string;
}

const tenantRepository = {
  async createTenantWithAdmin(tenantData: RegisterTenantData, adminData: RegisterAdminData) {
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

  async countAllTenants() {
    try {
      const tenants = await prisma.tenant.count();

      return tenants;
    } catch (error) {
      return error;
    }
  },

  async findBySlug(slug: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      select: {
        tenantId: true,
        slug: true,
        businessName: true,
        description: true,
        type: true,
        status: true,
        whatsApp: true,
      }
    });

    return tenant;
  },

  async countActiveTenants() {
    try {
      const count = await prisma.tenant.count({
        where: { status: 'active' },
      });

      return count;
    } catch (error) {
      return error;
    }
  },

  async countSuspendedTenants() {
    try {
      const count = await prisma.tenant.count({
        where: { status: 'suspended' },
      });

      return count;
    } catch (error) {
      return error;
    }
  },

  async getMonthlyIncomes() {
    const ahora = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

    const result = await prisma.transaction.aggregate({
      where: {
        paymentDate: {
          gte: inicioMes,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  },

  async getOnboardingHealth() {
    const stats = await prisma.tenant.groupBy({
      by: ['status'],
      where: {
        status: {
          in: ['active', 'noVerify']
        }
      },
      _count: {
        _all: true
      }
    });

    const counts = {
      active: stats.find(s => s.status === 'active')?._count._all || 0,
      noVerify: stats.find(s => s.status === 'noVerify')?._count._all || 0
    };

    const totalInteresados = counts.active + counts.noVerify;

    if (totalInteresados === 0) return 0;

    const conversionRate = Number(counts.active / totalInteresados) * 100;

    return {
      percentage: String(conversionRate.toFixed(1)),
      counts
    }
  },

  async getMonthlyChurnCount() {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const count = await prisma.tenant.count({
      where: {
        status: 'suspended',
        updatedAt: {
          gte: startOfMonth,
        },
      },
    });

    return count;
  },

  async getChurnRate() {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const lostTenants = await prisma.tenant.count({
      where: {
        status: 'suspended',
        updatedAt: { gte: startOfMonth }
      }
    });

    const activeTenants = await prisma.tenant.count({
      where: { status: 'active' }
    });

    const totalBase = activeTenants + lostTenants;

    if (totalBase === 0) return 0;

    const rate = Number((lostTenants / totalBase) * 100);

    return String(rate.toFixed(1));
  },

  async getAllTenants() {
    return await prisma.tenant.findMany({
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
        _count: {
          select: {
            users: true,
            products: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getTenantsFiltered(search?: string, status?: string) {
    return await prisma.tenant.findMany({
      where: {
        OR: search ? [
          { businessName: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
        ] : undefined,
        status: status ? (status as any) : undefined,
      },
      include: {
        subscription: {
          include: {
            plan: true
          }
        },
        _count: {
          select: {
            users: true,
            products: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async updateTenantStatus(tenantId: string, status: string) {
    return await prisma.tenant.update({
      where: { tenantId },
      data: { status: status as SubscriptionStatus }
    });
  },

  async getStoreProfile(tenantId: string) {
    return await prisma.tenant.findUnique({
      where: { tenantId },
      select: {
        tenantId: true,
        businessName: true,
        description: true,
        whatsApp: true,
        slug: true,
        aboutUs: {
          select: { logo: true },
          take: 1
        }
      }
    });
  },

  async updateStoreProfile(tenantId: string, data: UpdateStoreProfileData) {
    return await prisma.tenant.update({
      where: {
        tenantId,
      },
      data: {
        businessName: data.businessName,
        description: data.description,
        whatsApp: data.whatsApp,
        slug: data.slug,
      },
      select: {
        tenantId: true,
        businessName: true,
        description: true,
        whatsApp: true,
        slug: true,
      },
    });
  },
}

export default tenantRepository;