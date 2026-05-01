"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import PolicyContent from "./ui/PolicyContent";
import { usePolicies } from "@/hooks/store/usePolicies";

export default function PoliciesMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { data: policyData, isLoading, error } = usePolicies();

  useEffect(() => {
    setBreadcrumbsRoute("policies and privacy");
  }, [setBreadcrumbsRoute]);

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Loading...
            </p>
          </div>
        )}

        {(!isLoading && (error || !policyData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No information available"}
            </p>
          </div>
        )}

        {!isLoading && !error && policyData && <PolicyContent policyData={policyData} />}
      </div>
    </main>
  );
}
