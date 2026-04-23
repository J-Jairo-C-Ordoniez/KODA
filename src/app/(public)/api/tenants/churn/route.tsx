import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "MonthlyChurnCount";

  if (type === "MonthlyChurnCount") {
    const data = await tenantController.getMonthlyChurnCount();
    return NextResponse.json(data);
  } else if (type === "ChurnRate") {
    const data = await tenantController.getChurnRate();
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}