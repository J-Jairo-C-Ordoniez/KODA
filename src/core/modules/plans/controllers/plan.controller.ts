import { NextResponse } from 'next/server';
import { PlanService } from '../services/plan.service';

export class PlanController {
  private service: PlanService;

  constructor() {
    this.service = new PlanService();
  }

  async getPlans() {
    try {
      const plans = await this.service.getPlans();
      return NextResponse.json({ success: true, data: plans });
    } catch (error: any) {
      console.error('Error in PlanController:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }
}
