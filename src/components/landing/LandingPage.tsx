import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-primary selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
