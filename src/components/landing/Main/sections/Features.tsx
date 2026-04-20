import Container from '../../../ui/Container';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Inventario Inteligente',
      description: 'Controla tus productos con categorías dinámicas y recibe alertas inteligentes de stock bajo.',
      icon: <ShoppingCart size={24} className="text-navy" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Gestión de Fiados',
      description: 'Registro exacto de deudas y abonos. Automatiza el cobro y no pierdas rastro de tus ingresos.',
      icon: <UserCheck size={24} className="text-navy" />,
      color: 'bg-indigo-50'
    },
    {
      title: 'Reportes en Vivo',
      description: 'Visualiza ganancias, ventas diarias y tendencias de productos en tiempo real.',
      icon: <BarChart3 size={24} className="text-navy" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Siempre en la Nube',
      description: 'Datos seguros y accesibles 24/7. Tu negocio siempre contigo, donde quiera que estés.',
      icon: <Cloud size={24} className="text-navy" />,
      color: 'bg-sky-50'
    }
  ];

  return (
    <section
      id="features"
      className="py-32 bg-background border-t border-foreground/5 shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)]"
    >
      <Container>
        <article className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 shadow-sm animate-fade-in">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy">Potencia tu Negocio</p>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight">
              Control Total en <br />
              <span className="text-navy/80">Segundos.</span>
            </h2>
          </div>

          <p className="text-lg lg:text-xl text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight pb-2 text-center lg:text-left">
            Diseñamos cada función para que sea más rápida que un cuaderno y más potente que cualquier hoja de cálculo.
          </p>
        </article>

        <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col p-8 rounded-[32px] bg-background border border-foreground/5 hover:border-navy/20 hover:shadow-[0_20px_50px_rgba(0,0,128,0.05)] transition-all duration-500 group"
            >
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <h3 className="text-sm uppercase font-black tracking-widest text-primary mb-4">{f.title}</h3>
              <p className="text-md text-secondary font-medium leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </article>
      </Container>
    </section>
  );
}
