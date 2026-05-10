import planRepository from '../repositories/plan.repository';

const planService = {
  async getPlans() {
    try {
      return await planRepository.getAllPlans();
    } catch (error) {
      throw new Error('No se pudieron obtener los planes de precios');
    }
  },

  async getPlan(id: string) {
    try {
      return await planRepository.getPlanById(id);
    } catch (error) {
      throw new Error('No se pudo obtener el plan');
    }
  },

  async createPlan(data: any) {
    try {
      return await planRepository.createPlan(data);
    } catch (error) {
      throw new Error('No se pudo crear el plan');
    }
  },

  async updatePlan(id: string, data: any) {
    try {
      return await planRepository.updatePlan(id, data);
    } catch (error) {
      throw new Error('No se pudo actualizar el plan');
    }
  },

  async deletePlan(id: string) {
    try {
      return await planRepository.deletePlan(id);
    } catch (error: any) {
      throw new Error(error.message || 'No se pudo eliminar el plan');
    }
  }
};

export default planService;
