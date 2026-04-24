import policyRepository from '../repositories/policy.repository';

const policyService = {
  async getPolicyByTitle(title: string) {
    try {
      const data = await policyRepository.getPolicyByTitle(title);
      return data;
    } catch (error: any) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  },

  async getLatestPolicy() {
    try {
      const data = await policyRepository.getLatestPolicy();
      if (!data) {
        return null;
      }
      return data;
    } catch (error: any) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  },

  async updatePolicy(content: any) {
    try {
      const data = await policyRepository.updatePolicy(content);
      return data;
    } catch (error: any) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  }
};

export default policyService;
