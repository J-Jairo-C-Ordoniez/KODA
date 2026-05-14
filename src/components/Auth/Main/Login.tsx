"use client";

import AuthWrapper from "@/components/Auth/Main/ui/AuthWrapper";
import LoginForm from "@/components/Auth/Main/ui/LoginForm";

export default function Login() {
  return (
      <AuthWrapper
        title="Bienvenido de nuevo"
        subtitle="Accede a tu panel y mantén el control de tu negocio en tiempo real."
      >
        <LoginForm />
      </AuthWrapper>
  );
}
