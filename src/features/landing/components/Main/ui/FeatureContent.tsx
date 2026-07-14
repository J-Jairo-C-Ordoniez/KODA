"use client";

import { useState } from "react";
import { LayoutDashboard, FolderOpen, PanelLeftClose } from "lucide-react";
import ModernAppMockup from "@/features/landing/components/Main/ui/ModernAppMockup";

const featureSteps = [
    {
        id: "nav",
        title: "Encuentra todo sin pensar",
        description: "Un menú principal siempre visible y submódulos que aparecen solo cuando los necesitas. Navegar por tu negocio nunca fue tan intuitivo.",
        icon: <FolderOpen size={20} />,
    },
    {
        id: "workspace",
        title: "Espacio para lo que importa",
        description: "Al vender o cobrar, el menú se aparta para darte una pantalla limpia. Cero distracciones para que tú y tus empleados operen con agilidad quirúrgica.",
        icon: <PanelLeftClose size={20} />,
    },
    {
        id: "metrics",
        title: "El cerebro del negocio",
        description: "Métricas claras, deudores y stock en un solo pantallazo. Obtienes visibilidad total de tu local para tomar decisiones con datos, no con corazonadas.",
        icon: <LayoutDashboard size={20} />,
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
                            className={`group relative flex flex-col items-start rounded-2xl border px-5 py-3 text-left transition-all duration-300 cursor-pointer ${isActive
                                ? "border-primary/50 bg-primary text-foreground-muted shadow-2xl shadow-primary/5"
                                : "border-primary/10 bg-background text-primary shadow-xl shadow-primary/2"
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

            <aside className="w-full md:col-span-7">
                <ModernAppMockup step={activeStep} />
            </aside>
        </div>
    );
}