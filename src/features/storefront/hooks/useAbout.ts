import { useState, useEffect } from 'react';

export function useAbout() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/about");
        const result = await res.json();
        setData(result.success ? result.data : result);
      } catch (err) {
        setError("Error loading about information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAbout();
  }, []);

  return { data, isLoading, error };
}
