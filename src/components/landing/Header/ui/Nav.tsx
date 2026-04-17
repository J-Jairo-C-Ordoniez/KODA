import Logo from "./Logo";
import Link from "next/link";
import Button from "../../ui/Button";
import { X } from "lucide-react";

export default function Nav({ navLinks }: { navLinks: { name: string; href: string }[] }) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs uppercase font-medium tracking-wider text-primary/80 hover:text-accent hover:scale-106 transition-all duration-300"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}

export function NavMobile({ navLinks, setIsMenuOpen }: { navLinks: { name: string; href: string }[]; setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 h-screen bg-background p-8 flex flex-col justify-between gap-6 shadow-xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
                <Logo />
                <div className="flex gap-3">
                    <Button
                        href="/login"
                        variant="outline"
                        className="w-fit"
                    >
                        Ingresar
                    </Button>
                    <Button
                        href="/register"
                        variant="accent"
                        className="w-fit"
                    >
                        Comenzar
                    </Button>
                </div>
            </div>

            <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xs uppercase font-medium tracking-wider text-primary/80 hover:text-accent transition-color duration-300"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <Button
                variant="ambulance"
                className="w-fit mx-auto"
                onClick={() => setIsMenuOpen(false)}
            >
                <X />
            </Button>
        </div>
    );
}