import { useRef, useEffect } from "react";
import Link from "next/link";
import Button from "@/shared/components/Button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Menu({ navLinks, setIsMenuOpen, isOpen }: { navLinks: { name: string; href: string }[]; setIsMenuOpen: (open: boolean) => void; isOpen: boolean }) {
    const menuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        gsap.set(menuRef.current, { autoAlpha: 0 });
        
        tl.current = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } })
            .to(menuRef.current, { autoAlpha: 1, duration: 0.4 })
            .fromTo(".menu-link", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04 }, "-=0.2")
            .fromTo(".menu-action", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1 }, "-=0.2");
            
    }, { scope: menuRef });

    useEffect(() => {
        if (isOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isOpen]);

    return (
        <div
            ref={menuRef}
            className="fixed inset-0 overflow-y-auto overscroll-contain bg-background pt-30 md:pt-40"
        >
            <nav
                className="flex min-h-full flex-col gap-8 px-6 pb-8 sm:gap-10 sm:px-12 sm:pb-10 lg:px-40 lg:pb-14"
                aria-label="Navegación"
            >
                {navLinks.map((link) => (
                    <div key={link.name} className="menu-link invisible">
                        <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="relative text-xs md:text-sm font-medium tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-200 group w-fit"
                        >
                            {link.name}
                            <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>
                ))}

                <div className="mt-auto flex flex-col items-start gap-4 pt-12 sm:flex-row sm:pt-16">
                    <div className="menu-action invisible">
                        <Button
                            href="/auth/login"
                            variant="secondary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Button>
                    </div>

                    <div className="menu-action invisible">
                        <Button
                            href="/auth/register"
                            variant="primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Comenzar
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}