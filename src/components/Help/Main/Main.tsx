import Hero from "@/components/Help/Main/ui/Hero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export default function Main() {
    return (
        <main className="grow">
            <Hero
                title="Cuentanos, ¿en qué podemos ayudarte?"
                subtitle="¿Tienes dudas o necesitas asistencia técnica? Estamos aquí para garantizar que tu negocio nunca se detenga."
            />

            <section className="pb-32 bg-background">
                <Container className="max-w-4xl p-8 md:p-12 space-y-12">
                    <article className="space-y-6">
                        <h2 className="text-2xl font-black text-primary tracking-tight">
                            ¿Cómo podemos ayudarte hoy?
                        </h2>
                        <p className="text-md lg:text-lg text-primary/80 font-medium leading-snug tracking-wider">
                            En KODA nos tomamos en serio tu crecimiento. Si tienes problemas con el sistema, dudas sobre tu suscripción o necesitas ayuda configurando tu inventario, nuestro equipo está a un clic de distancia.
                        </p>
                    </article>

                    <div className="p-10 rounded-3xl bg-navy/5 border border-navy/10 space-y-6 text-center">
                        <p className="text-md lg:text-lg text-primary/60 font-medium leading-snug tracking-wider">
                            Para una atención inmediata, escríbenos directamente a nuestra línea oficial de soporte.
                        </p>
                        <Button
                            href="https://wa.me/573001234567"
                            variant="accent"
                            size="lg"
                            className="font-black tracking-tight w-fit mx-auto"
                        >
                            <MessageCircle className="mr-2" size={20} />
                            Contactar por WhatsApp
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}