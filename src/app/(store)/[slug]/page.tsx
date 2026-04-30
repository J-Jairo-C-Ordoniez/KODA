'use client';

import React from "react";
import { LandingStore } from "@/components/store/Store";
import Loader from "@/components/ui/Loader";
import { redirect } from "next/navigation";
import { useTenantBySlug } from "@/hooks/publicCatalog/useTenantBySlug";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function StorePage({ params }: Props) {
    const { slug } = React.use(params);
    const { tenant, isLoading } = useTenantBySlug(slug);
    
    // HMR trigger

    if (isLoading) return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader size="lg" /></div>;

    if (!tenant || tenant.status === 'suspended') {
        return redirect("/");
    }

    return (
        <LandingStore
            tenantId={tenant.tenantId}
            businessName={tenant.businessName}
            slug={tenant.slug}
        />
    );
}