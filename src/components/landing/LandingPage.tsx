import Header from './Header/Header';
import Main from './Main/Main';
import { Footer } from './Footer/Footer';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <Main />
      <Footer />
      
      <a 
        href="https://wa.me/573001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <div className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-xl rounded-br-none shadow-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¡Hablemos por WhatsApp!
        </div>
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="white"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.77 0 1.256.405 2.419 1.094 3.367L6.5 20l4.864-1.275c.873.374 1.838.583 2.858.583 3.181 0 5.767-2.586 5.767-5.77 0-3.181-2.586-5.766-5.767-5.766zm3.328 8.169c-.144.404-.733.729-1.012.77-.28.041-.62.062-1.761-.395-1.455-.584-2.39-2.052-2.463-2.148-.073-.096-.595-.791-.595-1.582 0-.791.404-1.182.56-1.35.156-.169.34-.21.454-.21.114 0 .227.001.326.005.103.004.242-.039.378.293.136.332.468 1.141.51 1.222.042.081.07.176.012.293-.058.117-.087.19-.174.293-.087.103-.183.23-.261.309-.087.087-.179.182-.077.356.103.174.457.753.985 1.222.68.605 1.252.793 1.426.88.174.087.276.073.378-.045.103-.118.439-.511.557-.686.117-.174.234-.146.395-.087.161.059 1.025.483 1.201.571.176.087.293.131.336.205.044.074.044.431-.1.835z"/>
        </svg>
      </a>
    </div>
  );
};
