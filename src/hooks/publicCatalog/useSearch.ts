import { useState, useEffect } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Asumiendo que el controlador de variantes ahora soporta un flag 'popular'
        const popRes = await fetch("/api/catalog/variants?popular=true&limit=4");
        const popData = await popRes.json();
        if (popData.success) setPopular(popData.data || []);
      } catch (error) {
        console.error("Error fetching popular data:", error);
      }
    };
    fetchInitialData();
  }, []);

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
          const res = await fetch(`/api/catalog/products?search=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (data.success) {
            setResults(Array.isArray(data.data) ? data.data : data.data.items || []);
            setHasSearched(true);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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
    clearSearch
  };
}
