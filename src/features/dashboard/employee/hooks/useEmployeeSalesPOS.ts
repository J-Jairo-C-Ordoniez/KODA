import { useReducer, useEffect, useCallback, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import { fetchGeneralStatsApi, fetchCustomersApi, type GeneralStats } from '@/features/dashboard/business/api/dashboard.api';
import { fetchProductsDataApi, type Category, type Variant, type Product } from '@/features/dashboard/business/api/products.api';
import { createSaleApi, type CreateSaleDto } from '@/features/dashboard/employee/api/sales.api';

export interface HydratedCartItem {
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
  quantity: number;
}

export interface POSVariant extends Variant {
  productId: string;
  productName: string;
  categoryId: string;
  primaryImage: string;
  stock: number;
}

export interface CustomerOption {
  customerId: string;
  name: string;
  phone?: string;
  totalDebt: number;
}

type State = {
  categories: Category[];
  topVariants: POSVariant[];
  searchResults: POSVariant[];
  isLoadingCatalog: boolean;
  isSearching: boolean;
  generalStats: GeneralStats | null;
  customers: CustomerOption[];
  isLoadingCustomers: boolean;
};

type Action =
  | { type: 'SET_CATALOG'; categories: Category[]; topVariants: POSVariant[] }
  | { type: 'SET_SEARCH_RESULTS'; results: POSVariant[] }
  | { type: 'SET_LOADING_CATALOG'; value: boolean }
  | { type: 'SET_SEARCHING'; value: boolean }
  | { type: 'SET_STATS'; data: GeneralStats }
  | { type: 'SET_CUSTOMERS'; customers: CustomerOption[] }
  | { type: 'SET_LOADING_CUSTOMERS'; value: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CATALOG':
      return { ...state, categories: action.categories, topVariants: action.topVariants, isLoadingCatalog: false };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.results, isSearching: false };
    case 'SET_LOADING_CATALOG':
      return { ...state, isLoadingCatalog: action.value };
    case 'SET_SEARCHING':
      return { ...state, isSearching: action.value };
    case 'SET_STATS':
      return { ...state, generalStats: action.data };
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.customers, isLoadingCustomers: false };
    case 'SET_LOADING_CUSTOMERS':
      return { ...state, isLoadingCustomers: action.value };
    default:
      return state;
  }
}

const initialState: State = {
  categories: [],
  topVariants: [],
  searchResults: [],
  isLoadingCatalog: true,
  isSearching: false,
  generalStats: null,
  customers: [],
  isLoadingCustomers: false,
};

export default function useEmployeeSalesPOS() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [isProcessingSale, setIsProcessingSale] = useState(false);

  const { items: cartReferences, addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  const loadInitialCatalog = useCallback(async () => {
    if (!tenantId) return;
    dispatch({ type: 'SET_LOADING_CATALOG', value: true });
    try {
      const data = await fetchProductsDataApi(tenantId);
      const categories = data.categories;

      const allVariants: POSVariant[] = data.products.flatMap((product: Product) =>
        (product.variants ?? []).map((variant: Variant) => ({
          ...variant,
          productId: product.productId,
          productName: product.name,
          categoryId: product.categoryId,
          primaryImage:
            variant.images?.find(i => i.isPrimary)?.content ||
            variant.images?.[0]?.content ||
            '/placeholder-product.png',
          stock: variant.inventories?.[0]?.stock ?? variant.stock ?? 0,
        })),
      );

      const topVariants = [...allVariants]
        .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
        .slice(0, 5);

      dispatch({ type: 'SET_CATALOG', categories, topVariants });
    } catch (err) {
      console.error('Error cargando catálogo POS:', err);
      dispatch({ type: 'SET_LOADING_CATALOG', value: false });
    }
  }, [tenantId]);

  const loadStats = useCallback(async () => {
    if (!tenantId) return;
    try {
      const data = await fetchGeneralStatsApi();
      dispatch({ type: 'SET_STATS', data });
    } catch (err) {
      console.error('Error cargando métricas POS:', err);
    }
  }, [tenantId]);

  useEffect(() => {
    loadInitialCatalog();
    loadStats();
  }, [loadInitialCatalog, loadStats]);

  useEffect(() => {
    if (!tenantId) return;
    const query = searchQuery.trim();
    if (!query) {
      dispatch({ type: 'SET_SEARCH_RESULTS', results: [] });
      return;
    }

    const timer = setTimeout(async () => {
      dispatch({ type: 'SET_SEARCHING', value: true });
      try {
        const data = await fetchProductsDataApi(tenantId);
        const lower = query.toLowerCase();
        const results: POSVariant[] = data.products.flatMap((product: Product) =>
          (product.variants ?? [])
            .map((variant: Variant) => ({
              ...variant,
              productId: product.productId,
              productName: product.name,
              categoryId: product.categoryId,
              primaryImage:
                variant.images?.find(i => i.isPrimary)?.content ||
                variant.images?.[0]?.content ||
                '/placeholder-product.png',
              stock: variant.inventories?.[0]?.stock ?? variant.stock ?? 0,
            }))
            .filter(
              v =>
                v.productName.toLowerCase().includes(lower) ||
                v.name.toLowerCase().includes(lower) ||
                v.sku.toLowerCase().includes(lower),
            ),
        );

        const filtered = selectedCategoryFilter
          ? results.filter(v => v.categoryId === selectedCategoryFilter)
          : results;

        dispatch({ type: 'SET_SEARCH_RESULTS', results: filtered });
      } catch {
        dispatch({ type: 'SET_SEARCHING', value: false });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategoryFilter, tenantId]);

  const loadCustomers = useCallback(async () => {
    if (!tenantId) return;
    dispatch({ type: 'SET_LOADING_CUSTOMERS', value: true });
    try {
      const res = await fetchCustomersApi(tenantId);
      dispatch({ type: 'SET_CUSTOMERS', customers: res });
    } catch {
      dispatch({ type: 'SET_LOADING_CUSTOMERS', value: false });
    }
  }, [tenantId]);

  const displayedVariants = useMemo<POSVariant[]>(() => {
    if (searchQuery.trim()) return state.searchResults;
    if (selectedCategoryFilter) {
      return state.topVariants.filter(v => v.categoryId === selectedCategoryFilter);
    }
    return state.topVariants;
  }, [searchQuery, state.searchResults, state.topVariants, selectedCategoryFilter]);

  const allKnownVariants = useMemo(() => {
    const map = new Map<string, POSVariant>();
    [...state.topVariants, ...state.searchResults].forEach(v => map.set(v.variantId, v));
    return map;
  }, [state.topVariants, state.searchResults]);

  const hydratedCartItems = useMemo<HydratedCartItem[]>(() => {
    return cartReferences
      .map(ref => {
        const v = allKnownVariants.get(ref.variantId);
        if (!v) return null;
        return {
          variantId: v.variantId,
          productId: v.productId,
          productName: v.productName,
          variantName: v.name,
          sku: v.sku,
          color: v.color,
          size: v.size,
          price: Number(v.price),
          stock: v.stock,
          image: v.primaryImage,
          quantity: ref.quantity,
        };
      })
      .filter((item): item is HydratedCartItem => item !== null);
  }, [cartReferences, allKnownVariants]);

  const cartTotalItems = useMemo(() => hydratedCartItems.reduce((acc, i) => acc + i.quantity, 0), [hydratedCartItems]);
  const cartSubtotal = useMemo(() => hydratedCartItems.reduce((acc, i) => acc + i.price * i.quantity, 0), [hydratedCartItems]);

  const processCheckout = async (data: {
    paymentMethod: 'cash' | 'transfer' | 'debt';
    customerId?: string | null;
    notes?: string;
  }) => {
    if (hydratedCartItems.length === 0) return { success: false, error: 'El carrito está vacío' };
    if (!tenantId) return { success: false, error: 'Sesión no disponible' };

    setIsProcessingSale(true);
    const payload: CreateSaleDto = {
      items: hydratedCartItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      total: cartSubtotal,
      paymentMethod: data.paymentMethod,
      customerId: data.customerId || undefined,
      notes: data.notes,
    };

    try {
      const res = await createSaleApi(tenantId, payload);
      clearCart();
      await Promise.all([loadInitialCatalog(), loadStats()]);
      return { success: true, data: res };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al procesar la venta' };
    } finally {
      setIsProcessingSale(false);
    }
  };

  return {
    isLoadingCatalog: state.isLoadingCatalog,
    isSearching: state.isSearching,
    categories: state.categories,
    displayedVariants,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,

    generalStats: state.generalStats,

    cartItems: hydratedCartItems,
    cartTotalItems,
    cartSubtotal,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateCartQuantity: updateQuantity,
    clearCart,

    customers: state.customers,
    isLoadingCustomers: state.isLoadingCustomers,
    loadCustomers,

    isProcessingSale,
    processCheckout,
  };
}
