import { PolicyController } from '@/core/modules/policies/controllers/policy.controller';

export async function GET() {
  const controller = new PolicyController();
  return controller.getLatestPolicy();
}

export async function POST(req) {
  const controller = new PolicyController();
  return controller.updatePolicy(req);
}