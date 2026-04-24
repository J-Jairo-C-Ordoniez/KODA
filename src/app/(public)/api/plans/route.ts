import planController from '@/core/modules/plans/controllers/plan.controller';

export async function GET() {
  return await planController.getPlans();
}
