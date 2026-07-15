import Button from "@/shared/components/Button";

export default function Menu({ setIsMenuOpen }: { setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div className="bg-background fixed inset-0 top-16 h-[96vh] flex flex-col justify-between gap-6 animate-fade-in z-1000">
            <nav
                className="flex flex-col gap-8 px-20 md:px-40 py-10 md:py-30"
                aria-label="Navegación"
            >
                <div className="flex md:flex-row flex-col pt-40 md:pt-60 items-start gap-4">
                    <Button
                        href="/login"
                        variant="secondary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Iniciar Sesión
                    </Button>

                    <Button
                        href="/register"
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