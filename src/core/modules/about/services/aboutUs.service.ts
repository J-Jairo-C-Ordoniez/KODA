import aboutUsRepository from '../repositories/aboutUs.repository';

const aboutUsService = {
  async getAboutUs() {
    try {
      const data = await aboutUsRepository.getAboutUs();
      if (!data) {
        return null;
      }
      return data;
    } catch (error: any) {
      throw new Error(`Error en AboutUsService: ${error.message}`);
    }
  },

  async updateAboutUs(data: any) {
    try {
      return await aboutUsRepository.updateAboutUs(data);
    } catch (error: any) {
      throw new Error(`Error en AboutUsService al actualizar: ${error.message}`);
    }
  }
};

export default aboutUsService;
