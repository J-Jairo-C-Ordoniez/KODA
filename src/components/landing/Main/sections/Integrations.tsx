import Container from '../../ui/Container';
import { ShoppingBag, Zap, ShieldCheck, HeartLink } from 'lucide-react';

export const Integrations = () => {
  const categories = [
    { name: 'Moda & Ropa', icon: <ShoppingBag size={24} className="text-indigo-600" /> },
    { name: 'Calzado', icon: <Zap size={24} className="text-purple-600" /> },
    { name: 'Accesorios', icon: <ShieldCheck size={24} className="text-pink-600" /> },
    { name: 'Boutiques', icon: <TrendingUp size={24} className="text-blue-600" /> },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <Container>
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-[#1a1a1a]">
            DISEÑADO PARA TU SEGMENTO
          </h2>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto font-medium">
            Compatible con negocios de cualquier tamaño que busquen agilidad y control total.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-[#f5f5f5] hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group border border-transparent hover:border-indigo-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {cat.icon}
              </div>
              <span className="font-bold text-[#1a1a1a]">{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-[40px] bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold">¿Tienes un modelo de negocio diferente?</h3>
            <p className="text-gray-400">Platicamos sobre cómo Koda puede adaptarse a tus necesidades.</p>
          </div>
          <button className="px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-bold hover:bg-gray-100 transition-colors">
            Contáctanos por WhatsApp
          </button>
        </div>
      </Container>
    </section>
  );
};

import { TrendingUp } from 'lucide-react';
