export interface AuthResponse<T = void> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;

  businessName: string;
  whatsApp: string;
  type: string;
}

export default async function registerBusinessApi(formData: RegisterFormData): Promise<AuthResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Ocurrió un error durante el registro");
  }

  return data;
}