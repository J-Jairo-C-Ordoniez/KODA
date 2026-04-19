"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/components/landing/ui/AuthWrapper";
import Button from "@/components/landing/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
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
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor intenta de nuevo.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper 
      title="Bienvenido de nuevo" 
      subtitle="Accede a tu panel y mantén el control de tu negocio en tiempo real."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
            Correo Electrónico
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/40"
              placeholder="admin@tunegocio.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label htmlFor="password" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary">
              Contraseña
            </label>
            <Link href="/forgot-password" alt="Recuperar contraseña" title="Recuperar contraseña" className="text-[10px] font-black uppercase tracking-[0.1em] text-navy hover:underline">
               ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/40"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            variant="navy"
            className="w-full py-4 rounded-2xl font-black tracking-tight"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </div>

        <div className="pt-6 border-t border-foreground/5">
          <p className="text-center text-sm text-secondary font-medium">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-black text-navy hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </form>
    </AuthWrapper>
  );
}
