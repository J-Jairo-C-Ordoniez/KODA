import { useState, useCallback } from 'react';

export function useManagePlans() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/plans');
      const json = await res.json();
      if (json.success) {
        setPlans(json.data || []);
      } else {
        setError(json.error || 'Error al cargar los planes');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePlan = async (data: any, editingPlan: any = null) => {
    setIsSaving(true);
    try {
      const url = editingPlan ? `/api/plans/${editingPlan.planId}` : '/api/plans';
      const method = editingPlan ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        await fetchPlans();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al guardar el plan' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    plans,
    isLoading,
    isSaving,
    error,
    fetchPlans,
    savePlan
  };
}
