import Container from '../../ui/Container';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      title: 'Inventario Inteligente',
      description: 'Controla tallas, colores y categorías con facilidad. Recibe alertas cuando el stock esté bajo.',
      icon: <ShoppingCart size={32} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Gestión de Fiados',
      description: 'Lleva el registro exacto de deudas, abonos y fechas de cobro. No pierdas ni un peso.',
      icon: <UserCheck size={32} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Reportes en Vivo',
      description: 'Visualiza tus ganancias, ventas diarias y productos más vendidos en tiempo real.',
      icon: <BarChart3 size={32} />,
      color: 'bg-pink-500'
    },
    {
      title: 'Siempre en la Nube',
      description: 'Tus datos están seguros y accesibles desde cualquier lugar. Tu negocio no se detiene.',
      icon: <Cloud size={32} />,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wider">
              CARACTERÍSTICAS
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] leading-tight">
              Potencia tu punto de venta <br /> con <span className="text-indigo-600">tecnología</span>.
            </h2>
          </div>
          <p className="text-[#6b6b6b] text-lg lg:text-xl font-medium max-w-sm pb-2">
            Hemos simplificado cada proceso para que te enfoques en lo que importa: vender más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="p-8 rounded-[40px] bg-[#f5f5f5] hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group duration-500">
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{f.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
