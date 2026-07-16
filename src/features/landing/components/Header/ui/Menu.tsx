import Link from "next/link";
import Button from "@/shared/components/Button";

export default function Menu({ navLinks, setIsMenuOpen }: { navLinks: { name: string; href: string }[]; setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div className="bg-background fixed inset-0 top-16 h-[96vh] flex flex-col justify-between gap-6 animate-fade-in z-1000">
            <nav
                className="flex flex-col gap-8 px-20 md:px-40 py-10 md:py-30"
                aria-label="Navegación"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="relative text-xs md:text-sm font-medium tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-200 group w-fit"
                    >
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}

                <div className="flex md:flex-row flex-col pt-40 md:pt-60 items-start gap-4">
                    <Button
                        href="/auth/login"
                        variant="secondary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Iniciar Sesión
                    </Button>

                    <Button
                        href="/auth/register"
                        variant="primary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Comenzar
                    </Button>
                </div>
            </nav>
        </div>
    );
}