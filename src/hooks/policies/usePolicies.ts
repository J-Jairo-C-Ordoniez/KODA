import { useState, useEffect } from "react";

interface Sections {
    title: string;
    content: string;
}

interface Content {
    title: string;
    content: {
        lastUpdate: string;
        sections: Sections[];
    };
}


export function usePolicies(title: string) {
    const [policy, setPolicy] = useState<Content>({
        title: "",
        content: {
            lastUpdate: "",
            sections: []
        }
    });


    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/policies/${encodeURIComponent(title)}`);
                const result = await response.json();

                if (result.success) {
                    setPolicy(result.data || []);
                } else {
                    setError(result.error || result.message || "Error al cargar la política");
                }
            } catch (err) {
                setError("Error de conexión");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPolicy();
    }, []);

    console.log(policy);

    return { policy, isLoading, error };
}