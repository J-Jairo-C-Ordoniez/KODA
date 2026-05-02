'use client';

import { Suspense } from 'react';
import Header from "@/components/store/Header/Header"
import StoreLanding from "@/components/store/Main/StoreLanding"
import Footer from "@/components/store/Footer/Footer"
import Loader from "@/components/ui/Loader"
import { redirect } from "next/navigation";
import { useTenantBySlug } from "@/hooks/publicCatalog/useTenantBySlug";

interface Props {
    slug?: string;
}

export function LandingStore({ slug }: Props) {
    if (!slug) return null;

    const { tenant, isLoading } = useTenantBySlug(slug);

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader size="lg" /></div>;
    }

    if (!tenant) {
        redirect("/");
    }
    
    if (tenant.status === 'suspended') {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Suspense fallback={<div className="h-20 w-full bg-background border-b border-foreground/5 animate-pulse" />}>
                <Header
                    businessName={tenant.businessName}
                    slug={tenant.slug}
                    tenantId={tenant.tenantId}
                />
            </Suspense>
            
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader size="lg" /></div>}>
                <StoreLanding
                    tenantId={tenant.tenantId}
                />
            </Suspense>

            <Footer />
        </div>
    )
}