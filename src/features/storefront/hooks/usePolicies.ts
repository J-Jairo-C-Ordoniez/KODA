import { useState, useEffect } from 'react';

export function usePolicies() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/policies");
        const result = await res.json();
        const policyData = result.success ? result.data : result;
        setData(policyData);
      } catch (err) {
        setError("Error loading policies");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPolicies();
  }, []);

  return { data, isLoading, error };
}
