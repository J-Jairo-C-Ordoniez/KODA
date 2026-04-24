import Container from '../../../ui/Container';
import Button from '../../../ui/Button';
import { ShoppingBag, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export default function Integrations() {
  const categories = [
    { name: 'Moda y Ropa', icon: <ShoppingBag size={24} className="text-navy" />, color: 'bg-blue-50' },
    { name: 'Calzado', icon: <Zap size={24} className="text-navy" />, color: 'bg-indigo-50' },
    { name: 'Accesorios', icon: <ShieldCheck size={24} className="text-navy" />, color: 'bg-purple-50' },
    { name: 'Boutiques', icon: <TrendingUp size={24} className="text-navy" />, color: 'bg-sky-50' },
  ];

  return (
    <section className="py-32 bg-background border-y border-foreground/5">
      <Container>
        <article className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
            Diseñado para <br />
            <span className="text-navy">tu Crecimiento.</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Compatible con negocios que buscan agilidad, control total e imagen profesional.
          </p>
        </article>

        <article className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-background border border-foreground/5 hover:border-navy/20 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500 group"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {cat.icon}
              </div>
              <p className="text-sm font-black tracking-widest text-primary uppercase">{cat.name}</p>
            </div>
          ))}
        </article>

        <article className="mt-24 p-12 rounded-3xl bg-primary text-background flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-navy/20 rounded-full blur-3xl -mr-48 -mt-48" />

          <div className="space-y-4 text-center lg:text-left relative z-10 max-w-xl">
            <h3 className="text-3xl font-black tracking-tight leading-tight">¿Tienes un modelo de negocio diferente?</h3>
            <p className="text-lg text-background/80 font-medium leading-relaxed">Platicamos sobre cómo Koda puede adaptarse a tus necesidades específicas.</p>
          </div>

          <Button
            href="https://wa.me/573001234567"
            variant="accent"
            className="relative z-10 px-12 py-5 text-lg shadow-2xl shadow-black/20"
          >
            Hablemos por WhatsApp
          </Button>
        </article>
      </Container>
    </section>
  );
}
