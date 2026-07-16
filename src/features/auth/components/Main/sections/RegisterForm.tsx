"use client";

import { useState } from "react";
import useRegister from "@/features/auth/hooks/useRegister";
import Link from "next/link";

import StepOne from "@/features/auth/components/Main/ui/StepOne";
import StepTwo from "@/features/auth/components/Main/ui/StepTwo";

export default function Register() {
    const { registerUser, formData, loading, error, handleChange } = useRegister();
    const [step, setStep] = useState(1);

    return (
        <form
            className="space-y-6 w-full"
            onSubmit={registerUser}
            noValidate
        >
            <fieldset
                disabled={loading}
                className="space-y-5"
            >
                <legend className="sr-only">Formulario de registro</legend>

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

                {step === 1 ? (
                    <StepOne
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={() => setStep(2)}
                    />
                ) : (
                    <StepTwo
                        formData={formData}
                        handleChange={handleChange}
                        prevStep={() => setStep(1)}
                        loading={loading}
                    />
                )}
            </fieldset>

            <div className="pt-6 border-t border-primary/10 text-center">
                <p className="text-md font-normal leading-relaxed text-primary">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        href="/auth/login"
                        className="text-md font-bold leading-relaxed text-primary hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </form>
    );
}