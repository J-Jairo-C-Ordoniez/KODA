"use client";

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from '../../Main/ui/Breadcrumbs';

export default function Login() {
    const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError('Credenciales inválidas');
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    return (
        <main className="bg-background w-full">
            <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbsRoute={setBreadcrumbsRoute}
                />

                <div className="py-40">
                    <h2 className="text-primary font-medium tracking-widest uppercase mb-6 text-md border-b border-secondary/10 pb-2">
                        Bienvenido de vuelta
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-6">
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
                                className="text-primary tracking-wider w-lg border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold tracking-wider text-primary/90">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="@EJ123456789"
                                className="text-primary tracking-wider w-lg border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary/60 hover:text-primary tracking-wider transition-colors"
                            >
                                ¿Olvidó su contraseña?
                            </Link>
                        </div>

                        <div className="pt-4">
                            <button
                                type='submit'
                                className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    {error && <div className="w-full py-10">
                        <p className="text-md font-medium tracking-wider text-secondary">
                            Ha ocurrido un error {error}
                        </p>
                    </div>}
                </div>
            </div>
        </main>
    );
}