"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import ContactContent from "./ui/ContactContent";
import { usePublicData } from "@/hooks/usePublicData";

export default function ContactMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { data, isLoading, error } = usePublicData("/api/contact");
  const contact = data?.contact || null;

  useEffect(() => {
    setBreadcrumbsRoute("contacto");
  }, [setBreadcrumbsRoute]);

  return (
    <main className="bg-background w-full min-h-screen overflow-x-hidden">
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

        {(!isLoading && (error || !contact)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información de contacto disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && contact && <ContactContent contact={contact} />}
      </div>
    </main>
  );
}
