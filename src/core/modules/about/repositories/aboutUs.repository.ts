import prisma from '@/infrastructure/db/client';

export class AboutUsRepository {
  async getAboutUs() {
    try {
      return await prisma.aboutUs.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(`Error en AboutUsRepository: ${error.message}`);
    }
  }

  async getContact() {
    try {
      const data = await prisma.aboutUs.findFirst({
        select: {
          contact: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return data ? data.contact : null;
    } catch (error) {
      throw new Error(`Error en AboutUsRepository al obtener contacto: ${error.message}`);
    }
  }

  async updateAboutUs(data) {
    try {
      return await prisma.aboutUs.update({
        where: { aboutId: data.aboutId },
        data: data
      });
    } catch (error) {
      throw new Error(`Error en AboutUsRepository al actualizar: ${error.message}`);
    }
  }
}
