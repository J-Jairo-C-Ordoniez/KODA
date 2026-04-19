import { PlanController } from '@/core/modules/plans/controllers/plan.controller';

const controller = new PlanController();

export async function GET() {
  return await controller.getPlans();
}
