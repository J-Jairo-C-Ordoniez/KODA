"use client";

import { useState } from "react";
import { Loader2, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginForm() {
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
    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
      <fieldset className="space-y-6">
        <legend className="sr-only">Formulario de inicio de sesión</legend>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl" role="alert">
            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground-muted mb-2">
            Correo Electrónico
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-background border border-foreground/8 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all duration-200 text-sm md:text-base font-medium text-primary placeholder:text-foreground-muted/50"
              placeholder="admin@tunegocio.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ml-1 gap-1 sm:gap-0">
            <label htmlFor="password" className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground-muted">
              Contraseña
            </label>
            <Link href="/forgot-password" title="Recuperar contraseña" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-contrast hover:opacity-80 transition-opacity">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-background border border-foreground/8 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all duration-200 text-sm md:text-base font-medium text-primary placeholder:text-foreground-muted/50"
              placeholder="••••••••"
            />
          </div>
        </div>
      </fieldset>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          variant="contrast"
          className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black tracking-widest uppercase text-xs md:text-sm"
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

      <div className="pt-6 border-t border-foreground/5 text-center">
        <p className="text-sm md:text-md text-primary/80 font-medium leading-snug tracking-wider">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-bold text-contrast hover:opacity-80 transition-opacity">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
