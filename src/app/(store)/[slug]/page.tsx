'use client';

import React from "react";
import { LandingStore } from "@/components/store/Store";
import { redirect } from "next/navigation";
import tenantController from "@/core/modules/tenants/controllers/tenant.controller";
import { useTenantBySlug } from "@/hooks/publicCatalog/useTenantBySlug";
import Loader from "@/components/ui/Loader";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

// Keep SEO metadata generation on the server layer
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // Follow flow: Controller -> Service -> Repository
    const response = await tenantController.getTenantBySlug(slug);
    const tenant = (response as any).success ? (response as any).data : null;

    if (!tenant) return { title: "KODA | Negocio no encontrado" };

    return {
        title: `${tenant.businessName} | Catálogo Online`,
        description: `Explora el catálogo de productos de ${tenant.businessName} en KODA.`,
    };
}

export default function StorePage({ params }: Props) {
    const { slug } = React.use(params);
    // Follow flow: Component -> Hook -> API -> Controller -> Service -> Repository
    const { tenant, isLoading } = useTenantBySlug(slug);
    
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
