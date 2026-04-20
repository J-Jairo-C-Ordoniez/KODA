"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Store, User, Mail, Lock, Phone, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AuthWrapper from "@/components/ui/AuthWrapper";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: "",
        type: "ropa",
        whatsapp: "",
        ownerName: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.businessName || !formData.whatsapp) {
                setError("Por favor completa los datos de tu negocio.");
                return;
            }
            setError("");
            setStep(2);
        }
    };

    const prevStep = () => setStep(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.ownerName || !formData.email || !formData.password) {
            setError("Por favor completa tus datos personales.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ocurrió un error durante el registro");
            }

            // Automatic Login
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
        <AnimatePresence mode="wait">
            <AuthWrapper
                title={step === 1 ? "Inicia tu camino" : "Crea tu cuenta"}
                subtitle={step === 1 ? "Cuéntanos sobre tu negocio para empezar la configuración." : "Último paso para acceder a tu panel de control."}
            >
                <div className="mb-8 flex items-center justify-between px-2">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-navy' : 'text-secondary/40'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${step >= 1 ? 'border-navy bg-navy/5' : 'border-secondary/20'}`}>1</div>
                        <span className="text-[10px] uppercase font-black tracking-widest hidden sm:inline">Negocio</span>
                    </div>
                    <div className="h-[2px] grow mx-4 bg-foreground/5 relative">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: step === 2 ? "100%" : "0%" }}
                            className="absolute inset-0 bg-navy"
                        />
                    </div>
                    <div className={`flex items-center gap-2 ${step === 2 ? 'text-navy' : 'text-secondary/40'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${step === 2 ? 'border-navy bg-navy/5' : 'border-secondary/20'}`}>2</div>
                        <span className="text-[10px] uppercase font-black tracking-widest hidden sm:inline">Dueño</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="businessName" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
                                        Nombre del Negocio
                                    </label>
                                    <div className="relative group">
                                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                                        <input
                                            id="businessName"
                                            name="businessName"
                                            type="text"
                                            required
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/40"
                                            placeholder="Ej: Moda Stilos"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="type" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
                                        Tipo de Tienda
                                    </label>
                                    <div className="relative group">
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium appearance-none"
                                        >
                                            <option value="ropa">Ropa y Accesorios</option>
                                            <option value="calzado">Calzado</option>
                                            <option value="general">Comercio General</option>
                                        </select>
                                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary rotate-90" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
                                        Número de WhatsApp
                                    </label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                                        <input
                                            id="whatsapp"
                                            name="whatsapp"
                                            type="text"
                                            required
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/40"
                                            placeholder="300 123 4567"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    variant="navy"
                                    className="w-full py-4 rounded-2xl font-black tracking-tight"
                                >
                                    Continuar
                                    <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="ownerName" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
                                        Nombre del Responsable
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                                        <input
                                            id="ownerName"
                                            name="ownerName"
                                            type="text"
                                            required
                                            value={formData.ownerName}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/40"
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                </div>

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
                                            placeholder="tucorreo@ejemplo.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-xs font-black uppercase tracking-[0.1em] text-secondary ml-1">
                                        Contraseña
                                    </label>
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
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        onClick={prevStep}
                                        variant="secondary"
                                        className="bg-foreground/5 hover:bg-foreground/10 py-4 px-6 rounded-2xl font-black text-secondary"
                                    >
                                        <ArrowLeft size={18} />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        variant="navy"
                                        className="grow py-4 rounded-2xl font-black tracking-tight"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...
                                            </>
                                        ) : (
                                            "Completar Registro"
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="pt-6 border-t border-foreground/5">
                        <p className="text-center text-sm text-secondary font-medium">
                            ¿Ya tienes cuenta?{" "}
                            <Link href="/login" className="font-black text-navy hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </AuthWrapper>
        </AnimatePresence>
    );
}
