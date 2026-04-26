import { useState, useCallback } from 'react';

export function useSales(tenantId: string | undefined) {
    const [sales, setSales] = useState([]);
    const [variants, setVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSalesData = useCallback(async () => {
        if (!tenantId) return;
        setIsLoading(true);
        setError(null);
        try {
            const [salesRes, variantsRes] = await Promise.all([
                fetch(`/api/${tenantId}/sales`),
                fetch(`/api/${tenantId}/catalog/variants`)
            ]);
            
            const salesJson = await salesRes.json();
            const variantsJson = await variantsRes.json();

            if (salesJson.success) {
                setSales(salesJson.data || []);
            } else {
                setError('Error al cargar ventas');
            }

            if (variantsJson.success) {
                setVariants(variantsJson.data || []);
            } else if (!error) {
                setError('Error al cargar variantes');
            }
        } catch (err) {
            setError('Error de conexión');
            console.error('Error fetching sales data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [tenantId, error]);

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
                await fetchSalesData();
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
        fetchSalesData,
        saveSale
    };
}
