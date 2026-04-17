import { AboutUsRepository } from '../repositories/aboutUs.repository';

export class AboutUsService {
  constructor() {
    this.repository = new AboutUsRepository();
  }

  async getAboutUs() {
    try {
      const data = await this.repository.getAboutUs();
      if (!data) {
        return null;
      }
      return data;
    } catch (error) {
      throw new Error(`Error en AboutUsService: ${error.message}`);
    }
  }

  async getContact() {
    try {
      return await this.repository.getContact();
    } catch (error) {
      throw new Error(`Error en AboutUsService al obtener contacto: ${error.message}`);
    }
  }

  async updateAboutUs(data) {
    try {
      return await this.repository.updateAboutUs(data);
    } catch (error) {
      throw new Error(`Error en AboutUsService al actualizar: ${error.message}`);
    }
  }
}
