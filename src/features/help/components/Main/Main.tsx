import { MessageCircle, Clock, Wrench } from "lucide-react";

import HelpCard from "@/features/help/components/Main/ui/HelpCard";
import ContactCard from "@/features/help/components/Main/ui/ContactCard";

export default function Main() {
    const helpOptions = [
        {
            icon: <Clock size={24} className="text-foreground" />,
            title: 'Respuesta rápida',
            desc: 'Soluciones en menos de 24 horas hábiles.',
        },
        {
            icon: <Wrench size={24} className="text-foreground" />,
            title: 'Soporte técnico',
            desc: 'Ayuda con tu inventario, errores o dudas del sistema.',
        },
        {
            icon: <MessageCircle size={24} className="text-accent" />,
            title: 'Contacto directo',
            desc: 'Sin tickets. Chat directo para atención inmediata.',
        },
    ];

    return (
        <main className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="mx-auto max-w-6xl min-h-screen px-20 py-16 md:py-24">
                <header className="mb-14 border-b border-primary/10 pb-10 space-y-6 mx-auto">
                    <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        ¿Cómo podemos ayudarte?
                    </h1>
                    <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                        Resolvamos cualquier problema para que tu negocio no se detenga.
                    </p>
                </header>

                <div className="mx-auto max-w-5xl space-y-16 md:space-y-24">
                    <section aria-label="Garantías de soporte">
                        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {helpOptions.map((item) => (
                                <li key={item.title}>
                                    <HelpCard {...item} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <ContactCard />
                </div>
            </div>
        </main>
    );
}