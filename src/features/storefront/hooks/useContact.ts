import { useState, useEffect } from 'react';

export function useContact() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/contact");
        const result = await res.json();
        const contactData = result.success ? result.data : result;
        setData(contactData?.contact || contactData || null);
      } catch (err) {
        setError("Error loading contact information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContact();
  }, []);

  return { data, isLoading, error };
}
