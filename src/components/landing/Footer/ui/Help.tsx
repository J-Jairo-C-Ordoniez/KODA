import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Help() {
    return (
        <article className="space-y-6">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/40">Ayuda y Soporte</h4>
            <div className="space-y-4">
                <p className="text-sm font-bold text-background/60 leading-relaxed">
                    ¿Necesitas asistencia técnica o comercial?
                </p>
                <Link 
                    href="https://wa.me/573001234567" 
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 text-background transition-all group"
                >
                    <MessageCircle className="text-[#25D366] group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-sm font-black tracking-tight">Escríbenos por WhatsApp</span>
                </Link>
            </div>
        </article>
    );
}
