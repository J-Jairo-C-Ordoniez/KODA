import prisma from '@/infrastructure/db/client';

const aboutUsRepository = {
  async getAboutUs() {
    try {
      return await prisma.aboutUs.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error: any) {
      throw new Error(`Error en AboutUsRepository: ${error.message}`);
    }
  },



  async updateAboutUs(data: any) {
    try {
      return await prisma.aboutUs.update({
        where: { aboutId: data.aboutId },
        data: data
      });
    } catch (error: any) {
      throw new Error(`Error en AboutUsRepository al actualizar: ${error.message}`);
    }
  }
};

export default aboutUsRepository;
