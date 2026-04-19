import { PlanRepository } from '../repositories/plan.repository';

export class PlanService {
  private repository: PlanRepository;

  constructor() {
    this.repository = new PlanRepository();
  }

  async getPlans() {
    try {
      const plans = await this.repository.getAllPlans();
      return plans;
    } catch (error) {
      throw new Error('No se pudieron obtener los planes de precios');
    }
  }
}
