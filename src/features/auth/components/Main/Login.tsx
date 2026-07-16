"use client";

import AuthWrapper from "@/features/auth/components/Main/ui/AuthWrapper";
import LoginForm from "@/features/auth/components/Main/sections/LoginForm";

export default function MainLogin() {
  return (
    <AuthWrapper
      title="Bienvenido de nuevo"
      subtitle="Accede a tu panel de control y gestiona tu negocio en tiempo real, sin distracciones."
    >
      <LoginForm />
    </AuthWrapper>
  );
}