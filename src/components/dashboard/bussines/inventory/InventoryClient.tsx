'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../main/ui/Header';
import InventoryHeader from './ui/InventoryHeader';
import InventoryTable from './ui/InventoryTable';
import { useInventory } from '@/hooks/useInventory';

export default function InventoryClient() {
    const {
        products,
        isLoading: loading,
        loadingId,
        fetchInventory,
        updateStock
    } = useInventory();

    const [searchTerm, setSearchTerm] = useState('');
    const [expandedProducts, setExpandedProducts] = useState({});
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    useEffect(() => {
        const variantId = searchParams.get('variantId');
        if (variantId && products.length > 0) {
            const product = products.find(p => p.variants.some(v => v.variantId.toString() === variantId));
            if (product) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setExpandedProducts(prev => ({ ...prev, [product.productId]: true }));
                setTimeout(() => {
                    const element = document.getElementById(`inventory-row-${variantId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Replaced arbitrary CSS animation with Tailwind classes
                        element.classList.add('bg-black/5', 'ring-2', 'ring-black', 'transition-all', 'duration-500');
                        setTimeout(() => {
                            element.classList.remove('bg-black/5', 'ring-2', 'ring-black');
                        }, 2000);
                    }
                }, 400);
            }
        }
    }, [searchParams, products]);

    const toggleExpand = (productId) => {
        setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
    };

    const handleUpdateStock = async (variantId, newStock) => {
        const result = await updateStock(variantId, newStock);
        if (!result.success) {
            alert(result.error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.variants.some(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading && products.length === 0) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    Cargando inventario...
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="container mx-auto space-y-8 pt-2">
                <Header
                    title="Inventario"
                    description="Control total de existencias por producto y variante."
                />

                <section className="rounded-xl p-6 flex flex-col gap-6 relative">
                    <InventoryHeader
                        variantCount={products.reduce((acc, p) => acc + p.variants.length, 0)}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <InventoryTable
                        products={filteredProducts}
                        expandedProducts={expandedProducts}
                        onToggleExpand={toggleExpand}
                        loadingId={loadingId}
                        onUpdateStock={handleUpdateStock}
                    />
                </section>
            </div>
        </main>
    );
}
