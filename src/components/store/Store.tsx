'use client';

import { Suspense } from 'react';
import Header from "@/components/store/Header/Header"
import StoreLanding from "@/components/store/Main/StoreLanding"
import Footer from "@/components/store/Footer/Footer"
import Loader from "@/components/ui/Loader"

interface Props {
    tenantId?: string;
    businessName?: string;
    slug?: string;
}

export function LandingStore({ tenantId, businessName, slug }: Props) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Suspense fallback={<div className="h-20 w-full bg-background border-b border-foreground/5 animate-pulse" />}>
                <Header
                    businessName={businessName}
                    slug={slug}
                    tenantId={tenantId}
                />
            </Suspense>
            
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader size="lg" /></div>}>
                <StoreLanding
                    tenantId={tenantId}
                />
            </Suspense>

            <Footer />
        </div>
    )
}