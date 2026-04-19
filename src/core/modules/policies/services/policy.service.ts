import { PolicyRepository } from '../repositories/policy.repository';

export class PolicyService {
  constructor() {
    this.repository = new PolicyRepository();
  }

  async getPolicyByTitle(title: string) {
    try {
      const data = await this.repository.getPolicyByTitle(title);
      return data;
    } catch (error) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  }

  async getLatestPolicy() {
    try {
      const data = await this.repository.getLatestPolicy();
      if (!data) {
        return null;
      }
      return data;
    } catch (error) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  }

  async updatePolicy(content) {
    try {
      const data = await this.repository.updatePolicy(content);
      return data;
    } catch (error) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  }
}
