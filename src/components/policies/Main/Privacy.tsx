import PolicyHero from "@/components/policies/Main/sections/PolicyHero";
import PolicyContent from "@/components/policies/Main/sections/PolicyContent";

export default function Privacy() {
    return (
        <main className="grow">
            <PolicyHero
                title="Política de Privacidad"
                subtitle="Tu privacidad es nuestra prioridad. Conoce cómo protegemos y manejamos los datos de tu negocio."
            />
            <PolicyContent title="Política de Privacidad" />
        </main>
    );
}