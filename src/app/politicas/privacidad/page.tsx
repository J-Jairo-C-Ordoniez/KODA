import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";
import PolicyHero from "@/components/landing/Main/sections/PolicyHero";
import PolicyContent from "@/components/landing/Main/sections/PolicyContent";

export const metadata = {
  title: "Política de Privacidad | KODA",
  description: "Tratamiento de datos personales y seguridad en KODA.",
};

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <PolicyHero 
          title="Política de Privacidad" 
          subtitle="Tu privacidad es nuestra prioridad. Conoce cómo protegemos y manejamos los datos de tu negocio."
        />
        <PolicyContent title="Política de Privacidad" />
      </main>
      <Footer />
    </div>
  );
}
