'use client'

import React, { useEffect, useState } from "react";
import { LandingStore } from "@/components/store/Store";
import Loader from "@/components/ui/Loader";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function StorePage({ params }: Props) {
    const { slug } = React.use(params);
    const [tenant, setTenant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const response = await fetch(`/api/tenants/slug?slug=${slug}`);
                const data = await response.json();

                if (data && !data.error) {
                    setTenant(data);
                }
            } catch (err) {
                console.error("Error cargando el negocio:", err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchTenant();
    }, [slug]);

    if (loading) return <Loader />;

    if (!tenant || tenant.status === 'suspended') {
        return redirect("/")
    }

    return (
        <LandingStore
            tenantId={tenant.tenantId}
            businessName={tenant.businessName}
            slug={tenant.slug}
        />
    );
}