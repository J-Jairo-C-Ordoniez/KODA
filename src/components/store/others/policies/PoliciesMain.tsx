"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import PolicyContent from "./ui/PolicyContent";

export default function PoliciesMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [policyData, setPolicyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBreadcrumbsRoute("políticas y privacidad");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/policies");
        const result = await res.json();
        const data = result.success ? result.data : result;
        setPolicyData(data);
      } catch (err) {
        setError("Error al cargar políticas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

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
