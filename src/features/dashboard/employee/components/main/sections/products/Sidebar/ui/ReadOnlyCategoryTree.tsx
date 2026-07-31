'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, Package } from 'lucide-react';
import type { Category, Product } from '@/features/dashboard/business/api/products.api';

interface ReadOnlyCategoryTreeProps {
  categories: Category[];
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string | null) => void;
}

export default function ReadOnlyCategoryTree({
  categories,
  products,
  selectedProductId,
  onSelectProduct,
}: ReadOnlyCategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!selectedProductId) return;

    const product = products.find(item => item.productId === selectedProductId);
    if (product) {
      setExpandedCategories(prev => ({ ...prev, [product.categoryId]: true }));
    }
  }, [selectedProductId, products]);

  return (
    <nav className="flex flex-col gap-8">
      <section className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
          Estructura
        </h3>

        {categories.length === 0 ? (
          <p className="px-2 py-6 text-sm font-medium leading-relaxed text-primary/60">
            No hay categorías registradas.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {categories.map(category => {
              const isExpanded = !!expandedCategories[category.categoryId];
              const categoryProducts = products.filter(product => product.categoryId === category.categoryId);
              const FolderIcon = isExpanded ? FolderOpen : Folder;

              return (
                <li key={category.categoryId} className="group/category flex flex-col gap-1">
                  <div
                    onClick={() =>
                      setExpandedCategories(prev => ({
                        ...prev,
                        [category.categoryId]: !prev[category.categoryId],
                      }))
                    }
                    className="gsap-menu-item flex items-center justify-between rounded-lg px-3 py-2 text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <FolderIcon size={18} />
                      <span className="truncate text-sm">{category.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary/40">
                        {categoryProducts.length}
                      </span>
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <ul className="ml-3 flex flex-col gap-1 border-l border-primary/10 pl-4 py-1">
                      {categoryProducts.length === 0 ? (
                        <li className="px-3 py-1 text-sm font-medium leading-relaxed text-primary/60">
                          Sin productos
                        </li>
                      ) : (
                        categoryProducts.map(product => {
                          const isSelected = selectedProductId === product.productId;

                          return (
                            <li
                              key={product.productId}
                              onClick={() => onSelectProduct(product.productId)}
                              className={`group/product flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-foreground-muted/40 text-primary font-semibold'
                                  : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
                              }`}
                            >
                              <div className="flex min-w-0 flex-1 items-center gap-3">
                                <Package size={18} />
                                <span className="truncate text-sm">{product.name}</span>
                              </div>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </nav>
  );
}
