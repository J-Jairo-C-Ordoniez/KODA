import { NextResponse } from 'next/server';
import { PolicyController } from '@/core/modules/policies/controllers/policy.controller';

const controller = new PolicyController();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  return controller.getPolicyByTitle(request, title);
}
