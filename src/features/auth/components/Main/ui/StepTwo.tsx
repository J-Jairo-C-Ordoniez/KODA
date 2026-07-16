"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

import Button from "@/shared/components/Button";

const inputClass = "w-full pl-11 pr-4 py-3 bg-background border border-primary/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-300 text-md font-medium text-primary placeholder:text-primary/40";
const labelClass = "block text-md font-normal leading-relaxed text-primary mb-2";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors duration-300";

export default function StepTwo({ formData, handleChange, prevStep, loading }: any) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className={labelClass}
                >
                    Nombre
                </label>

                <div className="relative group">
                    <User
                        className={iconClass}
                        size={20}
                    />
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej: Juan Manuel Cardenas"
                    />
                </div>
            </div>

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
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="tucorreo@ejemplo.com"
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
                        className={`${inputClass} pr-11`}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                    >
                        {showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />
                        }
                    </button>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                >
                    <ArrowLeft size={20} />
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    className="w-full"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Creando...
                        </span>
                    ) : (
                        "Completar Registro"
                    )}
                </Button>
            </div>
        </div>
    );
}