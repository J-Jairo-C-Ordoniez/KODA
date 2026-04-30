'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useCatalogFilters(tenantId?: string) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [colorOptions, setColorOptions] = useState<any[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);

    useEffect(() => {
        if (!tenantId) return;
        const fetchData = async () => {
            const [catRes, colorRes] = await Promise.all([
                fetch(`/api/catalog?action=categories&tenantId=${tenantId}`),
                fetch(`/api/catalog?action=colors&tenantId=${tenantId}`)
            ]);
            const cats = await catRes.json();
            const colors = await colorRes.json();
            const curCat = searchParams.get('category');
            const curCol = searchParams.get('color');
            setCategoryOptions(cats.map((c: any) => ({ id: c.categoryId, name: c.name, checked: curCat === c.categoryId })));
            setColorOptions(colors.map((c: any) => ({ id: c.color, name: c.color, checked: curCol === c.color })));
        };
        fetchData();
    }, [tenantId, searchParams]);

    const handleFilterChange = (type: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        value ? params.set(type, value) : params.delete(type);
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return {
        colorOptions, categoryOptions,
        handleFilterChange,
        clearFilters: () => router.push(pathname, { scroll: false }),
        hasFilters: !!(searchParams.get('category') || searchParams.get('color') || searchParams.get('gender')),
        currentParams: { category: searchParams.get('category'), color: searchParams.get('color'), gender: searchParams.get('gender') }
    };
}
