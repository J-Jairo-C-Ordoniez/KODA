import { useState, useCallback } from 'react';

export function useSales(tenantId: string | undefined) {
    const [sales, setSales] = useState([]);
    const [variants, setVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchSalesData = useCallback(async (pageNum = 1) => {
        if (!tenantId) return;
        setIsLoading(true);
        setError(null);
        try {
            const salesUrl = `/api/${tenantId}/sales?page=${pageNum}&limit=12`;
            const variantsUrl = `/api/${tenantId}/catalog/variants`;
            const [salesRes, variantsRes] = await Promise.all([
                fetch(salesUrl),
                fetch(variantsUrl)
            ]);
            
            if (!salesRes.ok || !variantsRes.ok) {
                const failedRes = !salesRes.ok ? salesRes : variantsRes;
                let errorMessage = 'Error en el servidor';
                
                try {
                    const clone = failedRes.clone();
                    try {
                        const errorJson = await clone.json();
                        errorMessage = errorJson.error || errorMessage;
                    } catch (e) {
                        const textError = await failedRes.text();
                        console.error('API Error Response (Non-JSON):', textError);
                        if (textError.includes('<!DOCTYPE html>')) {
                            errorMessage = `Error ${failedRes.status}: El servidor no respondió correctamente`;
                        } else {
                            errorMessage = textError.substring(0, 100);
                        }
                    }
                } catch (cloneError) {
                    errorMessage = `Error ${failedRes.status}`;
                }
                
                throw new Error(errorMessage);
            }

            const contentTypeSales = salesRes.headers.get("content-type");
            const contentTypeVariants = variantsRes.headers.get("content-type");

            if (!contentTypeSales?.includes("application/json") || !contentTypeVariants?.includes("application/json")) {
                throw new Error('El servidor no devolvió JSON');
            }

            const salesJson = await salesRes.json();
            const variantsJson = await variantsRes.json();

            if (salesJson.success) {
                const newData = salesJson.data || [];
                setSales(newData);
                setHasMore(newData.length === 12);
                setPage(pageNum);
            } else {
                setError(salesJson.error || 'Error al cargar ventas');
            }

            if (variantsJson.success) {
                setVariants(variantsJson.data || []);
            } else if (!error) {
                setError(variantsJson.error || 'Error al cargar variantes');
            }
        } catch (err: any) {
            setError(err.message || 'Error de conexión');
            console.error('Error fetching sales data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [tenantId]);

    const saveSale = async (data: any) => {
        if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
        setIsSaving(true);
        try {
            const res = await fetch(`/api/${tenantId}/sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (json.success) {
                await fetchSalesData(1);
                return { success: true, data: json.data };
            } else {
                return { success: false, error: json.error || 'No se pudo registrar la venta' };
            }
        } catch (err) {
            return { success: false, error: 'Error de conexión al servidor' };
        } finally {
            setIsSaving(false);
        }
    };

    return {
        sales,
        variants,
        isLoading,
        isSaving,
        error,
        page,
        hasMore,
        fetchSalesData,
        saveSale
    };
}
