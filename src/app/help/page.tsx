import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";
import PolicyHero from "@/components/landing/Main/sections/PolicyHero";
import Container from "@/components/landing/ui/Container";
import Button from "@/components/landing/ui/Button";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "Centro de Ayuda | KODA",
  description: "Centro de ayuda y soporte técnico para usuarios de KODA.",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <PolicyHero 
          title="Centro de Ayuda" 
          subtitle="¿Tienes dudas o necesitas asistencia técnica? Estamos aquí para garantizar que tu negocio nunca se detenga."
        />
        
        <section className="pb-32 bg-background">
            <Container className="max-w-4xl">
                <div className="bg-background border border-foreground/5 rounded-[40px] p-8 md:p-16 shadow-sm space-y-12">
                    <article className="space-y-6">
                        <h2 className="text-2xl font-black text-primary tracking-tight">
                            ¿Cómo podemos ayudarte hoy?
                        </h2>
                        <p className="text-lg text-secondary font-medium leading-relaxed">
                            En KODA nos tomamos en serio tu crecimiento. Si tienes problemas con el sistema, dudas sobre tu suscripción o necesitas ayuda configurando tu inventario, nuestro equipo está a un clic de distancia.
                        </p>
                    </article>

                    <div className="p-10 rounded-[32px] bg-navy/5 border border-navy/10 space-y-6 text-center">
                        <p className="text-md text-secondary font-bold">
                            Para una atención inmediata, escríbenos directamente a nuestra línea oficial de soporte.
                        </p>
                        <Button 
                            href="https://wa.me/573001234567" 
                            variant="accent" 
                            size="lg"
                            className="font-black tracking-tight"
                        >
                            <MessageCircle className="mr-2" size={20} />
                            Contactar por WhatsApp
                        </Button>
                    </div>

                    <div className="pt-12 border-t border-foreground/5 space-y-4">
                        <p className="text-sm text-secondary font-medium uppercase tracking-widest text-center">
                            Otros canales
                        </p>
                        <p className="text-center text-primary font-black">
                            soporte@koda.app
                        </p>
                    </div>
                </div>
            </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
