import Logo from "../../ui/Logo";

export default function Brand() {
    return (
        <article className="space-y-6">
            <Logo type="dark" />
            <p className="text-foreground/60 font-medium text-md tracking-wider">
                La plataforma para el control de inventarios y ventas.
            </p>
        </article>
    );
}