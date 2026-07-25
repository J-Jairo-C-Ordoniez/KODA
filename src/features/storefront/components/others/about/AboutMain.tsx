"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "@/store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import Content from "./ui/Content";
import { useAbout } from "@/features/storefront/hooks/useAbout";

export default function AboutMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { data: aboutData, isLoading, error } = useAbout();

  useEffect(() => {
    setBreadcrumbsRoute("about us");
  }, [setBreadcrumbsRoute]);

  return (
    <main className="bg-background w-full min-h-screen overflow-x-hidden">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Loading...
            </p>
          </div>
        )}

        {(!isLoading && (error || !aboutData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No information available"}
            </p>
          </div>
        )}

        {!isLoading && !error && aboutData && <Content aboutData={aboutData} />}
      </div>
    </main>
  );
}
