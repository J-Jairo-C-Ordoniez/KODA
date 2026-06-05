import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-primary min-h-screen selection:bg-accent/25 selection:text-white relative font-sans antialiased overflow-x-hidden">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
