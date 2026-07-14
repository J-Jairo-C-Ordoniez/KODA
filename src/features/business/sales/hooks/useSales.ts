import { useState, useCallback } from 'react';
import { fetchSalesDataApi, saveSaleApi } from '@/features/business/sales/api/sales.api';

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
            const { sales: fetchedSales, variants: fetchedVariants } = await fetchSalesDataApi(tenantId, pageNum);
            setSales(fetchedSales as any);
            setVariants(fetchedVariants as any);
            setHasMore(fetchedSales.length === 12);
            setPage(pageNum);
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
            const savedData = await saveSaleApi(tenantId, data);
            await fetchSalesData(1);
            return { success: true, data: savedData };
        } catch (err: any) {
            return { success: false, error: err.message || 'Error de conexión al servidor' };
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

