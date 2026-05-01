"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import ContactContent from "./ui/ContactContent";
import { useContact } from "@/hooks/store/useContact";

export default function ContactMain() {
  const { setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { data: contact, isLoading, error } = useContact();

  useEffect(() => {
    setBreadcrumbsRoute("contact");
  }, [setBreadcrumbsRoute]);

  return (
    <main className="bg-background w-full min-h-screen overflow-x-hidden">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Loading...
            </p>
          </div>
        )}

        {(!isLoading && (error || !contact)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No contact information available"}
            </p>
          </div>
        )}

        {!isLoading && !error && contact && <ContactContent contact={contact} />}
      </div>
    </main>
  );
}
