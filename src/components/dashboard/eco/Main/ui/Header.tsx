import { Plus } from "lucide-react";

export default function Header() {
    return (
        <header className="flex justify-between items-end">
            <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-navy mb-2">Ecosistema Koda</p>
                <h1 className="text-4xl font-black text-primary tracking-tight">Gestión de Negocios</h1>
            </div>
            <button className="bg-navy text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-navy/20">
                <Plus size={18} />
                Nuevo Negocio
            </button>
        </header>
    );
}