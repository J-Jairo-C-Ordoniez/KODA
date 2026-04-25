import prisma from '@/infrastructure/db/client';

const settingsRepository = {
  async getTenantSettings(tenantId: string) {
    const [tenant, aboutUs] = await Promise.all([
      prisma.tenant.findUnique({
        where: { tenantId },
        select: { tenantId: true, businessName: true, description: true, type: true, whatsApp: true, slug: true, status: true },
      }),
      prisma.aboutUs.findFirst({ where: { tenantId } }),
    ]);
    return { tenant, aboutUs };
  },

  async updateTenantInfo(tenantId: string, data: { businessName?: string; description?: string; whatsApp?: string; type?: string }) {
    return prisma.tenant.update({ where: { tenantId }, data });
  },

  async upsertAboutUs(tenantId: string, data: { logo?: string; socialLinks?: any }) {
    return prisma.aboutUs.upsert({
      where: { aboutId: (await prisma.aboutUs.findFirst({ where: { tenantId } }))?.aboutId || '' },
      update: data,
      create: { tenantId, ...data },
    });
  },
};

export default settingsRepository;
