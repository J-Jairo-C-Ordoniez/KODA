"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import Content from "./ui/Content";

export default function AboutMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [aboutData, setAboutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBreadcrumbsRoute("sobre nosotros");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/about");
        const result = await res.json();
        setAboutData(result.success ? result.data : result);
      } catch {
        setError("Error al cargar la información");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <main className="bg-background w-full min-h-screen overflow-x-hidden">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Cargando...
            </p>
          </div>
        )}

        {(!isLoading && (error || !aboutData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && aboutData && <Content aboutData={aboutData} />}
      </div>
    </main>
  );
}
