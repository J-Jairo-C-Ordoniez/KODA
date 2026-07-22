import { useMemo, useState, useCallback, useEffect } from 'react';
import { useCatalogStore } from '@/store/useProductsStore';
import { useCartStore } from '@/store/useCartStore';
import { fetchProductsDataApi } from '@/features/dashboard/business/api/products.api';
import {
  fetchSalesMetricsApi,
  fetchCustomersApi,
  createSaleApi,
  type SalesPOSMetrics,
  type CustomerSummary,
  type CreateSaleDto,
} from '@/features/dashboard/business/api/sales.api';

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

export default function useSalesPOS(tenantId: string = 'default-tenant') {
  const { products, categories, isLoading: catalogLoading, setCatalogData, setLoading } = useCatalogStore();
  const { items: cartReferences, addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<SalesPOSMetrics>({
    revenueToday: 0,
    salesCountToday: 0,
    paymentMethodBreakdown: { cash: 0, transfer: 0, card: 0, debt: 0 },
    totalAccountsReceivable: 0,
  });
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [isProcessingSale, setIsProcessingSale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load/refresh catalog data from API into store
  const loadCatalogData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProductsDataApi(tenantId);
      setCatalogData(data.categories, data.products);
    } catch (err) {
      console.error('Error al obtener el catálogo en POS:', err);
    }
  }, [tenantId, setCatalogData, setLoading]);

  // Load catalog data if empty on mount
  useEffect(() => {
    if (products.length === 0) {
      loadCatalogData();
    }
  }, [products.length, loadCatalogData]);

  // Load POS metrics & customers
  const loadPOSData = useCallback(async () => {
    try {
      const [metricsData, customersData] = await Promise.all([
        fetchSalesMetricsApi(tenantId),
        fetchCustomersApi(tenantId),
      ]);
      setMetrics(metricsData);
      setCustomers(customersData);
    } catch (err: any) {
      console.error('Error loading POS metrics:', err);
    }
  }, [tenantId]);

  useEffect(() => {
    loadPOSData();
  }, [loadPOSData]);

  // Flatten all variants from catalog
  const allVariants = useMemo(() => {
    return products.flatMap(product =>
      (product.variants ?? []).map(variant => ({
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
  }, [products]);

  // Filtered variants for POS Grid
  const filteredVariants = useMemo(() => {
    return allVariants.filter(variant => {
      // Category filter
      if (selectedCategoryFilter && variant.categoryId !== selectedCategoryFilter) {
        return false;
      }
      // Search query filter (matches product name, variant name, or SKU)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = variant.productName.toLowerCase().includes(query);
        const matchVariant = variant.name.toLowerCase().includes(query);
        const matchSku = variant.sku.toLowerCase().includes(query);
        return matchName || matchVariant || matchSku;
      }
      return true;
    });
  }, [allVariants, selectedCategoryFilter, searchQuery]);

  // Hydrate cart references with full variant info from catalog
  const hydratedCartItems = useMemo<HydratedCartItem[]>(() => {
    return cartReferences
      .map(ref => {
        const variant = allVariants.find(v => v.variantId === ref.variantId);
        if (!variant) return null;
        return {
          variantId: variant.variantId,
          productId: variant.productId,
          productName: variant.productName,
          variantName: variant.name,
          sku: variant.sku,
          color: variant.color,
          size: variant.size,
          price: Number(variant.price),
          stock: variant.stock,
          image: variant.primaryImage,
          quantity: ref.quantity,
        };
      })
      .filter((item): item is HydratedCartItem => item !== null);
  }, [cartReferences, allVariants]);

  // Total Item Count & Subtotal
  const cartTotalItems = useMemo(() => {
    return hydratedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [hydratedCartItems]);

  const cartSubtotal = useMemo(() => {
    return hydratedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [hydratedCartItems]);

  // Process checkout transaction
  const processCheckout = async (data: {
    paymentMethod: 'cash' | 'transfer' | 'card' | 'debt';
    customerId?: string | null;
    discount?: number;
    notes?: string;
  }) => {
    if (hydratedCartItems.length === 0) {
      return { success: false, error: 'El carrito está vacío' };
    }

    setIsProcessingSale(true);
    setError(null);

    const payload: CreateSaleDto = {
      items: hydratedCartItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      paymentMethod: data.paymentMethod,
      customerId: data.customerId || null,
      discount: data.discount || 0,
      notes: data.notes,
    };

    try {
      const res = await createSaleApi(tenantId, payload);
      clearCart();
      await loadPOSData();
      await loadCatalogData(); // Refresh stock in catalog
      setIsProcessingSale(false);
      return { success: true, data: res };
    } catch (err: any) {
      setIsProcessingSale(false);
      setError(err.message || 'Error al procesar la venta');
      return { success: false, error: err.message || 'Error al procesar la venta' };
    }
  };

  return {
    catalogLoading,
    categories,
    filteredVariants,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,

    // Cart State & Actions
    cartItems: hydratedCartItems,
    cartTotalItems,
    cartSubtotal,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateCartQuantity: updateQuantity,
    clearCart,

    // POS Data & Checkout
    metrics,
    customers,
    isProcessingSale,
    error,
    processCheckout,
    refreshPOS: loadPOSData,
  };
}
