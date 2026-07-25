"use client";

import { FormEvent, useCallback, useState } from "react";

type ResetStep = "EMAIL" | "CODE" | "NEW_PASSWORD" | "SUCCESS";

async function postResetStep(url: string, body: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "No pudimos procesar la solicitud.");
  }

  return data;
}

export function useForgotPassword() {
  const [step, setStep] = useState<ResetStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runRequest = useCallback(async (callback: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await callback();
    } catch (err: any) {
      setError(err?.message || "Ocurrio un error inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRequestCode = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return runRequest(async () => {
      await postResetStep("/api/auth/forgot-password/request", { email });
      setStep("CODE");
    });
  }, [email, runRequest]);

  const handleVerifyCode = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return runRequest(async () => {
      await postResetStep("/api/auth/forgot-password/verify", { email, code });
      setStep("NEW_PASSWORD");
    });
  }, [code, email, runRequest]);

  const handleResetPassword = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return runRequest(async () => {
      if (password !== confirmPassword) {
        throw new Error("Las contrasenas no coinciden.");
      }

      await postResetStep("/api/auth/forgot-password/reset", { email, password });
      setStep("SUCCESS");
    });
  }, [confirmPassword, email, password, runRequest]);

  return {
    step,
    setStep,
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleRequestCode,
    handleVerifyCode,
    handleResetPassword,
  };
}
