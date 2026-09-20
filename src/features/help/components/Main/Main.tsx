"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

import Button from "@/shared/components/Button";

gsap.registerPlugin(useGSAP);

export default function Main() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: 2.2,
            defaults: { ease: "power4.out" },
        });

        tl.fromTo(".help-title",
            { autoAlpha: 0, y: 60, rotateX: -12 },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1 }
        )
        .fromTo(".help-subtitle",
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            "-=0.8"
        )
        .fromTo(".help-body",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            "-=0.7"
        )
        .fromTo(".help-cta",
            { autoAlpha: 0, scale: 0.95, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.8 },
            "-=0.6"
        );
    }, { scope: containerRef });

    return (
        <main className="min-h-screen" ref={containerRef}>
            <div
                className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-24"
                style={{ perspective: "1000px" }}
            >
                <div className="mx-auto max-w-4xl">
                    <header className="mb-12 space-y-6">
                        <h1
                            className="help-title invisible font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            ¿Cómo podemos ayudarte?
                        </h1>
                        <p className="help-subtitle invisible text-base sm:text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl">
                            Resolvamos cualquier problema para que tu negocio no se detenga.
                        </p>
                    </header>

                    <section className="help-body invisible space-y-8 mb-16">
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/80">
                            En KODA nos tomamos en serio tu tiempo. Si necesitas ayuda configurando tu local, tienes dudas sobre el sistema o algo no está funcionando como esperas, escríbenos directamente.
                        </p>
                        <ul className="space-y-4 text-lg sm:text-xl text-foreground/80 leading-relaxed">
                            <li className="flex items-baseline gap-3">
                                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-accent translate-y-1" />
                                Respuesta en menos de 24 horas hábiles.
                            </li>
                            <li className="flex items-baseline gap-3">
                                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-accent translate-y-1" />
                                Sin tickets ni formularios. Chat directo.
                            </li>
                            <li className="flex items-baseline gap-3">
                                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-accent translate-y-1" />
                                Soporte técnico con inventario, errores y dudas del sistema.
                            </li>
                        </ul>
                    </section>

                    <div className="help-cta invisible">
                        <Button
                            href="https://wa.me/573114195398"
                            variant="primary"
                        >
                            <WhatsappLogoIcon size={18} weight="fill" />
                            Contactar por WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}