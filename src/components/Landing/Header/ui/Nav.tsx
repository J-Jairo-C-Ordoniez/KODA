import Logo from "../../../ui/Logo";
import Link from "next/link";
import Button from "../../../ui/Button";
import { X } from "lucide-react";

export default function Nav({ navLinks }: { navLinks: { name: string; href: string }[] }) {
    return (
        <nav
            className="hidden md:flex items-center gap-10"
            aria-label="Navegación principal"
        >
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-[11px] font-semibold tracking-widest uppercase text-foreground-muted hover:text-foreground transition-colors duration-200 group py-1"
                >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
        </nav>
    );
}

export function NavMobile({ navLinks, setIsMenuOpen }: { navLinks: { name: string; href: string }[]; setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div className="md:hidden fixed inset-0 h-screen bg-background flex flex-col justify-between gap-6 animate-fade-in z-50">
            <header className="h-16 flex justify-between px-8 items-center">
                <Logo type="light" />
                <Button
                    href="/register"
                    variant="contrast"
                >
                    Comenzar
                </Button>
            </header>

            <div className="flex flex-col justify-between pt-20 pb-12 px-8 h-[calc(100vh-4rem)] overflow-x-hidden">
                <nav
                    className="flex flex-col gap-8"
                    aria-label="Navegación móvil"
                >
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="relative text-[11px] font-semibold tracking-widest uppercase text-foreground-muted hover:text-foreground transition-colors duration-200 group"
                        >
                            {link.name}
                            <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-col gap-4 border-t border-[#1E211E] pt-6">
                    <Button
                        href="/login"
                        variant="secondary"
                        className="w-fit text-center font-semibold text-sm mx-auto"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Iniciar Sesión
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-fit mx-auto text-foreground-muted hover:text-foreground text-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
}