import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/infrastructure/db/client";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import PlanAlert from "@/components/admin/PlanAlert";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch tenant status for PlanAlert (only for admins/employees tied to a tenant)
  const tenant = session.user.tenantId 
    ? await prisma.tenant.findUnique({
        where: { tenantId: session.user.tenantId },
        select: { status: true }
      })
    : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Dynamic Plan Activation Banner */}
      {tenant && <PlanAlert status={tenant.status} />}

      <div className="flex grow h-full overflow-hidden">
        {/* Role-adaptive Sidebar */}
        <DashboardSidebar role={session.user.role} />

        {/* Main Content Area */}
        <main className="grow overflow-y-auto p-8 relative">
          {/* Subtle Grid Pattern for Dashboard too */}
          <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
