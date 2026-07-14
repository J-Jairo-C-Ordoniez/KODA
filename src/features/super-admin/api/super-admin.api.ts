/**
 * Cliente de API para el módulo Super Admin (Métricas, Planes, Políticas)
 */

export async function fetchPlansApi(): Promise<any[]> {
  const response = await fetch('/api/plans', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al obtener los planes');
  }
  return data.data || [];
}

export async function createPlanApi(planData: any): Promise<any> {
  const response = await fetch('/api/plans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al crear el plan');
  }
  return data;
}

export async function updatePlanApi(id: string, planData: any): Promise<any> {
  const response = await fetch(`/api/plans/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al actualizar el plan');
  }
  return data;
}

export async function patchPlanApi(id: string, planData: any): Promise<any> {
  const response = await fetch(`/api/plans/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al guardar el plan');
  }
  return data;
}

export async function deletePlanApi(id: string): Promise<any> {
  const response = await fetch(`/api/plans/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al eliminar el plan');
  }
  return data;
}

export async function fetchSubscriptionsApi(): Promise<{ subs: any[]; stats: any; plans: any[] }> {
  const [subsRes, statsRes, plansRes] = await Promise.all([
    fetch('/api/subscriptions', { cache: 'no-store' }),
    fetch('/api/subscriptions/stats', { cache: 'no-store' }),
    fetch('/api/plans', { cache: 'no-store' }),
  ]);

  const [subsData, statsData, plansData] = await Promise.all([
    subsRes.json(), statsRes.json(), plansRes.json()
  ]);

  return {
    subs: subsData.success ? subsData.data || [] : [],
    stats: statsData.success ? statsData.data : { mrr: 0, activeCount: 0, pastDueCount: 0 },
    plans: plansData.success ? plansData.data || [] : [],
  };
}

export async function registerPaymentApi(data: { subscriptionId: string; amount: number; method: string; manualEndDate?: string }): Promise<any> {
  const res = await fetch('/api/subscriptions/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Error al registrar el pago');
  return json;
}

export async function assignPlanApi(data: { tenantId: string; planId: string; amount: number; method: string; manualEndDate?: string; isFreeTrial?: boolean }): Promise<any> {
  const res = await fetch('/api/subscriptions/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Error al asignar el plan');
  return json;
}

export async function fetchTenantCountsApi(): Promise<{ total: number; active: number; suspended: number }> {
  const [allRes, activeRes, suspendedRes] = await Promise.all([
    fetch('/api/tenants/counts?type=all', { cache: 'no-store' }),
    fetch('/api/tenants/counts?type=active', { cache: 'no-store' }),
    fetch('/api/tenants/counts?type=suspended', { cache: 'no-store' }),
  ]);
  const [allData, activeData, suspendedData] = await Promise.all([allRes.json(), activeRes.json(), suspendedRes.json()]);
  return {
    total: allData.success ? allData.data : 0,
    active: activeData.success ? activeData.data : 0,
    suspended: suspendedData.success ? suspendedData.data : 0,
  };
}

export async function fetchTenantsApi(searchQuery = '', status = ''): Promise<any[]> {
  const params = new URLSearchParams();
  if (searchQuery) params.append('search', searchQuery);
  if (status) params.append('status', status);
  const url = params.toString() ? `/api/tenants/search?${params.toString()}` : '/api/tenants';
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.data || [];
}

export async function updateTenantStatusApi(tenantId: string, status: string): Promise<any> {
  const res = await fetch('/api/tenants/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenantId, status }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Error al actualizar estado');
  return data;
}

export async function fetchTenantMetricsApi(): Promise<any> {
  const [activeTenantRes, mrrRes, onboardingRes, churnCountRes, churnRateRes] = await Promise.all([
    fetch('/api/tenants/counts?type=active', { cache: 'no-store' }),
    fetch('/api/tenants/MRR', { cache: 'no-store' }),
    fetch('/api/tenants/onboarding', { cache: 'no-store' }),
    fetch('/api/tenants/churn?type=MonthlyChurnCount', { cache: 'no-store' }),
    fetch('/api/tenants/churn?type=ChurnRate', { cache: 'no-store' }),
  ]);
  const [activeData, mrrData, onboardingData, churnCountData, churnRateData] = await Promise.all([
    activeTenantRes.json(), mrrRes.json(), onboardingRes.json(), churnCountRes.json(), churnRateRes.json(),
  ]);
  if (!activeData.success || !mrrData.success || !onboardingData.success || !churnCountData.success || !churnRateData.success) {
    throw new Error('Error al cargar las métricas del ecosistema');
  }
  return {
    activeCount: Number(activeData.data) || 0,
    mrr: Number(mrrData.data) || 0,
    onboardingPercentage: onboardingData.data?.percentage ? Number(onboardingData.data.percentage) : 0,
    churnCount: Number(churnCountData.data) || 0,
    churnRate: churnRateData.data ? Number(churnRateData.data) : 0,
  };
}

export async function fetchPoliciesApi(): Promise<any> {
  const response = await fetch('/api/policies', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al obtener las políticas');
  }
  return data.data;
}

export async function savePoliciesApi(data: any): Promise<any> {
  const response = await fetch('/api/policies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al guardar las políticas');
  }
  return json;
}
