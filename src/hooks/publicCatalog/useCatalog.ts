'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useCatalog(tenantId?: string) {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParamsStr = searchParams.toString();

    const fetchProducts = useCallback(async () => {
        if (!tenantId) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const params = new URLSearchParams(searchParamsStr);
            const url = `/api/catalog/products?${params.toString()}&tenantId=${tenantId}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data.items || []);
            }
        } catch (err: any) {
            setError(err.message || 'Error al cargar productos');
        } finally {
            setIsLoading(false);
        }
    }, [tenantId, searchParamsStr]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, isLoading, error, refetch: fetchProducts };
}
