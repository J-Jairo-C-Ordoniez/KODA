import prisma from '@/infrastructure/db/client';

const settingsRepository = {
  async getTenantSettings(tenantId: string) {
    const [tenant, aboutUs] = await Promise.all([
      prisma.tenant.findUnique({
        where: { tenantId },
        select: { tenantId: true, businessName: true, description: true, type: true, whatsApp: true, slug: true, status: true },
      }),
      prisma.aboutUs.findFirst({
        where: { tenantId },
        select: { aboutId: true, logo: true, socialLinks: true }
      }),
    ]);
    return { tenant, aboutUs };
  },

  async updateTenantInfo(tenantId: string, data: { businessName?: string; description?: string; whatsApp?: string; type?: string; slug?: string }) {
    return prisma.tenant.update({ where: { tenantId }, data });
  },

  async upsertAboutUs(tenantId: string, data: { logo?: string; socialLinks?: any }) {
    const existing = await prisma.aboutUs.findFirst({ where: { tenantId }, select: { aboutId: true } });
    if (existing) {
      return prisma.aboutUs.update({
        where: { aboutId: existing.aboutId },
        data,
      });
    }
    return prisma.aboutUs.create({
      data: { tenantId, ...data },
    });
  },
};

export default settingsRepository;
