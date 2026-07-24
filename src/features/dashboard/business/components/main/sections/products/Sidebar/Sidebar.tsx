'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useProductsStore } from '@/store/useProductsStore';
import useProductSidebarCatalog from '@/features/dashboard/business/hooks/useProductSidebarCatalog';

import SidebarHeader from '@/features/dashboard/business/components/main/sections/products/Sidebar/ui/SidebarHeader';
import CategoryTree from '@/features/dashboard/business/components/main/sections/products/Sidebar/ui/CategoryTree';

interface SidebarProps {
    onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { categories, products, selectedProductId } = useProductsStore();
    const {
        setSelectedProduct,
        setActiveView,
        saveCategory,
        deleteCategory,
        saveProduct,
        deleteProduct,
    } = useProductSidebarCatalog();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.gsap-menu-item', {
                x: -10,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const triggerMobileClose = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768 && onCloseMobile) {
            onCloseMobile();
        }
    };

    const handleSelectProduct = (productId: string | null) => {
        setSelectedProduct(productId);
        triggerMobileClose();
    };

    const handleSetView = (view: any, editingItem?: any) => {
        setActiveView(view, editingItem);
        triggerMobileClose();
    };

    const handleUpdateCategoryInline = async (categoryId: string, data: { name: string }) => {
        const cat = categories.find(c => c.categoryId === categoryId);
        if (!cat) return { success: false, error: 'No encontrada' };
        return saveCategory({ ...cat, name: data.name }, cat);
    };

    const handleUpdateProductInline = async (
        productId: string,
        data: { name: string; categoryId: string; gender: string },
    ) => {
        const prod = products.find(p => p.productId === productId);
        if (!prod) return { success: false, error: 'No encontrado' };
        return saveProduct({ ...prod, name: data.name }, prod);
    };

    return (
        <aside
            ref={containerRef}
            className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
        >
            <SidebarHeader
                selectedProductId={selectedProductId}
                onSelectAll={() => handleSelectProduct(null)}
            />

            <CategoryTree
                categories={categories}
                products={products}
                selectedProductId={selectedProductId}
                onSelectProduct={handleSelectProduct}
                onUpdateCategory={handleUpdateCategoryInline}
                onDeleteCategory={deleteCategory}
                onUpdateProduct={handleUpdateProductInline}
                onDeleteProduct={deleteProduct}
                onSetView={handleSetView}
            />
        </aside>
    );
}
