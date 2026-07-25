'use client';

import { Suspense } from 'react';
import Header from "@/features/storefront/components/Header/Header"
import StoreLanding from "@/features/storefront/components/Main/StoreLanding"
import Footer from "@/features/storefront/components/Footer/Footer"
import Loader from "@/shared/components/Loader"
import { redirect } from "next/navigation";
import { useTenantBySlug } from "@/features/storefront/hooks/useTenantBySlug";

interface Props {
    slug?: string;
}

export function LandingStore({ slug }: Props) {
    const { tenant, isLoading } = useTenantBySlug(slug || "");

    if (!slug) return null;

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader size="lg" />
            </div>
        );
    }

    if (!tenant || tenant.status === 'suspended') {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-background text-primary selection:text-white flex flex-col font-sans selection:bg-contrast/30">
            {/* Header with better styling */}
            <Suspense fallback={<div className="h-24 w-full bg-background border-b border-white/5 animate-pulse" />}>
                <Header
                    businessName={tenant.businessName}
                    slug={tenant.slug}
                    tenantId={tenant.tenantId}
                />
            </Suspense>
            
            {/* Main Content Area */}
            <Suspense fallback={
                <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader size="lg" />
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-foreground-muted animate-pulse">
                        Preparando el catálogo...
                    </p>
                </div>
            }>
                <StoreLanding
                    tenantId={tenant.tenantId}
                />
            </Suspense>

            {/* Footer */}
            <Footer />

            {/* Subtle background glow */}
            <div className="fixed -top-[20%] -right-[10%] w-[60%] h-[60%] bg-contrast/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-contrast/3 blur-[100px] rounded-full pointer-events-none -z-10" />
        </div>
    )
}
