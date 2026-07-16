"use client";

import { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import useLogin from "@/features/auth/hooks/useLogin";
import Button from "@/shared/components/Button";

const inputClass = "w-full pl-11 pr-4 py-3 bg-background border border-primary/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-300 text-md font-medium text-primary placeholder:text-primary/40";
const labelClass = "block text-md font-normal leading-relaxed text-primary mb-2";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors duration-300";

export default function LoginForm() {
  const { formData, loading, error, handleChange, loginUser } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="space-y-6 w-full"
      onSubmit={loginUser}
      noValidate
    >
      <fieldset
        className="space-y-5"
        disabled={loading}
      >
        <legend className="sr-only">Formulario de inicio de sesión</legend>

        {error && (
          <div
            className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
            role="alert"
          >
            <p className="text-md font-normal leading-relaxed text-red-500 text-center">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className={labelClass}
          >
            Correo Electrónico
          </label>

          <div className="relative group">
            <Mail
              className={iconClass}
              size={20}
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="ejemplo@correo.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className={labelClass}
          >
            Contraseña
          </label>
          <div className="relative group">
            <Lock
              className={iconClass}
              size={20}
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors duration-300"
            >
              {showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
              }
            </button>
          </div>
        </div>
      </fieldset>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Accediendo...
            </span>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </div>

      <div className="pt-6 border-t border-primary/10 text-center">
        <p className="text-md font-normal leading-relaxed text-primary">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="text-md font-bold leading-relaxed text-primary hover:underline"
          >
            Registra tu negocio
          </Link>
        </p>
      </div>
    </form>
  );
}