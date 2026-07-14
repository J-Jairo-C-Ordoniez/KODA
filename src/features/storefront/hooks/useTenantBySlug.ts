'use client';

import { useState, useEffect } from 'react';

export function useTenantBySlug(slug: string) {
    const [tenant, setTenant] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenant = async () => {
            if (!slug) return;
            
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/tenants/slug?slug=${slug}`);
                const result = await response.json();
                
                // Si la respuesta envuelve la data en "data" (por apiResponse.success)
                const tenantData = result.success ? result.data : result;
                
                if (tenantData && !tenantData.error) {
                    setTenant(tenantData);
                } else {
                    setError(tenantData.error || 'Error al cargar el negocio');
                }
            } catch (err: any) {
                console.error("Error cargando el negocio:", err);
                setError(err.message || 'Error de conexión');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTenant();
    }, [slug]);

    return { tenant, isLoading, error };
}
