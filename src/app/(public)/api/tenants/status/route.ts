import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tenantId, status } = await req.json();

  if (!tenantId || !status) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const tenant = await tenantController.updateTenantStatus(tenantId, status);
  return tenant;
}
