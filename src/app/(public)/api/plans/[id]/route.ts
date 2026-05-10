import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import planController from '@/core/modules/plans/controllers/plan.controller';
import planService from "@/core/modules/plans/services/plan.service";
import { apiResponse } from "@/core/utils/apiResponse";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const plan = await planService.getPlan(id);
    return apiResponse.success(plan);
  } catch (error: any) {
    return apiResponse.error(error.message, 404);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();
  return await planController.updatePlan(id, data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  return await planController.deletePlan(id);
}
