import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { ShoppingBag, Zap, ShieldCheck } from 'lucide-react';

export default function Integrations() {
  const categories = [
    { name: 'Moda y Ropa', icon: <ShoppingBag size={24} className="text-indigo-600" /> },
    { name: 'Calzado', icon: <Zap size={24} className="text-purple-600" /> },
    { name: 'Accesorios', icon: <ShieldCheck size={24} className="text-pink-600" /> },
    { name: 'Boutiques', icon: <TrendingUp size={24} className="text-blue-600" /> },
  ];

  return (
    <section className="py-20 bg-background border-y border-gray-100">
      <Container>
        <article className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-primary">
            DISEÑADO PARA TU <span className="text-indigo-600">NEGOCIO</span>
          </h2>
          <p className="text-md lg:text-lg text-secondary font-medium leading-relaxed tracking-wider">
            Compatible con negocios pequeños y medianos que buscan agilidad y control total.
          </p>
        </article>

        <article className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-foreground hover:bg-background hover:shadow-xl hover:shadow-indigo-500/5 transition-all group border border-transparent hover:border-indigo-100"
            >
              <span className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {cat.icon}
              </span>
              <p className="text-md lg:text-lg text-primary font-medium leading-relaxed tracking-wider">{cat.name}</p>
            </div>
          ))}
        </article>

        <article className="mt-16 p-8 rounded-lg bg-linear-to-r from-primary to-primary/80 text-background flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold">¿Tienes un modelo de negocio diferente?</h3>
            <p className="text-md lg:text-lg text-foreground font-medium leading-relaxed tracking-wider">Platicamos sobre cómo Koda puede adaptarse a tus necesidades.</p>
          </div>
          <Button
            href="https://wa.me/5215512345678"
            variant="ambulance"
          >
            Contáctanos por WhatsApp
          </Button>
        </article>
      </Container>
    </section>
  );
};

import { TrendingUp } from 'lucide-react';
