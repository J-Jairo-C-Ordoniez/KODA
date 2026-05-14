import Hero from "@/components/Help/Main/ui/Hero";
import { Clock, ShieldCheck, Zap } from "lucide-react";
import HelpCard from "@/components/Help/Main/ui/HelpCard";
import HelpDescription from "@/components/Help/Main/ui/HelpDescription";
import ContactCard from "@/components/Help/Main/ui/ContactCard";

export default function Main() {
    const helpOptions = [
        {
            icon: <Clock size={28} className="text-[#3A86FF]" />,
            bgClass: 'bg-[#3A86FF]/10 border-[#3A86FF]/20',
            title: 'Respuesta rápida',
            desc: 'Nuestro equipo responde en menos de 24 horas hábiles para resolver cualquier duda.',
        },
        {
            icon: <ShieldCheck size={28} className="text-success" />,
            bgClass: 'bg-success/10 border-success/20',
            title: 'Soporte técnico',
            desc: 'Te ayudamos a configurar tu inventario, resolver errores y entender la plataforma.',
        },
        {
            icon: <Zap size={28} className="text-contrast" />,
            bgClass: 'bg-[#FF7A00]/10 border-[#FF7A00]/20',
            title: 'Sin fricción',
            desc: 'Sin tickets ni colas. Contacto directo por WhatsApp para atención inmediata.',
        },
    ];

    return (
        <main className="grow">
            <Hero
                title="¿En qué podemos ayudarte?"
                subtitle="¿Tienes dudas o necesitas asistencia técnica? Estamos aquí para garantizar que tu negocio nunca se detenga."
                badge="Soporte & Ayuda"
            />

            <div className="relative pb-20 md:pb-32 bg-background overflow-hidden">
                <div className="relative z-10 max-w-6xl space-y-20 md:space-y-32 mx-auto">
                    <section aria-labelledby="features-heading">
                        <h2 id="features-heading" className="sr-only">Nuestras garantías de soporte</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {helpOptions.map((item) => (
                                <li key={item.title}>
                                    <HelpCard {...item} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="contact-heading">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <HelpDescription />
                            <ContactCard />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}