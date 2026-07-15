"use client";

import { dateFormatter } from "@/lib/formatters";

import useLegal from "../../hooks/useLegal";
import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";

interface Props {
    title: string;
}

export default function LegalContent({ title }: Props) {
    const { policy, isLoading, error } = useLegal(title);

    return (
        <main className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex items-center justify-center w-full min-h-screen px-20 py-16 md:py-24">
                {isLoading && <Loader />}
                {error && <Error message={error} />}
                {policy && (
                    <section className="mx-auto max-w-6xl px-6">
                        <header className="mb-14 border-b border-primary/10 pb-10 space-y-6">
                            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                                {policy.title}
                            </h1>

                            <span className="mx-auto text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
                                <time dateTime={policy.content.lastUpdate}>
                                    Última actualización: {dateFormatter(new Date(policy.content.lastUpdate))}
                                </time>
                            </span>
                        </header>

                        <div className="space-y-12">
                            {policy.content.sections.map((section, index) => (
                                <section
                                    key={index}
                                    className="group relative space-y-4"
                                >
                                    <h2 className="text-2xl font-bold leading-[1.1] tracking-tight md:mb-6 flex items-center gap-4">
                                        <span className="hidden sm:block h-px w-6 bg-accent" />
                                        {section.title}
                                    </h2>

                                    <div className="pl-0 sm:pl-10">
                                        <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                                            {section.content}
                                        </p>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main >
    );
}