import policyController from '@/core/modules/policies/controllers/policy.controller';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  return await policyController.getPolicyByTitle(title);
}
