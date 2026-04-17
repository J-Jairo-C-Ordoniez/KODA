import { useState, useCallback } from 'react';

export function useSettings() {
    const [aboutUs, setAboutUs] = useState(null);
    const [policy, setPolicy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSettingsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [aboutResponse, policyResponse] = await Promise.all([
                fetch("/api/about"),
                fetch("/api/policies")
            ]);

            const aboutResult = await aboutResponse.json();
            const policyResult = await policyResponse.json();

            if (aboutResult.success) {
                setAboutUs(aboutResult.data);
            } else {
                setError(aboutResult.message || "Error al cargar la información");
            }

            if (policyResult.success) {
                setPolicy(policyResult.data);
            } else {
                setError(policyResult.message || "Error al cargar la información");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const savePolicyAction = async (data) => {
        try {
            const res = await fetch("/api/policies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (err) {
            return { error: "Error de conexión con el servidor" };
        }
    };

    const saveAboutUsAction = async (data) => {
        try {
            const res = await fetch("/api/about", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (err) {
            return { error: "Error de conexión con el servidor" };
        }
    };

    return {
        aboutUs,
        policy,
        isLoading,
        error,
        fetchSettingsData,
        savePolicyAction,
        saveAboutUsAction
    };
}
