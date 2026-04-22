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
  const type = searchParams.get("type") || "all";

  if (type === "all") {
    const count = await tenantController.countAllTenants();
    return NextResponse.json(count);
  } else if (type === "active") {
    const count = await tenantController.countActiveTenants();
    return NextResponse.json(count);
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}