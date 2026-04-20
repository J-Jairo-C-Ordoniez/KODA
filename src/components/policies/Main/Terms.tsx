import PolicyHero from "@/components/policies/Main/sections/PolicyHero";
import PolicyContent from "@/components/policies/Main/sections/PolicyContent";

export default function Terms() {
    return (
        <main className="grow">
            <PolicyHero
                title="Términos y Condiciones de Uso"
                subtitle="Regulamos el uso de nuestra plataforma para garantizar un servicio seguro y confiable para tu negocio."
            />
            <PolicyContent title="Términos y Condiciones de Uso" />
        </main>
    );
}