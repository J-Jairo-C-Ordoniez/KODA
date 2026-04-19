import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";
import PolicyHero from "@/components/landing/Main/sections/PolicyHero";
import PolicyContent from "@/components/landing/Main/sections/PolicyContent";

export const metadata = {
  title: "Política de Cookies | KODA",
  description: "Uso de cookies y tecnologías de seguimiento en KODA.",
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <PolicyHero 
          title="Política de Cookies" 
          subtitle="Mejoramos tu experiencia de navegación mediante el uso responsable de cookies técnicas y de rendimiento."
        />
        <PolicyContent title="Política de Cookies" />
      </main>
      <Footer />
    </div>
  );
}
