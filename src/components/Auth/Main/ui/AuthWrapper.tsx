interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="grow">
      <header className="px-6 md:px-0 py-12 overflow-hidden bg-background">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter mb-5">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center pb-24 w-full px-6 md:px-0 max-w-2xl md:max-w-xl mx-auto">
        <div className="w-full bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 rounded-4xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/30">
          {children}
        </div>
      </section>
    </main>
  );
}