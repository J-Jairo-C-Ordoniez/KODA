import Button from "@/shared/components/Button";
import { MessageCircle } from "lucide-react";

export default function ContactCard() {
    return (
        <section className="relative flex flex-col justify-center gap-4 overflow-hidden rounded-4xl border p-8 md:p-12 w-full transition-all duration-300 border-primary/10 bg-background text-primary shadow-xl shadow-primary/2">
            <h2 className="mx-auto text-2xl font-bold leading-[1.1] tracking-tight">
                Atención sin fricción
            </h2>
            <p className="mx-auto text-base md:text-lg leading-relaxed opacity-80">
                En KODA nos tomamos en serio tu tiempo. Si necesitas ayuda configurando tu local o tienes dudas sobre el sistema, escríbenos directamente. Sin formularios ni colas de espera.
            </p>

            <Button
                href="https://wa.me/573114195398"
                variant="primary"
                className="w-fit mx-auto"
            >
                <MessageCircle size={18} />
                Contactar por WhatsApp
            </Button>
        </section>
    );
}