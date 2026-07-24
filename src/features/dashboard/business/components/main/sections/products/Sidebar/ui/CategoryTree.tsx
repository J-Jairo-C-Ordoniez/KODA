'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronRight, Edit2, Folder, FolderOpen, Package, Plus, Trash2, X } from 'lucide-react';
import type { Category, Product } from '@/features/dashboard/business/api/products.api';
import type { ActiveView } from '@/store/useProductsStore';

interface CategoryTreeProps {
  categories: Category[];
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string | null) => void;
  onUpdateCategory: (categoryId: string, data: { name: string }) => Promise<any>;
  onDeleteCategory: (categoryId: string) => Promise<any>;
  onUpdateProduct: (productId: string, data: { name: string; categoryId: string; gender: string }) => Promise<any>;
  onDeleteProduct: (productId: string) => Promise<any>;
  onSetView: (view: ActiveView, editingItem?: any) => void;
}

export default function CategoryTree({ categories, products, selectedProductId, onSelectProduct, onUpdateCategory, onDeleteCategory, onUpdateProduct, onDeleteProduct, onSetView }: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<'category' | 'product' | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedProductId) return;

    const product = products.find(item => item.productId === selectedProductId);
    if (product) {
      setExpandedCategories(prev => ({ ...prev, [product.categoryId]: true }));
    }
  }, [selectedProductId, products]);

  const startEdit = (e: React.MouseEvent, id: string, type: 'category' | 'product', initialValue: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingType(type);
    setEditValue(initialValue);
    window.setTimeout(() => editInputRef.current?.focus(), 50);
  };

  const cancelEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(null);
    setEditingType(null);
    setEditValue('');
  };

  const saveEdit = async (e: React.MouseEvent | React.FormEvent, id: string) => {
    e.stopPropagation();
    if ('preventDefault' in e) e.preventDefault();
    if (!editValue.trim()) return;

    if (editingType === 'category') {
      const res = await onUpdateCategory(id, { name: editValue.trim() });
      if (res.success) cancelEdit();
      return;
    }

    const product = products.find(item => item.productId === id);
    if (editingType === 'product' && product) {
      const res = await onUpdateProduct(id, {
        name: editValue.trim(),
        categoryId: product.categoryId,
        gender: product.gender,
      });
      if (res.success) cancelEdit();
    }
  };

  const renderInlineEdit = (id: string) => (
    <form
      onSubmit={event => saveEdit(event, id)}
      className="flex min-w-0 flex-1 items-center gap-2"
      onClick={event => event.stopPropagation()}
    >
      <input
        ref={editInputRef}
        type="text"
        value={editValue}
        onChange={event => setEditValue(event.target.value)}
        className="min-w-0 flex-1 border-b border-primary/30 bg-transparent p-1 text-sm text-primary outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="text-primary/80 transition-colors hover:text-success cursor-pointer"
        aria-label="Guardar"
      >
        <Check size={18} />
      </button>
      <button
        type="button"
        onClick={cancelEdit}
        className="text-primary/80 transition-colors hover:text-accent-red cursor-pointer"
        aria-label="Cancelar"
      >
        <X size={18} />
      </button>
    </form>
  );

  const handleDelete = async (e: React.MouseEvent, id: string, type: 'category' | 'product') => {
    e.stopPropagation();
    if (type === 'category') {
      await onDeleteCategory(id);
    } else {
      await onDeleteProduct(id);
    }
  };

  return (
    <nav className="flex flex-col gap-8">
      <section className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
          Acciones
        </h3>
        <button
          onClick={() => onSetView('create-category')}
          className="gsap-menu-item flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
        >
          <Plus size={18} />
          Nueva categoría
        </button>
        <button
          onClick={() => onSetView('create-product')}
          className="gsap-menu-item flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
        >
          <Plus size={18} />
          Nuevo producto
        </button>
      </section>

      <section className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
          Estructura
        </h3>

        {categories.length === 0
          ? (<p className="px-2 py-6 text-sm font-medium leading-relaxed text-primary/60">
            No hay categorías registradas.
          </p>)
          : (<ul className="flex flex-col gap-1">
            {categories.map(category => {
              const isExpanded = !!expandedCategories[category.categoryId];
              const categoryProducts = products.filter(product => product.categoryId === category.categoryId);
              const isEditingCategory = editingId === category.categoryId && editingType === 'category';
              const FolderIcon = isExpanded ? FolderOpen : Folder;

              return (
                <li
                  key={category.categoryId}
                  className="group/category flex flex-col gap-1"
                >
                  <div
                    onClick={() => setExpandedCategories(prev => ({ ...prev, [category.categoryId]: !prev[category.categoryId] }))}
                    className="gsap-menu-item flex items-center justify-between rounded-lg px-3 py-2 text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <FolderIcon size={18} />
                      {isEditingCategory
                        ? renderInlineEdit(category.categoryId)
                        : <span className="truncate text-sm">{category.name}</span>}
                    </div>

                    {!isEditingCategory && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary/40 group-hover/category:hidden">
                          {categoryProducts.length}
                        </span>
                        <div className="hidden items-center gap-2 text-primary/40 group-hover/category:flex">
                          <button
                            onClick={event => startEdit(event, category.categoryId, 'category', category.name)}
                            className="transition-colors hover:text-primary cursor-pointer"
                            aria-label={`Editar ${category.name}`}
                          >
                            <Edit2 size={18} />
                          </button>

                          <button
                            onClick={e => handleDelete(e, category.categoryId, 'category')}
                            className="transition-colors hover:text-accent-red cursor-pointer"
                            aria-label={`Eliminar ${category.name}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        {isExpanded
                          ? <ChevronDown size={18} />
                          : <ChevronRight size={18}
                          />
                        }
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <ul className="ml-3 flex flex-col gap-1 border-l border-primary/10 pl-4 py-1">
                      {categoryProducts.length === 0
                        ? <li className="px-3 py-1 text-sm font-medium leading-relaxed text-primary/60">Sin productos</li>
                        : (
                          categoryProducts.map(product => {
                            const isSelected = selectedProductId === product.productId;
                            const isEditingProduct = editingId === product.productId && editingType === 'product';

                            return (
                              <li
                                key={product.productId}
                                onClick={() => onSelectProduct(product.productId)}
                                className={`group/product flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 cursor-pointer ${isSelected
                                  ? 'bg-foreground-muted/40 text-primary'
                                  : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
                                  }`}
                              >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <Package size={18} />
                                  {isEditingProduct
                                    ? renderInlineEdit(product.productId)
                                    : <span className="truncate text-sm">{product.name}</span>
                                  }
                                </div>

                                {!isEditingProduct && (
                                  <div className="hidden items-center gap-2 text-primary/40 group-hover/product:flex">
                                    <button
                                      onClick={event => startEdit(event, product.productId, 'product', product.name)}
                                      className="transition-colors hover:text-primary cursor-pointer"
                                      aria-label={`Editar ${product.name}`}
                                    >
                                      <Edit2 size={18} />
                                    </button>
                                    <button
                                      onClick={e => handleDelete(e, product.productId, 'product')}
                                      className="transition-colors hover:text-accent-red cursor-pointer"
                                      aria-label={`Eliminar ${product.name}`}
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                )}
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
