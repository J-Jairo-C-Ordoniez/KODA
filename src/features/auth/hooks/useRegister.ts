"use client";

import { useReducer, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import registerBusinessApi, { RegisterFormData } from "@/features/auth/api/auth.api";

type State = {
    formData: RegisterFormData;
    isLoading: boolean;
    error: string | null;
};

type Action =
    | { type: "UPDATE_FIELD"; field: keyof RegisterFormData; value: string }
    | { type: "REGISTER_START" }
    | { type: "REGISTER_SUCCESS" }
    | { type: "REGISTER_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value },
                error: null,
            };
        case "REGISTER_START":
            return { ...state, isLoading: true, error: null };
        case "REGISTER_SUCCESS":
            return { ...state, isLoading: false, error: null };
        case "REGISTER_ERROR":
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}

export default function useRegister() {
    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, {
        formData: {
            name: "",
            email: "",
            password: "",
            businessName: "",
            whatsApp: "",
            type: "",
        },
        isLoading: false,
        error: null,
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "UPDATE_FIELD",
            field: e.target.name as keyof RegisterFormData,
            value: e.target.value,
        });
    }, []);

    const registerUser = useCallback(
        async (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!state.formData.name || !state.formData.email || !state.formData.password) {
                dispatch({ type: "REGISTER_ERROR", payload: "Por favor, completa los campos requeridos." });
                return;
            }

            dispatch({ type: "REGISTER_START" });

            try {
                await registerBusinessApi(state.formData);

                const loginResult = await signIn("credentials", {
                    redirect: false,
                    email: state.formData.email,
                    password: state.formData.password,
                });

                if (loginResult?.error) {
                    dispatch({ type: "REGISTER_ERROR", payload: "Registro exitoso, pero hubo un error al iniciar sesión." });
                } else {
                    dispatch({ type: "REGISTER_SUCCESS" });
                    router.push("/dashboard");
                    router.refresh();
                }
            } catch (err: any) {
                dispatch({ type: "REGISTER_ERROR", payload: err.message || "Ocurrió un error inesperado al registrar." });
            }
        },
        [state.formData, router]
    );

    return {
        formData: state.formData,
        loading: state.isLoading,
        error: state.error,
        handleChange,
        registerUser,
    };
}