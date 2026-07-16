"use client";

import AuthWrapper from "@/features/auth/components/Main/ui/AuthWrapper";
import RegisterForm from "@/features/auth/components/Main/sections/RegisterForm";

export default function MainRegister() {
  return (
    <AuthWrapper
      title="Inicia tu camino"
      subtitle="Cuéntanos sobre tu negocio para empezar la configuración."
    >
      <RegisterForm />
    </AuthWrapper>
  );
}