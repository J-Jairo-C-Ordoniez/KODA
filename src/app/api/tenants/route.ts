import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

export async function POST(req: Request) {
  const data = await req.json();
  const tenant = await tenantController.registerBusiness(data);
  return NextResponse.json(tenant);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superAdmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tenants = await tenantController.getAllTenants();
  return NextResponse.json(tenants);
}