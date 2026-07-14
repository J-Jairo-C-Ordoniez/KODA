import Header from '@/features/landing/components/Header/Header';
import Main from '@/features/landing/components/Main/Main';
import Footer from '@/features/landing/components/Footer/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent/25 selection:text-foreground relative font-sans overflow-x-hidden">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}