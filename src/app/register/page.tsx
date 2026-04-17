"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    whatsapp: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Register the business
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error durante el registro");
      }

      // 2. Automatic Login after successful registration
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginResult?.error) {
        router.push("/login?registered=true");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-sm font-medium hover:underline flex items-center gap-1">
            <ArrowLeft size={16} /> Volver
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Activa tu negocio en KODA
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a la plataforma minimalista de Punto de Venta
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-xl rounded-2xl overflow-hidden p-[1px] bg-gradient-to-br from-gray-200 to-gray-400">
        <div className="bg-white py-8 px-4 rounded-2xl sm:px-10 h-full w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Nombre del Negocio
              </label>
              <div className="mt-1">
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  placeholder="Ej: Moda Stilos"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Nombre del Responsable / Admin
              </label>
              <div className="mt-1">
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  placeholder="admin@tunegocio.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                Número de WhatsApp (Contacto)
              </label>
              <div className="mt-1 flex items-center shadow-sm border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#1a1a1a]">
                <span className="pl-3 text-gray-500 text-sm border-r pr-2">+57</span>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border-0 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="3001234567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a1a1a] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
                  </>
                ) : (
                  "Solicitar Registro"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t pt-4">
             <p className="text-center text-sm text-gray-600">
              ¿Ya estás registrado? <Link href="/login" className="font-semibold text-black hover:underline">Ingresa aquí</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

