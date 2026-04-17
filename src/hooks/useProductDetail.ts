import { useState, useEffect } from "react";

export function useProductDetail(variantId, setBreadcrumbsProduct) {
  const [data, setData] = useState(null);
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
          
          if (setBreadcrumbsProduct) {
            setBreadcrumbsProduct(
              product.gender === 'hombre' ? 'hombre' : 'mujer',
              product.name,
              variant.name
            );
          }
        } else {
          setError(result.message || "Producto no encontrado");
        }

        const contactRes = await fetch("/api/contact");
        const contactResult = await contactRes.json();
        if (contactResult.success) {
          setContact(contactResult.data.contact);
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [variantId, setBreadcrumbsProduct]);

  return { data, contact, isLoading, error, selectedVariant, setSelectedVariant };
}
