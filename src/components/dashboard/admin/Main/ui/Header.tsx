import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function Header() {
    return (
        <header className="flex justify-between items-end">
            <h2 className="text-md uppercase font-semibold tracking-widest text-primary mb-2">Ecosistema Koda</h2>
            <Button variant="primary">
                <Plus size={18} />
                Nuevo Negocio
            </Button>
        </header>
    );
}