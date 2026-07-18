import dashboardController from "@/core/modules/dashboard/controllers/dashboard.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return apiResponse.error("No autorizado", 401);

  return dashboardController.getConfigStats(
    session.user.tenantId
  );
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return apiResponse.error("No autorizado", 401);

  const body = await req.json();

  return dashboardController.updateStoreProfile(
    session.user.tenantId,
    body
  );
}