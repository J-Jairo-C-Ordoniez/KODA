import Container from '../../ui/Container';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Inventario',
      description: 'Controla tus productos con categorías y recibe alertas cuando el stock esté bajo.',
      icon: <ShoppingCart size={24} className="text-blue-500" />
    },
    {
      title: 'Gestión de Fiados',
      description: 'Lleva el registro exacto de deudas, abonos y fechas de cobro. No pierdas ni un peso.',
      icon: <UserCheck size={24} className="text-purple-500" />
    },
    {
      title: 'Reportes en Vivo',
      description: 'Visualiza tus ganancias, ventas diarias y productos más vendidos en tiempo real.',
      icon: <BarChart3 size={24} className="text-pink-500" />
    },
    {
      title: 'Siempre en la Nube',
      description: 'Tus datos están seguros y accesibles desde cualquier lugar. Tu negocio no se detiene.',
      icon: <Cloud size={24} className="text-indigo-500" />
    }
  ];

  return (
    <section
      id="features"
      className="py-24 bg-background"
    >
      <Container>
        <article className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 shadow-sm animate-fade-in">
              <p className="text-xs uppercase font-semibold tracking-wider text-indigo-600">Características</p>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-primary leading-[1.1] tracking-wider">
              Potencia tu punto de venta
              <br />
              con <span className="text-indigo-600">Koda</span>.
            </h2>
          </div>

          <p className="text-lg lg:text-xl text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-wider pb-2">
            Hemos simplificado cada proceso para que te enfoques en lo que importa: vender más.
          </p>
        </article>

        <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-foreground hover:bg-background hover:shadow-xl hover:shadow-indigo-500/5 transition-all group border border-transparent hover:border-indigo-100"
            >
              <span className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {f.icon}
              </span>
              <h3 className="text-md uppercase font-semibold tracking-wider text-primary mb-4">{f.title}</h3>
              <p className="text-md lg:text-lg text-secondary font-medium leading-relaxed tracking-wider">
                {f.description}
              </p>
            </div>
          ))}
        </article>
      </Container>
    </section>
  );
};
