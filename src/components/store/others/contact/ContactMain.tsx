"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import ContactContent from "./ui/ContactContent";

export default function ContactMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [contact, setContact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBreadcrumbsRoute("contacto");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/contact");
        const result = await res.json();
        const data = result.success ? result.data : result;
        setContact(data?.contact || data || null);
      } catch (err) {
        setError("Error al cargar información de contacto");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <main className="bg-background w-full min-h-screen overflow-x-hidden">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

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
