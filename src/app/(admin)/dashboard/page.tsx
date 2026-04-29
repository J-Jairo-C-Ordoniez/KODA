"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";

export default function DashboardCheckpoint() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user) {
      router.replace("/home");
      return;
    }

    const role = session.user.role;

    switch (role) {
      case "superAdmin":
        router.replace("/dashboard/admin/metrics");
        break;
      case "admin":
      case "owner":
        router.replace("/dashboard/business");
        break;
      case "employee":
        router.replace("/dashboard/employee/sales");
        break;
      default:
        router.replace("/home");
        break;
    }
  }, [session, status, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <Loader />
    </div>
  );
}