export interface PolicySection {
  title: string;
  content: string;
}

export interface PolicyContent {
  lastUpdate: string;
  sections: PolicySection[];
}

export interface Policy {
  title: string;
  content: PolicyContent;
}

export default async function fetchPolicyApi(title: string): Promise<Policy> {
  const response = await fetch(`/api/legal/${encodeURIComponent(title)}`, { cache: "no-store" });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar la política");
  }

  return data.data;
}