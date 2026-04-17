import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: 'Dashboard | Moda y Estilo',
  description: 'Admin dashboard para gestionar la plataforma Web',
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="dashboard-scope min-h-screen flex text-(--dash-text) antialiased">
      {children}
    </div>
  );
}
