import HeroContent from '@/features/landing/components/Main/ui/HeroContent';
import HeroVisualPanel from '@/features/landing/components/Main/ui/HeroVisualPanel';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden h-[96vh] bg-background lg:flex-row"
      aria-labelledby="hero-heading"
    >
      <div className="flex min-h-full w-full lg:w-[70%]">
        <HeroContent />
      </div>
      <div className="flex min-h-136 w-full lg:min-h-full lg:w-[30%]">
        <HeroVisualPanel />
      </div>
    </section>
  );
}