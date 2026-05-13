"use client";

import { usePolicies } from "@/hooks/policies/usePolicies";
import Loader from "@/components/ui/Loader";
import Error from "@/components/ui/Error";
import Time from "@/components/Policies/Main/ui/Time";
import CardPolicy from "@/components/Policies/Main/ui/CardPolicy";
import Footer from "@/components/Policies/Main/ui/Footer";

interface Sections {
    title: string;
    content: string;
}

export default function PolicyContent({ title }: { title: string }) {
    const { policy, isLoading, error } = usePolicies(title);

    return (
        <section className="relative w-full flex flex-col items-center bg-background px-4 pt-8 lg:pt-10 pb-12 overflow-hidden">
            <div className="mx-auto container relative z-10 w-full max-w-5xl flex flex-col items-center">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Error message="No se pudo obtener los términos y condiciones en este momento. Por favor, intenta nuevamente más tarde." />
                ) : (
                    <>
                        <Time time={policy.content.lastUpdate} />

                        <div className="space-y-16">
                            {policy.content.sections.map((section: Sections) => (
                                <CardPolicy
                                    key={section.title}
                                    title={section.title}
                                    content={section.content}
                                />
                            ))}
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </section>
    );
}
