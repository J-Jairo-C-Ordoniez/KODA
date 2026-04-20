"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Loader from "@/components/ui/Loader";

interface Section {
    title: string;
    content: string;
}

interface PolicyData {
    lastUpdate: string;
    sections: Section[];
}

interface Policy {
    policyId: string | number;
    title: string;
    content: PolicyData;
    updatedAt: string;
}

export default function PolicyContent({ title }: { title: string }) {
    const [policy, setPolicy] = useState<Policy | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const res = await fetch(`/api/policies/${encodeURIComponent(title)}`);
                const data = await res.json();
                if (data.success) {
                    setPolicy(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Error al cargar la política");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, [title]);

    if (loading) {
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
            <Container className="max-w-4xl">
                <div className="bg-background border border-foreground/5 rounded-[40px] p-8 md:p-16 shadow-sm">
                    <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-12 border-b border-foreground/5 pb-4">
                        Última actualización: {new Date(policy.content.lastUpdate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>

                    <div className="space-y-12">
                        {policy.content.sections.map((section, idx) => (
                            <article key={idx} className="space-y-4">
                                <h2 className="text-xl font-black text-primary tracking-tight">
                                    {section.title}
                                </h2>
                                <p className="text-md text-secondary leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-20 pt-12 border-t border-foreground/5 text-center">
                        <p className="text-sm text-secondary font-medium">
                            ¿Tienes dudas sobre nuestras políticas? <br />
                        </p>
                        <Link
                            href="/help"
                            className="inline-block mt-4 text-navy font-black hover:scale-105 transition-transform"
                        >
                            Ir al Centro de Ayuda
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
