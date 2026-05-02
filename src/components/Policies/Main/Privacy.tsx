import PolicyHero from "@/components/Policies/Main/sections/PolicyHero";
import PolicyContent from "@/components/Policies/Main/sections/PolicyContent";

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