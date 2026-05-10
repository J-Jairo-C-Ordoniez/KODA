import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import subscriptionController from '@/core/modules/subscriptions/controllers/subscription.controller';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await subscriptionController.getSubscriptionStats();
  return stats;
}
