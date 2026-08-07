import policyRepository from '../repositories/policy.repository';

const policyService = {
  async getPolicyByTitle(title: string) {
    return policyRepository.getPolicyByTitle(title);
  },

  async getLatestPolicy() {
    return policyRepository.getLatestPolicy();
  },

  async updatePolicy(data: { policyId: number; content: any }) {
    if (!data.policyId || !data.content) {
      throw new Error('ID de política y contenido son requeridos');
    }
    return policyRepository.updatePolicy(data);
  }
};

export default policyService;
