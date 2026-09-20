"use client";

import { useState } from "react";
import { SquaresFourIcon, FolderOpenIcon, SidebarSimpleIcon } from "@phosphor-icons/react";
import ModernAppMockup from "@/features/landing/components/Main/ui/ModernAppMockup";

const featureSteps = [
    {
        id: "nav",
        title: "Encuentras todo al instante",
        description: "Menús claros que no te marean. Usar tu sistema es tan fácil y rápido como revisar tu celular. Sin opciones extrañas estorbando.",
        icon: <FolderOpenIcon size={20} />,
    },
    {
        id: "workspace",
        title: "Pantalla libre para vender",
        description: "Al cobrar, los menús se ocultan solos. Tú y tus vendedores se enfocan en despachar rápido al cliente que tienen enfrente, sin distracciones.",
        icon: <SidebarSimpleIcon size={20} />,
    },
    {
        id: "metrics",
        title: "El pulso de tu local",
        description: "¿Cuánto llevas vendido hoy? ¿Quién te debe? Lo ves todo de un vistazo. Se acabaron las horas sumando tickets al final del día.",
        icon: <SquaresFourIcon size={20} />,
    },
] as const;

type StepId = typeof featureSteps[number]["id"];

export default function FeatureContent() {
    const [activeStep, setActiveStep] = useState<StepId>("nav");

    return (
        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-12 md:items-center">
            <div className="w-full md:col-span-5 flex flex-col gap-4 px-4">
                {featureSteps.map((feature) => {
                    const isActive = activeStep === feature.id;

                    return (
                        <button
                            key={feature.id}
                            onClick={() => setActiveStep(feature.id)}
                            className={`feature-card opacity-0 group relative flex flex-col items-start rounded-2xl border px-5 py-3 text-left transition-all duration-300 cursor-pointer ${isActive
                                ? "border-primary/50 bg-primary text-foreground-muted shadow-2xl shadow-primary/5"
                                : "border-primary/10 bg-background text-primary shadow-xl shadow-primary/2 hover:bg-background/80"
                                }`}
                        >
                            <div className="flex w-full items-center gap-4">
                                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 
                                    ${isActive ? "bg-background/10 text-background" : "text-primary/60 group-hover:text-primary"}`}
                                >
                                    {feature.icon}
                                </span>
                                <h4 className={`font-medium leading-[1.1] tracking-tight text-md ${isActive ? "text-background" : "text-primary/60 group-hover:text-primary"}`}>
                                    {feature.title}
                                </h4>
                            </div>

                            <div className={`grid transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                <p className="overflow-hidden text-base leading-relaxed opacity-80">
                                    {feature.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <aside className="feature-mockup opacity-0 w-full md:col-span-7">
                <ModernAppMockup step={activeStep} />
            </aside>
        </div>
    );
}