export async function fetchPlansApi(): Promise<any[]> {
  const response = await fetch('/api/plans', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al obtener los planes');
  }
  return data.data || [];
}