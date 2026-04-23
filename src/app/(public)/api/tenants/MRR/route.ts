import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tenants = await tenantController.getMonthlyIncomes();
  return NextResponse.json(tenants);
}