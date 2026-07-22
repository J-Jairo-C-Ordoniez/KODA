'use client';

import { useState, useRef, useEffect } from 'react';
import { Folder, FolderOpen, ChevronRight, ChevronDown, Plus, Edit2, Trash2, Check, X, Tag, Package } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface CategoryAccordionProps {
  categories: any[];
  products: any[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string | null) => void;
  onCreateCategory: () => void;
  onCreateProduct: () => void;
  onUpdateCategory: (categoryId: string, data: { name: string }) => Promise<any>;
  onDeleteCategory: (categoryId: string) => Promise<any>;
  onUpdateProduct: (productId: string, data: { name: string, categoryId: string, gender: string }) => Promise<any>;
  onDeleteProduct: (productId: string) => Promise<any>;
}

export default function CategoryAccordion({
  categories,
  products,
  selectedProductId,
  onSelectProduct,
  onCreateCategory,
  onCreateProduct,
  onUpdateCategory,
  onDeleteCategory,
  onUpdateProduct,
  onDeleteProduct,
}: CategoryAccordionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<'category' | 'product' | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // Auto-expand category if a product is selected
  useEffect(() => {
    if (selectedProductId) {
      const product = products.find(p => p.productId === selectedProductId);
      if (product) {
        setExpandedCategories(prev => ({ ...prev, [product.categoryId]: true }));
      }
    }
  }, [selectedProductId, products]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const startEdit = (e: React.MouseEvent, id: string, type: 'category' | 'product', initialValue: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingType(type);
    setEditValue(initialValue);
  };

  const cancelEdit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingId(null);
    setEditingType(null);
    setEditValue('');
  };

  const saveEdit = async (e: React.MouseEvent | React.FormEvent, id: string) => {
    if (e) {
      e.stopPropagation();
      if ('preventDefault' in e) e.preventDefault();
    }
    if (!editValue.trim()) return;

    if (editingType === 'category') {
      const res = await onUpdateCategory(id, { name: editValue });
      if (res.success) cancelEdit();
    } else if (editingType === 'product') {
      const prod = products.find(p => p.productId === id);
      if (prod) {
        const res = await onUpdateProduct(id, {
          name: editValue,
          categoryId: prod.categoryId,
          gender: prod.gender
        });
        if (res.success) cancelEdit();
      }
    }
  };

  const handleDeleteCategoryClick = async (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      await onDeleteCategory(categoryId);
    }
  };

  const handleDeleteProductClick = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await onDeleteProduct(productId);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-background select-none pr-2">
      {/* Botones de acción minimalistas */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={onCreateCategory}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-transparent hover:bg-primary/4 text-primary border border-primary/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <Plus size={14} /> Nueva Categoría
        </button>
        <button
          onClick={onCreateProduct}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary text-white hover:bg-secondary rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-sm"
        >
          <Plus size={14} /> Nuevo Producto
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pb-10">
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Catálogo</span>
          <button
            onClick={() => onSelectProduct(null)}
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer",
              selectedProductId === null
                ? "bg-accent/10 text-accent"
                : "text-primary/60 hover:text-primary"
            )}
          >
            Ver todo
          </button>
        </div>

        {categories.length === 0 ? (
          <p className="text-xs text-primary/40 text-center py-8 font-light italic">No hay categorías registradas.</p>
        ) : (
          categories.map(category => {
            const isExpanded = !!expandedCategories[category.categoryId];
            const categoryProducts = products.filter(p => p.categoryId === category.categoryId);

            return (
              <div key={category.categoryId} className="group/cat flex flex-col">
                {/* Fila de Categoría */}
                <div
                  onClick={() => toggleCategory(category.categoryId)}
                  className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-primary/3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="text-primary/40">
                      {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
                    </span>

                    {editingId === category.categoryId && editingType === 'category' ? (
                      <form
                        onSubmit={(e) => saveEdit(e, category.categoryId)}
                        className="flex items-center gap-1 flex-1 min-w-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 min-w-0 bg-white border border-primary/20 text-xs px-1.5 py-0.5 rounded outline-none focus:ring-1 focus:ring-accent"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="p-0.5 text-success hover:bg-success/10 rounded cursor-pointer"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="p-0.5 text-accent-red hover:bg-accent-red/10 rounded cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs font-semibold text-primary/95 truncate">
                        {category.name}
                      </span>
                    )}
                  </div>

                  {editingId !== category.categoryId && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-primary/35 group-hover/cat:hidden">
                        {categoryProducts.length}
                      </span>
                      <div className="hidden group-hover/cat:flex items-center gap-1.5">
                        <button
                          onClick={(e) => startEdit(e, category.categoryId, 'category', category.name)}
                          title="Editar"
                          className="text-primary/45 hover:text-accent p-0.5 hover:bg-accent/5 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteCategoryClick(e, category.categoryId)}
                          title="Eliminar"
                          className="text-primary/45 hover:text-accent-red p-0.5 hover:bg-accent-red/5 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <span className="text-primary/30 ml-0.5">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    </div>
                  )}
                </div>

                {/* Lista de productos bajo la categoría */}
                {isExpanded && (
                  <div className="ml-5 mt-1 pl-2 border-l border-primary/5 flex flex-col gap-0.5">
                    {categoryProducts.length === 0 ? (
                      <span className="text-[11px] text-primary/30 italic py-1 pl-4">Vacío</span>
                    ) : (
                      categoryProducts.map(product => {
                        const isSelected = selectedProductId === product.productId;

                        return (
                          <div
                            key={product.productId}
                            onClick={() => onSelectProduct(product.productId)}
                            className={cn(
                              "group/prod flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer transition-all duration-200",
                              isSelected
                                ? "bg-accent/10 text-accent"
                                : "hover:bg-primary/3 text-primary/70 hover:text-primary"
                            )}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Package size={12} className={isSelected ? "text-accent" : "text-primary/30"} />
                              
                              {editingId === product.productId && editingType === 'product' ? (
                                <form
                                  onSubmit={(e) => saveEdit(e, product.productId)}
                                  className="flex items-center gap-1 flex-1 min-w-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    ref={editInputRef}
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 min-w-0 bg-white border border-primary/20 text-xs px-1.5 py-0.5 rounded outline-none focus:ring-1 focus:ring-accent"
                                    autoFocus
                                  />
                                  <button
                                    type="submit"
                                    className="p-0.5 text-success hover:bg-success/10 rounded cursor-pointer"
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="p-0.5 text-accent-red hover:bg-accent-red/10 rounded cursor-pointer"
                                  >
                                    <X size={12} />
                                  </button>
                                </form>
                              ) : (
                                <span className="text-[11px] font-medium truncate">{product.name}</span>
                              )}
                            </div>

                            {editingId !== product.productId && (
                              <div className="hidden group-hover/prod:flex items-center gap-1 ml-2">
                                <button
                                  onClick={(e) => startEdit(e, product.productId, 'product', product.name)}
                                  title="Editar"
                                  className="text-primary/40 hover:text-accent p-0.5 hover:bg-accent/5 rounded cursor-pointer"
                                >
                                  <Edit2 size={10} />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteProductClick(e, product.productId)}
                                  title="Eliminar"
                                  className="text-primary/40 hover:text-accent-red p-0.5 hover:bg-accent-red/5 rounded cursor-pointer"
                                >
                                  <Trash2 size={10} />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
