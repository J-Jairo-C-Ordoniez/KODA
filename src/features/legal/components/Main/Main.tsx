"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { dateFormatter } from "@/lib/formatters";

import useLegal from "../../hooks/useLegal";
import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";

gsap.registerPlugin(useGSAP);

interface Props {
    title: string;
}

export default function LegalContent({ title }: Props) {
    const { policy, isLoading, error } = useLegal(title);
    const containerRef = useRef<HTMLElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        if (!policy || animated.current) return;
        animated.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(".legal-header",
            { autoAlpha: 0, y: 60, rotateX: -12 },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1 }
        )
        .fromTo(".legal-section",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
            "-=0.7"
        );
    }, [policy]);

    return (
        <main className="min-h-screen" ref={containerRef}>
            <div
                className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-24"
                style={{ perspective: "1000px" }}
            >
                {isLoading && <Loader />}
                {error && <Error message={error} />}
                {policy && (
                    <section className="mx-auto max-w-4xl">
                        <header
                            className="legal-header invisible mb-14 border-b border-primary/10 pb-10 space-y-6"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <h1 className="font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                                {policy.title}
                            </h1>

                            <span className="text-base font-normal leading-relaxed text-foreground/75 sm:text-lg md:text-xl">
                                <time dateTime={policy.content.lastUpdate}>
                                    Última actualización: {dateFormatter(new Date(policy.content.lastUpdate))}
                                </time>
                            </span>
                        </header>

                        <div className="space-y-12">
                            {policy.content.sections.map((section, index) => (
                                <section
                                    key={index}
                                    className="legal-section invisible group relative space-y-4"
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
        </main>
    );
}