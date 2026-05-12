import Logo from "../../../ui/Logo";
import Link from "next/link";
import Button from "../../../ui/Button";
import { X } from "lucide-react";

export default function Nav({ navLinks }: { navLinks: { name: string; href: string }[] }) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="relative bordertext-sm font-semibold tracking-wide text-foreground-muted hover:text-primary transition-colors duration-200 group"
                >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-contrast rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
        </nav>
    );
}

export function NavMobile({ navLinks, setIsMenuOpen }: { navLinks: { name: string; href: string }[]; setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div className="md:hidden cotainer fixed inset-0 h-screen bg-background flex flex-col justify-between gap-6 animate-in slide-in-from-top-4 duration-300">
            <header className="h-20 flex justify-between px-6 items-center border-b border-foreground/5">
                <Logo type="light" />
                <Button
                    href="/register"
                    variant="contrast"
                    className="font-bold tracking-widest uppercase text-xs px-6"
                >
                    Comenzar
                </Button>
            </header>

            <div className="flex flex-col justify-between pt-30 pb-16 px-6 h-[calc(100vh-5rem)] overflow-x-hidden bg-background">
                <nav className="flex flex-col gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative bordertext-sm font-semibold tracking-wide text-foreground-muted hover:text-primary transition-colors duration-200 group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-contrast rounded-full transition-all duration-300 group-hover:w-full" />
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
        </div>
    );
}