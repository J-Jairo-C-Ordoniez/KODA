"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import AuthWrapper from "@/components/Auth/Main/ui/AuthWrapper";
import Steps from "@/components/Auth/Main/ui/Steps";
import StepOne from "@/components/Auth/Main/ui/StepOne";
import StepTwo from "@/components/Auth/Main/ui/StepTwo";
import Error from "@/components/ui/Error";

export default function Register() {
    const { registerUser, isLoading, error } = useRegister();
    const [alert, setAlert] = useState<any>(null);
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
                setAlert("Por favor completa los datos de tu negocio.");
                return;
            }
            setAlert("");
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        registerUser(formData);
    };

    return (
        <AnimatePresence mode="wait">
            <AuthWrapper
                title={step === 1 ? "Inicia tu camino" : "Crea tu cuenta"}
                subtitle={step === 1 ? "Cuéntanos sobre tu negocio para empezar la configuración." : "Último paso para acceder a tu panel de control."}
            >
                <Steps step={step} />

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error || alert && (
                        <Error message={error || alert} />
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
                                prevStep={() => setStep(1)}
                                loading={isLoading}
                            />
                        )}
                    </AnimatePresence>

                    <div className="pt-6 border-t border-foreground/5">
                        <p className="text-md text-primary/80 font-medium leading-snug tracking-wider">
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
