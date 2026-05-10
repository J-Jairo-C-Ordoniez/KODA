import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import subscriptionController from '@/core/modules/subscriptions/controllers/subscription.controller';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.tenantId || !data.planId || data.amount === undefined || !data.method) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await subscriptionController.assignPlanAndPay(data);
  return result;
}
