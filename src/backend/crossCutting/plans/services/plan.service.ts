import planRepository from '../repositories/plan.repository';

export interface PlanData {
  name: string;
  description: string;
  price: number;
  interval: string;
  feature?: string[];
}

const planService = {
  async getPlans() {
    return planRepository.getAllPlans();
  },

  async getPlan(id: string) {
    const plan = await planRepository.getPlanById(id);
    if (!plan) throw new Error('Plan no encontrado');
    return plan;
  },

  async createPlan(data: PlanData) {
    if (!data.name || data.price === undefined) {
      throw new Error('Nombre y precio son requeridos');
    }
    return planRepository.createPlan(data);
  },

  async updatePlan(id: string, data: Partial<PlanData>) {
    return planRepository.updatePlan(id, data);
  },

  async deletePlan(id: string) {
    return planRepository.deletePlan(id);
  }
};

export default planService;
