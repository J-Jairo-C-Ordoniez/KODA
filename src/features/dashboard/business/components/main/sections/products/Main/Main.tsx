'use client';

import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useProductsStore } from '@/store/useProductsStore';
import useProducts from '@/features/dashboard/business/hooks/useProducts';
import type { Product, Variant } from '@/features/dashboard/business/api/products.api';
import type { ToastType } from '@/shared/hooks/useToast';

import VariantCard from '@/features/dashboard/business/components/main/sections/products/Main/ui/VariantCard';
import VariantDrawer from '@/features/dashboard/business/components/main/sections/products/Main/ui/VariantDrawer';
import ProductForm from '@/features/dashboard/business/components/main/sections/products/Main/ui/ProductForm';
import CategoryForm from '@/features/dashboard/business/components/main/sections/products/Main/ui/CategoryForm';
import Loader from '@/shared/components/Loader';
import Button from '@/shared/components/Button';

type ToastHandler = (type: ToastType, message: string, description?: string) => void;
type VariantWithProductName = Variant & { productName?: string };

interface ProductsMainProps {
    showToast: ToastHandler;
}

export default function ProductsMain({ showToast }: ProductsMainProps) {
    const { activeView, selectedProductId, editingItem, products, categories, setActiveView, isLoading } = useProductsStore();
    const { isSaving, saveVariant, updateVariantStock, deleteVariant, saveCategory, saveProduct } = useProducts();

    const [selectedVariant, setSelectedVariant] = useState<VariantWithProductName | null>(null);
    const [isVariantDrawerOpen, setIsVariantDrawerOpen] = useState(false);

    const selectedProduct = useMemo<Product | null>(() => {
        if (!selectedProductId) return null;
        return products.find(product => product.productId === selectedProductId) ?? null;
    }, [products, selectedProductId]);

    const selectedCategory = useMemo(() => {
        if (!selectedProduct) return null;
        return categories.find(category => category.categoryId === selectedProduct.categoryId) ?? null;
    }, [categories, selectedProduct]);

    const displayedVariants = useMemo<VariantWithProductName[]>(() => {
        if (selectedProduct) {
            return selectedProduct.variants ?? [];
        }

        return products.flatMap(product =>
            (product.variants ?? []).map(variant => ({
                ...variant,
                productName: product.name,
            })),
        );
    }, [products, selectedProduct]);

    const handleSaveCategory = async (formData: any) => {
        const res = await saveCategory(formData, editingItem);
        if (res.success) {
            showToast('success', editingItem ? 'Categoría actualizada' : 'Categoría creada', 'Los cambios se han guardado.');
            setActiveView('grid');
        } else {
            showToast('error', 'Error al guardar categoría', res.error);
        }
        return res;
    };

    const handleSaveProduct = async (formData: any) => {
        const res = await saveProduct(formData, editingItem);
        if (res.success) {
            showToast('success', editingItem ? 'Producto actualizado' : 'Producto creado', 'El producto se ha guardado.');
            setActiveView('grid');
        } else {
            showToast('error', 'Error al guardar producto', res.error);
        }
        return res;
    };

    const handleSaveVariant = async (formData: any) => {
        const res = await saveVariant(formData, selectedVariant, selectedProductId);
        if (res.success) {
            showToast('success', selectedVariant ? 'Variante actualizada' : 'Variante creada', 'Los cambios se guardaron con éxito.');
            setIsVariantDrawerOpen(false);
            setSelectedVariant(null);
        } else {
            showToast('error', 'Error al guardar variante', res.error);
        }
        return res;
    };

    const handleQuickUpdateStock = async (variantId: string, stock: number) => {
        const res = await updateVariantStock(variantId, stock);
        if (res.success) {
            showToast('success', 'Stock actualizado', `La cantidad disponible quedó en ${stock}.`);
        } else {
            showToast('error', 'Error de actualización', res.error);
        }
        return res;
    };

    const handleDeleteVariant = async (variantId: string) => {
        const res = await deleteVariant(variantId);
        if (res.success) {
            showToast('success', 'Variante eliminada', 'La variante se removió del catálogo.');
            setIsVariantDrawerOpen(false);
            setSelectedVariant(null);
        } else {
            showToast('error', 'Error al eliminar', res.error);
        }
        return res;
    };

    const openVariantDrawer = (variant: VariantWithProductName | null = null) => {
        setSelectedVariant(variant);
        setIsVariantDrawerOpen(true);
    };

    if (isLoading && products.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-background">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-7">
            {activeView === 'create-category' && (
                <CategoryForm
                    editingCategory={editingItem}
                    onCancel={() => setActiveView('grid')}
                    onSave={handleSaveCategory}
                    isSaving={isSaving}
                />
            )}

            {activeView === 'create-product' && (
                <ProductForm
                    categories={categories}
                    editingProduct={editingItem}
                    onCancel={() => setActiveView('grid')}
                    onSave={handleSaveProduct}
                    isSaving={isSaving}
                />
            )}

            {activeView === 'grid' && (
                <section className="space-y-6 animate-in fade-in duration-500">
                    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
                        <nav
                            className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary/60"
                            aria-label="Ubicación del Productos"
                        >
                            <span className="rounded-md bg-foreground-muted/40 px-3 py-1 text-sm text-primary/80">
                                Productos
                            </span>
                            <ChevronRight
                                size={18}
                                className="text-primary/25"
                            />
                            {selectedCategory && (
                                <>
                                    <span className="text-sm text-primary/80">
                                        {selectedCategory.name}
                                    </span>
                                    <ChevronRight
                                        size={18}
                                        className="text-primary/25"
                                    />
                                </>
                            )}
                            <span className="p-1 text-sm text-primary/80">
                                {selectedProduct ? selectedProduct.name : 'Todos los productos'}
                            </span>
                        </nav>

                        {selectedProductId && (
                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant='secondary'
                                    onClick={() => setActiveView('create-product', selectedProduct)}
                                >
                                    Editar producto
                                </Button>
                                <Button
                                    variant='primary'
                                    onClick={() => openVariantDrawer()}
                                >
                                    Nueva variante
                                </Button>
                            </div>
                        )}
                    </header>

                    {displayedVariants.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-20 w-full h-full mx-auto">
                            <h3 className="text-lg font-medium text-primary tracking-tight">
                                {selectedProduct ? 'Sin variantes registradas' : 'Tu catálogo está listo para organizarse'}
                            </h3>
                            <p className="text-sm text-primary/60 leading-relaxed max-w-md my-2">
                                {selectedProduct
                                    ? 'Crea una variante con precio, color, talla y stock inicial para empezar a vender este producto.'
                                    : 'Selecciona un producto del menú lateral para ver sus variantes, o crea un producto nuevo para empezar a cargar inventario.'}
                            </p>
                            {selectedProduct && (
                                <Button
                                    variant='primary'
                                    onClick={() => openVariantDrawer()}
                                >
                                    Crear primera variante
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {displayedVariants.map(variant => (
                                <VariantCard
                                    key={variant.variantId}
                                    variant={variant}
                                    productName={variant.productName || selectedProduct?.name || 'Producto'}
                                    onClick={() => openVariantDrawer(variant)}
                                    onUpdateStock={handleQuickUpdateStock}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            <VariantDrawer
                isOpen={isVariantDrawerOpen}
                variant={selectedVariant}
                productId={selectedProductId || ''}
                onClose={() => setIsVariantDrawerOpen(false)}
                onSave={handleSaveVariant}
                onDelete={handleDeleteVariant}
                isSaving={isSaving}
            />
        </div>
    );
}
