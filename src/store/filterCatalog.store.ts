import { create } from "zustand";

interface FilterCatalogState {
  gender: string;
  color: unknown[];
  category: unknown[];
  products: unknown[];
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setGender: (gender: string) => void;
  setColor: (color: unknown[]) => void;
  setCategory: (category: unknown[]) => void;
  setPage: (page: number) => void;
  fetchProducts: () => Promise<void>;
}

const useFilterCatalogStore = create<FilterCatalogState>((set, get) => ({
    gender: 'mujer',
    color: [],
    category: [],
    products: [],
    page: 1,
    limit: 12,
    totalPages: 1,
    isLoading: false,
    error: null,

    setGender: (gender) => {
        set({ gender, page: 1 });
        get().fetchProducts();
    },

    setColor: (color) => {
        set({ color, page: 1 });
        get().fetchProducts();
    },

    setCategory: (category) => {
        set({ category, page: 1 });
        get().fetchProducts();
    },

    setPage: (page) => {
        set({ page });
        get().fetchProducts();
    },

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const { category, color, gender, page, limit } = get();
            
            const params = new URLSearchParams();

            if (gender) {
                params.append('gender', gender);
            }

            if (category && category.length > 0) {
                const activeCategories = category.map((c: any) => c.categoryId || c).join(',');
                params.append('category', activeCategories);
            }
            
            if (color && color.length > 0) {
                const activeColors = color.map((c: any) => c.name || c).join(',');
                params.append('color', activeColors);
            }

            if (page) params.append('page', page.toString());
            if (limit) params.append('limit', limit.toString());
            
            const url = `/api/catalog?${params.toString()}`;
            const res = await fetch(url);
            const json = await res.json();
            
            if (json.success) {
                set({ 
                    products: json.data.items || [], 
                    totalPages: json.data.totalPages || 1, 
                    isLoading: false 
                });
            } else {
                set({ error: json.error, isLoading: false });
            }
        } catch (err: unknown) {
            set({ error: (err as Error).message, isLoading: false });
        }
    }
}));

export default useFilterCatalogStore;