import PolicyHero from "@/components/policies/Main/sections/PolicyHero";
import PolicyContent from "@/components/policies/Main/sections/PolicyContent";

export default function Cookies() {
    return (
        <main className="grow">
            <PolicyHero
                title="Política de Cookies"
                subtitle="Mejoramos tu experiencia de navegación mediante el uso responsable de cookies técnicas y de rendimiento."
            />
            <PolicyContent title="Política de Cookies" />
        </main>
    );
}