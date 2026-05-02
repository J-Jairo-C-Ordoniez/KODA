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
    <section className="py-10 bg-background">
      <Container>
        <article className="text-center space-y-6 py-10">
          <h2 className="uppercase w-full text-3xl lg:text-5xl 3xl:text-6xl font-black text-primary leading-tight tracking-tight">
            Diseñado para <br />
            <span className="text-navy">tu Crecimiento.</span>
          </h2>
          <p className="text-md lg:text-lg text-primary/80 max-w-xl mx-auto font-medium leading-snug tracking-wider">
            Compatible con negocios que buscan agilidad, control total e imagen profesional.
          </p>
        </article>

        <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
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

        <article className="mt-24 p-12 rounded-3xl bg-primary text-background flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <h3 className="uppercase w-full text-2xl lg:text-3xl 3xl:text-4xl font-black text-background leading-tight tracking-tight">¿Tienes un modelo de negocio diferente?</h3>
            <p className="text-md lg:text-lg text-background/80 max-w-xl mx-auto font-medium leading-snug tracking-wider">Platicamos sobre cómo Koda puede adaptarse a tus necesidades específicas.</p>
          </div>

          <Button
            href="https://wa.me/573001234567"
            variant="secondary"
            className="px-4 font-bold tracking-tight text-background"
          >
            Hablemos por WhatsApp
          </Button>
        </article>
      </Container>
    </section>
  );
}
