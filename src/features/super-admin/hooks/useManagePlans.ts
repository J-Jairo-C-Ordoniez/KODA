import { useState, useCallback } from 'react';
import { fetchPlansApi, createPlanApi, patchPlanApi } from '@/features/super-admin/api/super-admin.api';

export function useManagePlans() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPlansApi();
      setPlans(data as any);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los planes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePlan = async (data: any, editingPlan: any = null) => {
    setIsSaving(true);
    try {
      if (editingPlan) {
        await patchPlanApi(editingPlan.planId, data);
      } else {
        await createPlanApi(data);
      }
      await fetchPlans();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar el plan' };
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
