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
    setGender: (gender: string, tenantId: string) => void;
    setColor: (color: unknown[], tenantId: string) => void;
    setCategory: (category: unknown[], tenantId: string) => void;
    setPage: (page: number, tenantId: string) => void;
    fetchProducts: (tenantId: string) => Promise<void>;
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

    setGender: (gender, tenantId) => {
        set({ gender, page: 1 });
        get().fetchProducts(tenantId);
    },

    setColor: (color, tenantId) => {
        set({ color, page: 1 });
        get().fetchProducts(tenantId);
    },

    setCategory: (category, tenantId) => {
        set({ category, page: 1 });
        get().fetchProducts(tenantId);
    },

    setPage: (page, tenantId) => {
        set({ page });
        get().fetchProducts(tenantId);
    },

    fetchProducts: async (tenantId: string) => {
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

            const url = `/api/catalog/products?${params.toString()}&tenantId=${tenantId}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) {
                set({ error: data.error, isLoading: false });
            }

            set({ products: data.items, totalPages: data.totalPages, isLoading: false });

        } catch (err: unknown) {
            set({ error: (err as Error).message, isLoading: false });
        }
    }
}));

export default useFilterCatalogStore;