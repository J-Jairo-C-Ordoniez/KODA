import Image from 'next/image';
import Container from '../../../ui/Container';
import Button from '../../../ui/Button';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative py-4 flex justify-center h-[calc(100vh-4rem)] overflow-hidden bg-background bg-grid"
    >
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

      <Container className='flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 z-10'>
        <article className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="uppercase text-3xl lg:text-5xl 3xl:text-6xl font-black text-primary leading-tight tracking-tight">
            Controla tu Negocio
            sin Estrés.
          </h1>

          <p className="text-md lg:text-lg text-primary/80 max-w-xl mx-auto lg:mx-0 font-medium leading-snug tracking-wider">
            Plataforma para gestionar inventario, ventas y fiados en segundos. Despídete del desorden y toma el control con <strong className='font-bold text-navy'>KODA</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              href="/register"
              variant="accent"
              className="px-10 py-5 text-xs font-medium uppercase shadow-xl shadow-navy/20 active:scale-95"
            >
              Empezar Ahora
            </Button>
            <Button
              href="#features"
              variant="ambulance"
              className="px-10 py-5 text-md font-medium uppercase"
            >
              Ver Funciones
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6">
            {['Ventas rápidas', 'Control de fiados', 'Stock real'].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-xs uppercase font-medium tracking-widest text-primary/80"
              >
                <CheckCircle2 size={18} className="text-green-500" />
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="flex-1 relative">
          <figure className="w-full p-20">
            <Image
              src="/mascot.png"
              alt="mascota de Koda"
              width={400}
              height={400}
              className="w-full h-auto drop-shadow-2xl opacity-90 mask-[linear-gradient(to_bottom,black_70%,transparent)]"
              priority
            />
          </figure>

          <div className="absolute top-30 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-black/5 border border-foreground/5 flex items-center gap-4 z-20">
            <span className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
              <TrendingUp size={24} />
            </span>
            <div>
              <p className="text-xs uppercase text-secondary font-bold tracking-widest">Venta Exitosa</p>
              <p className="text-sm font-black text-primary">$120,000 COP</p>
            </div>
          </div>

          <div className="absolute bottom-30 right-0 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-black/5 border border-foreground/5 flex items-center gap-4 z-20">
            <span className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center text-navy">
              <Users size={24} />
            </span>
            <div>
              <p className="text-xs uppercase text-secondary font-bold tracking-widest">Nuevo Cliente</p>
              <p className="text-sm font-black text-primary">Sofía Martínez</p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}