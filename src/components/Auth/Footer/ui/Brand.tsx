import Logo from "../../../ui/Logo";

export default function Brand() {
    return (
        <article className="space-y-6">
            <Logo type="dark" />
            <p className="text-sm lg:text-md text-background/80 font-medium leading-snug tracking-wider">
                La plataforma inteligente para el control total de inventarios y ventas en el mundo de la moda.
            </p>
        </article>
    );
}