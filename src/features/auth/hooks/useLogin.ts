"use client";

import { useReducer, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface LoginCredentials {
  email: string;
  password: string;
}

type State = {
  formData: LoginCredentials;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS" }
  | { type: "LOGIN_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        error: null,
      };
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, error: null };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default function useLogin() {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    formData: { email: "", password: "" },
    isLoading: false,
    error: null,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }, []);

  const loginUser = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();


      if (!state.formData.email || !state.formData.password) {
        dispatch({ type: "LOGIN_ERROR", payload: "Por favor, completa todos los campos" });
        return;
      }

      dispatch({ type: "LOGIN_START" });

      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: state.formData.email,
          password: state.formData.password,
        });

        if (result?.error) {
          dispatch({ type: "LOGIN_ERROR", payload: "Credenciales inválidas. Por favor intenta de nuevo." });
        } else {
          dispatch({ type: "LOGIN_SUCCESS" });
          router.push("/dashboard");
          router.refresh();
        }
      } catch (err) {
        dispatch({ type: "LOGIN_ERROR", payload: "Ocurrió un error inesperado al iniciar sesión." });
      }
    },
    [state.formData, router]
  );

  return {
    formData: state.formData,
    loading: state.isLoading,
    error: state.error,
    handleChange,
    loginUser,
  };
}