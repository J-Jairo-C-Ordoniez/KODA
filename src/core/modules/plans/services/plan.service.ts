import planRepository from '../repositories/plan.repository';

const planService = {
  async getPlans() {
    try {
      const plans = await planRepository.getAllPlans();
      return plans;
    } catch (error) {
      throw new Error('No se pudieron obtener los planes de precios');
    }
  }
};

export default planService;
