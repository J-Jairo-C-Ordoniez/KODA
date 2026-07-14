import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/shared/components/Toast';
import { fetchPlansApi, createPlanApi, updatePlanApi, deletePlanApi } from '@/features/super-admin/api/super-admin.api';

export function usePlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPlansApi();
      setPlans(data);
    } catch (err: any) {
      setError(err.message || 'Error cargando planes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPlan = async (planData: any) => {
    try {
      await createPlanApi(planData);
      showToast('success', 'Plan Creado', 'El plan ha sido registrado correctamente.');
      fetchPlans();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updatePlan = async (id: string, planData: any) => {
    try {
      await updatePlanApi(id, planData);
      showToast('success', 'Plan Actualizado', 'Los cambios han sido guardados.');
      fetchPlans();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deletePlan = async (id: string) => {
    try {
      await deletePlanApi(id);
      showToast('success', 'Plan Eliminado', 'El plan ha sido eliminado correctamente.');
      fetchPlans();
      return { success: true };
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
