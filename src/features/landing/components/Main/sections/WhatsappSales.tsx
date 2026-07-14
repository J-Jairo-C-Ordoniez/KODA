"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import IntegrationsBenefits from '@/features/landing/components/Main/ui/IntegrationsBenefits';
import IntegrationsPhoneMock from '@/features/landing/components/Main/ui/IntegrationsPhoneMock';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhatsappSales() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            }
        });

        tl.fromTo('.ws-header-elem',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );

        tl.fromTo('.bento-box',
            { opacity: 0, y: 50, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.1)' },
            "-=0.4"
        );

        tl.fromTo('.floating-chat',
            { opacity: 0, scale: 0.8, y: 20, rotate: -5 },
            { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.6, ease: 'back.out(1.5)' },
            "-=0.2"
        );

        gsap.to('.floating-chat', {
            y: '-=10',
            duration: 2.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="whatsapp-sales"
            className="relative bg-background py-16 md:py-24"
        >
            <div className="mx-auto max-w-6xl px-6">
                <header className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
                    <h2 className="ws-header-elem font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                        Vende por WhatsApp
                        <span className="block text-foreground/60">
                            como un profesional.
                        </span>
                    </h2>
                    <p className="ws-header-elem mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
                        Despídete de los PDFs desactualizados y los audios eternos. Sincroniza tu inventario y recibe pedidos claros directamente en tu chat.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
                    <article className="bento-box lg:col-span-7 overflow-x-hidden relative flex flex-col items-center py-4 px-6 sm:px-12">
                        <IntegrationsPhoneMock />
                    </article>

                    <article className="lg:col-span-5 flex flex-col gap-6">
                        <IntegrationsBenefits />
                    </article>
                </div>
            </div>
        </section>
    );
}