import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
