import { useState, useEffect } from "react";

export function useLandingPlans() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/plans');
        const result = await response.json();

        if (result.success) {
          setPlans(result.data || []);
        } else {
          setError(result.error || result.message || "Error al cargar los planes");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, isLoading, error };
}
