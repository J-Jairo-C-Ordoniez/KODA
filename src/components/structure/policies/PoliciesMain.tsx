"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import PolicyContent from "./ui/PolicyContent";
import { usePublicData } from "@/hooks/usePublicData";

export default function PoliciesMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { data: policyData, isLoading, error } = usePublicData("/api/policies");

  useEffect(() => {
    setBreadcrumbsRoute("políticas y privacidad");
  }, [setBreadcrumbsRoute]);

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Cargando...
            </p>
          </div>
        )}

        {(!isLoading && (error || !policyData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && policyData && <PolicyContent policyData={policyData} />}
      </div>
    </main>
  );
}
