import { useState, useEffect } from "react";

export function useSearch(tenantId?: string) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch popular/recommended variants on mount (scoped to tenant)
  useEffect(() => {
    if (!tenantId) return;
    const fetchPopular = async () => {
      try {
        const res = await fetch(`/api/catalog/products?tenantId=${tenantId}&limit=6`);
        const data = await res.json();
        if (data.success) {
          const items = Array.isArray(data.data) ? data.data : data.data?.items || [];
          setPopular(items);
        }
      } catch (error) {
        console.error("Error fetching popular data:", error);
      }
    };
    fetchPopular();
  }, [tenantId]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setHasSearched(false);
        return;
      }

      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const params = new URLSearchParams({ search: query });
          if (tenantId) params.set("tenantId", tenantId);

          const res = await fetch(`/api/catalog/products?${params.toString()}`);
          const data = await res.json();
          if (data.success) {
            const items = Array.isArray(data.data) ? data.data : data.data?.items || [];
            setResults(items);
            setHasSearched(true);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }, 400);

    return () => clearTimeout(timer);
  }, [query, tenantId]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return {
    query,
    setQuery,
    results,
    popular,
    isLoading,
    hasSearched,
    clearSearch,
  };
}
