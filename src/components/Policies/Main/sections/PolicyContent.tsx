"use client";

import { usePolicies } from "@/hooks/policies/usePolicies";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Loader from "@/components/ui/Loader";
import Error from "@/components/ui/Error";

interface Sections {
    title: string;
    content: string;
}

export default function PolicyContent({ title }: { title: string }) {
    const { policy, isLoading, error } = usePolicies(title);

    if (isLoading) {
        return (
            <Container className="py-20 text-center">
                <Loader />
            </Container>
        );
    }

    if (error || !policy) {
        return (
            <Container className="py-20 text-center">
                <p className="text-red-500 font-bold">Error: {error || "No se pudo cargar el contenido"}</p>
            </Container>
        );
    }

    return (
        <section className="pb-32 bg-background">
            <Container className="max-w-6xl bg-background p-8 md:p-16">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Error message="No se pudieron cargar los planes. Intenta de nuevo más tarde." />
                ) : (
                    <>
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-12 border-b border-foreground/5 pb-4">
                            Última actualización: {new Date(policy.content.lastUpdate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>

                        <div className="space-y-12">
                            {policy.content.sections.map((section: Sections, idx: number) => (
                                <article key={`section-${idx}`} className="space-y-4">
                                    <h2 className="text-xl font-black text-primary tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-md text-secondary font-medium leading-snug tracking-wider">
                                        {section.content}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-20 pt-12 border-t border-foreground/5 text-center">
                            <p className="text-md text-secondary font-medium leading-snug tracking-wider">
                                ¿Tienes dudas sobre nuestras políticas? <br />
                            </p>
                            <Link
                                href="/help"
                                className="inline-block mt-4 text-navy font-black hover:scale-105 transition-transform"
                            >
                                Ir al Centro de Ayuda
                            </Link>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
}
