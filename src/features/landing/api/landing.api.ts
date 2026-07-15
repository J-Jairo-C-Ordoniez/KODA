export interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  feature: string[];
}

export default async function fetchPlansApi(): Promise<Plan[]> {
  const response = await fetch('/api/plans', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al obtener los planes');
  }
  return data.data || [];
}