"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import AuthWrapper from "@/components/Auth/Main/ui/AuthWrapper";
import Steps from "@/components/Auth/Main/ui/Steps";
import StepOne from "@/components/Auth/Main/ui/StepOne";
import StepTwo from "@/components/Auth/Main/ui/StepTwo";

export default function Register() {
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
                setError(data.error || "Ocurrió un error durante el registro");
            }

            const loginResult = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (loginResult?.error) {
                setError(loginResult.error);
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
                <Steps step={step} />

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <StepOne
                                formData={formData}
                                handleChange={handleChange}
                                nextStep={nextStep}
                            />
                        ) : (
                            <StepTwo
                                formData={formData}
                                handleChange={handleChange}
                                prevStep={prevStep}
                                loading={loading}
                            />
                        )}
                    </AnimatePresence>

                    <div className="pt-6 border-t border-foreground/5">
                        <p className="text-center text-sm text-secondary font-medium">
                            ¿Ya tienes cuenta?{" "}
                            <Link href="/login" className="font-medium text-navy hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </AuthWrapper>
        </AnimatePresence>
    );
}
