import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerBusinessApi } from "@/features/auth/api/auth.api";

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const registerUser = useCallback(async (formData: any) => {
        if (!formData.ownerName || !formData.email || !formData.password) {
            setError("Por favor completa tus datos personales.");
            return;
        }
        
        setIsLoading(true);
        setError("");

        try {
            await registerBusinessApi(formData);

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
            setIsLoading(false);
        }
    }, [router]);

    return { registerUser, isLoading, error };
}