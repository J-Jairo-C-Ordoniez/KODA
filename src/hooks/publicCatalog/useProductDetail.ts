import { useState, useEffect } from "react";

export function useProductDetail(variantId: string | undefined, setBreadcrumbsProduct?: any) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (!variantId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/catalog/variants/${variantId}`);
        const result = await res.json();

        if (result.success) {
          setData(result.data);
          setSelectedVariant(result.data);

          const variant = result.data;
          const product = variant.product;
          
          if (setBreadcrumbsProduct && product) {
            setBreadcrumbsProduct(
              product.gender === 'hombre' ? 'hombre' : 'mujer',
              product.name,
              variant.name
            );
          }
        } else {
          setError(result.error || result.message || "Producto no encontrado");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [variantId, setBreadcrumbsProduct]);

  return { data, isLoading, error, selectedVariant, setSelectedVariant };
}
