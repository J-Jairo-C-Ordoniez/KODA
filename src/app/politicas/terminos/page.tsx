import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";
import PolicyHero from "@/components/landing/Main/sections/PolicyHero";
import PolicyContent from "@/components/landing/Main/sections/PolicyContent";

export const metadata = {
  title: "Términos y Condiciones | KODA",
  description: "Términos y condiciones de uso de la plataforma KODA SaaS.",
};

export default function TerminosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <PolicyHero 
          title="Términos y Condiciones de Uso" 
          subtitle="Regulamos el uso de nuestra plataforma para garantizar un servicio seguro y confiable para tu negocio."
        />
        <PolicyContent title="Términos y Condiciones de Uso" />
      </main>
      <Footer />
    </div>
  );
}
