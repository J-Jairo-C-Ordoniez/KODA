'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useProductsStore } from '@/store/useProductsStore';
import SidebarHeader from '@/features/dashboard/business/components/main/sections/products/Sidebar/ui/SidebarHeader';
import ReadOnlyCategoryTree from '@/features/dashboard/employee/components/main/sections/products/Sidebar/ui/ReadOnlyCategoryTree';

interface ProductsSidebarProps {
  onCloseMobile?: () => void;
}

export default function ProductsSidebar({ onCloseMobile }: ProductsSidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { categories, products, selectedProductId, setSelectedProduct } = useProductsStore();

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

  return (
    <aside
      ref={containerRef}
      className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
    >
      <SidebarHeader
        selectedProductId={selectedProductId}
        onSelectAll={() => handleSelectProduct(null)}
      />

      <ReadOnlyCategoryTree
        categories={categories}
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={handleSelectProduct}
      />
    </aside>
  );
}
