import HeroContent from '@/features/landing/components/Main/ui/HeroContent';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4rem)] overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <HeroContent />
    </section>
  );
}
