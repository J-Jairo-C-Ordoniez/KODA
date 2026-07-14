/**
 * Cliente de API para el módulo de Autenticación
 */

export async function registerBusinessApi(formData: any): Promise<any> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Ocurrió un error durante el registro");
  }

  return data;
}

export async function requestPasswordResetApi(email: string): Promise<any> {
  const response = await fetch('/api/auth/forgot-password/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Error al solicitar el código');
  }

  return data;
}

export async function verifyResetCodeApi(email: string, code: string): Promise<any> {
  const response = await fetch('/api/auth/forgot-password/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Código inválido');
  }

  return data;
}

export async function resetPasswordApi(email: string, password: string): Promise<any> {
  const response = await fetch('/api/auth/forgot-password/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Error al restablecer la contraseña');
  }

  return data;
}
