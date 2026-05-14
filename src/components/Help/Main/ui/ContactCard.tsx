import Button from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export default function ContactCard() {
    return (
        <article className="group relative p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 hover:border-contrast/30 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.15)] flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            <span aria-hidden="true" className="absolute -right-20 -top-20 w-72 h-72 bg-contrast/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-contrast/20 transition-colors duration-500" />
            
            <header className="relative z-10 space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                    Atención inmediata por WhatsApp
                </h3>
                <p className="text-base md:text-lg text-foreground-muted font-medium leading-relaxed max-w-md">
                    Escríbenos directamente a nuestra línea oficial de soporte. Sin esperas, sin formularios.
                </p>
            </header>
            
            <Button
                href="https://wa.me/573001234567"
                variant="contrast"
                className="w-full md:w-auto px-8 py-5 font-black tracking-widest uppercase text-sm text-white bg-contrast hover:bg-contrast-hover rounded-2xl transition-all relative z-10 shadow-[0_0_20px_rgba(255,122,0,0.25)] hover:scale-105 flex items-center justify-center gap-3"
            >
                <MessageCircle size={20} />
                Contactar por WhatsApp
            </Button>
        </article>
    );
}
