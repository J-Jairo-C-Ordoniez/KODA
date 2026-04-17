"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from '../main/ui/Breadcrumbs';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export default function ForgotPasswordMain() {
    const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
    const router = useRouter();

    const {
        step, setStep,
        email, setEmail,
        code, setCode,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error,
        loading,
        handleRequestCode,
        handleVerifyCode,
        handleResetPassword
    } = useForgotPassword();

    useEffect(() => {
        setBreadcrumbsRoute("olvidó su contraseña");
    }, [setBreadcrumbsRoute]);

    return (
        <main className="bg-background w-full">
            <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbsRoute={setBreadcrumbsRoute}
                />

                <div className="py-20 md:py-40 w-full max-w-lg">
                    {step === 'EMAIL' && (
                        <>
                            <h2 className="text-primary font-medium tracking-widest uppercase mb-6 text-md border-b border-secondary/10 pb-2">
                                Recuperar Contraseña
                            </h2>
                            <p className="text-secondary/70 text-sm mb-6 tracking-wider">
                                Ingrese su correo electrónico para recibir un código de verificación.
                            </p>
                            <form onSubmit={handleRequestCode} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold tracking-wider text-primary/90">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@gmail.com"
                                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'Enviando...' : 'Enviar Código'}
                                    </button>
                                    <Link
                                        href="/login"
                                        className="border border-secondary/10 hover:bg-secondary/5 transition-colors duration-300 text-primary px-6 py-3 rounded-md text-center"
                                    >
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 'CODE' && (
                        <>
                            <h2 className="text-primary font-medium tracking-widest uppercase mb-6 text-md border-b border-secondary/10 pb-2">
                                Verificar Código
                            </h2>
                            <p className="text-secondary/70 text-sm mb-6 tracking-wider">
                                Hemos enviado un código a <strong>{email}</strong>. Ingréselo a continuación.
                            </p>
                            <form onSubmit={handleVerifyCode} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="code" className="block text-sm font-semibold tracking-wider text-primary/90">
                                        Código de Verificación
                                    </label>
                                    <input
                                        id="code"
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="123456"
                                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'Verificando...' : 'Verificar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('EMAIL')}
                                        className="text-sm text-primary/60 hover:text-primary tracking-wider transition-colors"
                                    >
                                        ¿No recibió el código? Volver a intentar
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 'NEW_PASSWORD' && (
                        <>
                            <h2 className="text-primary font-medium tracking-widest uppercase mb-6 text-md border-b border-secondary/10 pb-2">
                                Nueva Contraseña
                            </h2>
                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="new_password" className="block text-sm font-semibold tracking-wider text-primary/90">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        id="new_password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold tracking-wider text-primary/90">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="********"
                                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 w-full"
                                    >
                                        {loading ? 'Procesando...' : 'Restablecer Contraseña'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 'SUCCESS' && (
                        <div className="text-center space-y-6">
                            <h2 className="text-primary font-medium tracking-widest uppercase text-md border-b border-secondary/10 pb-2">
                                ¡Éxito!
                            </h2>
                            <p className="text-secondary/70 text-sm tracking-wider">
                                Su contraseña ha sido restablecida correctamente. Ya puede iniciar sesión.
                            </p>
                            <Link
                                href="/login"
                                className="inline-block bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-8 py-3 rounded-md"
                            >
                                Ir a Login
                            </Link>
                        </div>
                    )}

                    {error && (
                        <div className="mt-8 p-4 bg-secondary/5 border border-secondary/10 rounded-sm">
                            <p className="text-sm font-medium tracking-wider text-secondary">
                                {error}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
