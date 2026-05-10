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
            <Container className="py-20 flex justify-center">
                <Loader />
            </Container>
        );
    }

    if (error || !policy) {
        return (
            <Container className="py-20 text-center">
                <p className="text-foreground-muted font-bold">No se pudo cargar el contenido.</p>
            </Container>
        );
    }

    return (
        <section className="pb-32 bg-background">
            <Container className="max-w-5xl">
                {/* Last update */}
                <p className="text-xs font-bold text-foreground-muted/50 uppercase tracking-widest mb-12 border-b border-foreground/5 pb-6">
                    Última actualización:{' '}
                    {new Date(policy.content.lastUpdate).toLocaleDateString('es-ES', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </p>

                {/* Sections */}
                <div className="space-y-16">
                    {policy.content.sections.map((section: Sections, idx: number) => (
                        <article key={`section-${idx}`} className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-black text-primary tracking-tight">
                                {section.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground-muted font-medium leading-relaxed">
                                {section.content}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-24 pt-12 border-t border-foreground/5 text-center space-y-4">
                    <p className="text-base text-foreground-muted font-medium leading-relaxed">
                        ¿Tienes dudas sobre nuestras políticas?
                    </p>
                    <Link
                        href="/help"
                        className="inline-block text-contrast font-black text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
                    >
                        Ir al Centro de Ayuda →
                    </Link>
                </div>
            </Container>
        </section>
    );
}
