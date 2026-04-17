import { useState, useEffect } from "react";

export function usePublicData(endpoint) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || result.error || "Error al cargar la información");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}
