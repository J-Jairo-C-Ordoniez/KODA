import Image from 'next/image';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background"
    >
      <Container className='flex flex-col lg:flex-row items-center gap-16 lg:gap-24'>
        <article className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background shadow-sm animate-fade-in">
            <Star size={16} className="text-purple-600 fill-purple-600" />
            <p className="text-xs uppercase font-semibold tracking-wider text-primary">Software para Tiendas de Ropa</p>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.1] tracking-wider">
            Gestiona tu <br />
            <span className="text-transparent bg-clip-text bg-accent">Negocio de Moda</span> <br />
            sin Estrés.
          </h1>

          <p className="text-lg lg:text-xl text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-wider">
            La plataforma más rápida y sencilla para controlar tu inventario, ventas y fiados. Olvida los cuadernos y toma el control total.
          </p>

          <Button
            href="/register"
            variant="accent"
            className="w-fit mx-auto lg:mx-0 px-10 py-4 text-lg shadow-xl shadow-accent/20"
          >
            Empezar Ahora
            <ArrowRight size={20} />
          </Button>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8">
            {['Ventas rápidas', 'Control de fiados', 'Stock real'].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-xs uppercase font-medium tracking-wider text-primary"
              >
                <CheckCircle2 size={18} className="text-green-500" />
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="flex-1 relative">
          <div className="relative z-10">
            <Image
              src="/mascot.png"
              alt="mascota de Koda: robot sosteniendo una tablet con el logo de Koda"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-xl"
              priority
            />
          </div>

          <div className="absolute top-10 -left-10 bg-foreground p-4 rounded-lg shadow-lg border border-background flex items-center gap-4 z-20">
            <span className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center text-green-600">
              <TrendingUp size={20} />
            </span>
            <div>
              <p className="text-xs uppercase text-primary font-medium">Venta Registrada</p>
              <p className="text-sm uppercase font-bold text-primary/80">$120,000 COP</p>
            </div>
          </div>

          <div className="absolute bottom-20 -right-10 bg-foreground p-4 rounded-lg shadow-lg border border-background flex items-center gap-4 z-20">
            <span className="w-10 h-10 bg-purple-200 rounded-md flex items-center justify-center text-purple-600">
              <Users size={20} />
            </span>
            <div>
              <p className="text-xs uppercase text-primary font-medium">Nuevo Cliente</p>
              <p className="text-sm uppercase font-bold text-primary/80">Sofía Martínez</p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
};