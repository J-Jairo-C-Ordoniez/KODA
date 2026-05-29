import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function Header({ title }: { title: string }) {
    return (
        <header className="flex justify-between items-end">
            <h2 className="text-md uppercase font-semibold tracking-widest text-primary mb-2">{title}</h2>
            <Button variant="primary">
                <Plus size={18} />
                Nuevo Negocio
            </Button>
        </header>
    );
}