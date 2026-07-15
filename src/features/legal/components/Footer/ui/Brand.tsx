import Logo from "@/shared/components/Logo";

export default function Brand() {
    return (
        <article className="space-y-5">
            <Logo />
            <p className="text-base font-normal leading-relaxed text-foreground/80 max-w-xs">
                Koda es una plataforma integral para administrar negocios, ventas, inventario, fiados y empleados.
            </p>
        </article>
    );
}