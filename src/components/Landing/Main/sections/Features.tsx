import Container from '../../../ui/Container';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Inventario Inteligente',
      description: 'Controla tus productos con categorías dinámicas y recibe alertas de stock bajo.',
      icon: <ShoppingCart size={24} className="text-navy" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Gestión de Fiados',
      description: 'Registro exacto de deudas y abonos. Automatiza el cobro sin perder rastro de ingresos.',
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
      className="pb-10 pt-24 bg-background"
    >
      <Container>
        <article className="flex flex-col lg:flex-row lg:items-end items-start justify-between gap-12 py-6">
          <h2 className="uppercase w-full lg:w-fit text-center lg:text-left text-3xl lg:text-5xl 3xl:text-6xl font-black text-primary leading-tight tracking-tight">
            Control Total en <br />
            <span className="text-navy/80">Segundos.</span>
          </h2>

          <p className="text-md lg:text-lg text-primary/80 max-w-xl mx-auto lg:mx-0 font-medium leading-snug tracking-wider">
            Diseñamos cada función para que sea más rápida que un cuaderno y más potente que cualquier hoja de cálculo.
          </p>
        </article>

        <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col p-8 rounded-3xl bg-background border border-foreground/5 hover:border-navy/20 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500 group"
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
