import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export function usePlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/plans');
      const data = await res.json();
      if (data.success) {
        setPlans(data.data || []);
      } else {
        setError(data.error || 'Error cargando planes');
      }
    } catch (err: any) {
      setError(err.message || 'Error cargando planes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPlan = async (planData: any) => {
    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Plan Creado', 'El plan ha sido registrado correctamente.');
        fetchPlans();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updatePlan = async (id: string, planData: any) => {
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Plan Actualizado', 'Los cambios han sido guardados.');
        fetchPlans();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const res = await fetch(`/api/plans/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Plan Eliminado', 'El plan ha sido eliminado correctamente.');
        fetchPlans();
        return { success: true };
      }
      showToast('error', 'No se pudo eliminar', data.error);
      return { success: false, error: data.error };
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    isLoading,
    error,
    fetchPlans,
    createPlan,
    updatePlan,
    deletePlan
  };
}
