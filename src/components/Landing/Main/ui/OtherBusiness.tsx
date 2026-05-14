import Button from '@/components/ui/Button';
import { MessageSquare } from 'lucide-react';

export default function OtherBusiness() {
    return (
        <aside className="integration-banner group opacity-0 mt-20 p-8 md:p-16 rounded-[2.5rem] bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-contrast/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-contrast/15 transition-colors duration-700" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

            <article className="space-y-6 text-center lg:text-left max-w-2xl relative z-10">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-contrast/10 border border-contrast/20 text-contrast text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-contrast animate-ping" />
                    Consultoría personalizada
                </p>
                
                <h3 className="text-3xl md:text-5xl font-black text-primary leading-[1.1] md:leading-[0.9] tracking-tighter">
                    ¿Tienes un modelo de <br className="hidden md:block" />
                    negocio <span className="text-contrast">diferente?</span>
                </h3>
                
                <p className="text-base md:text-xl text-foreground-muted font-medium leading-relaxed max-w-xl">
                    Platicamos sobre cómo KODA puede adaptarse a tu negocio específico. Sin compromiso y totalmente personalizado.
                </p>
            </article>

            <Button
                href="https://wa.me/573114195398"
                variant="contrast"
                className="group/btn relative overflow-hidden flex items-center justify-center gap-3 px-10 py-5 font-black rounded-2xl transition-all duration-300 shadow-2xl shrink-0"
            >
                <MessageSquare size={20} className="text-primary group-hover/btn:rotate-12 transition-transform" />
                <span>HABLEMOS POR WHATSAPP</span>
            </Button>
        </aside>
    );
}

