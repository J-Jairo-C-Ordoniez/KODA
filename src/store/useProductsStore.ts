// store/useCatalogStore.ts (o la ruta donde manejes tus stores)
import { create } from 'zustand';
import { Category, Product } from '@/features/dashboard/business/api/products.api';

export type ActiveView =
  | 'grid'
  | 'create-product'
  | 'edit-product'
  | 'create-category'
  | 'edit-category';

interface CatalogState {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;

  selectedProductId: string | null;
  editingItem: any | null;
  activeView: ActiveView;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCatalogData: (categories: Category[], products: Product[]) => void;
  setSelectedProduct: (productId: string | null) => void;
  setActiveView: (view: ActiveView, editingItem?: any) => void;
}

export const useProductsStore = create<CatalogState>((set) => ({
  categories: [],
  products: [],
  isLoading: true,
  error: null,

  selectedProductId: null,
  editingItem: null,
  activeView: 'grid',

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  setCatalogData: (categories, products) =>
    set({ categories, products, isLoading: false, error: null }),

  setSelectedProduct: (productId) =>
    set({ selectedProductId: productId, activeView: 'grid', editingItem: null }),

  setActiveView: (view, editingItem = null) =>
    set({ activeView: view, editingItem }),
}));