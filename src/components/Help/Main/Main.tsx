import Hero from "@/components/Help/Main/ui/Hero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { MessageCircle, Clock, ShieldCheck, Zap } from "lucide-react";

export default function Main() {
    return (
        <main className="grow">
            <Hero
                title="¿En qué podemos ayudarte?"
                subtitle="¿Tienes dudas o necesitas asistencia técnica? Estamos aquí para garantizar que tu negocio nunca se detenga."
                badge="Soporte & Ayuda"
            />

            <section className="pb-32 bg-background">
                <Container className="max-w-5xl space-y-16">

                    {/* Info cards */}
                    <article className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Clock size={28} className="text-[#3A86FF]" />,
                                bg: 'bg-[#3A86FF]/10 border-[#3A86FF]/20',
                                title: 'Respuesta rápida',
                                desc: 'Nuestro equipo responde en menos de 24 horas hábiles para resolver cualquier duda.',
                            },
                            {
                                icon: <ShieldCheck size={28} className="text-success" />,
                                bg: 'bg-success/10 border-success/20',
                                title: 'Soporte técnico',
                                desc: 'Te ayudamos a configurar tu inventario, resolver errores y entender la plataforma.',
                            },
                            {
                                icon: <Zap size={28} className="text-contrast" />,
                                bg: 'bg-[#FF7A00]/10 border-[#FF7A00]/20',
                                title: 'Sin fricción',
                                desc: 'Sin tickets ni colas. Contacto directo por WhatsApp para atención inmediata.',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col gap-5 p-8 rounded-[32px] bg-background-elevated border border-foreground/5 hover:border-foreground/15 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 ${item.bg} border rounded-2xl flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-primary mb-2">{item.title}</h3>
                                    <p className="text-base text-foreground-muted font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </article>

                    {/* Main description */}
                    <article className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                            ¿Cómo podemos ayudarte hoy?
                        </h2>
                        <p className="text-lg text-foreground-muted font-medium leading-relaxed">
                            En KODA nos tomamos en serio tu crecimiento. Si tienes problemas con el sistema, dudas sobre tu suscripción o necesitas ayuda configurando tu inventario, nuestro equipo está a un clic de distancia.
                        </p>
                    </article>

                    {/* WhatsApp CTA card */}
                    <div className="p-12 md:p-16 rounded-[40px] bg-background-elevated border border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
                        <div className="absolute -right-20 -top-20 w-72 h-72 bg-contrast/8 blur-[80px] rounded-full pointer-events-none" />
                        <div className="space-y-3 text-center md:text-left relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                                Atención inmediata por WhatsApp
                            </h3>
                            <p className="text-base text-foreground-muted font-medium leading-relaxed max-w-lg">
                                Escríbenos directamente a nuestra línea oficial de soporte. Sin esperas, sin formularios.
                            </p>
                        </div>
                        <Button
                            href="https://wa.me/573001234567"
                            variant="contrast"
                            className="px-8 py-5 font-black tracking-widest uppercase text-sm text-white bg-contrast hover:bg-contrast-hover rounded-2xl transition-all relative z-10 shadow-[0_0_20px_rgba(255,122,0,0.25)] hover:scale-105 shrink-0 flex items-center gap-3"
                        >
                            <MessageCircle size={20} />
                            Contactar por WhatsApp
                        </Button>
                    </div>

                </Container>
            </section>
        </main>
    );
}