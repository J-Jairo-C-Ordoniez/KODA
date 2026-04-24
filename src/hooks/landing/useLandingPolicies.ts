import { useState, useEffect } from "react";

export function useLandingPolicies() {
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/policies');
        const result = await response.json();

        if (result.success) {
          setPolicy(result.data);
        } else {
          setError(result.error || result.message || "Error al cargar las políticas");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  return { policy, isLoading, error };
}
