interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="grow flex flex-col relative overflow-hidden bg-organic min-h-screen">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

      <header className="px-6 md:px-0 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tight mb-5 drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center justify-start pb-24 w-full px-6 md:px-0 max-w-2xl md:max-w-xl mx-auto relative z-10">
        <div className="w-full glass-panel rounded-4xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/50">
          {children}
        </div>
      </section>
    </main>
  );
}