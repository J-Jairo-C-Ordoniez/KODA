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
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  const tenants = await tenantController.getTenantsFiltered(search, status);
  return NextResponse.json(tenants);
}