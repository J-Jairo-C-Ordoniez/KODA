interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out" >
      <div className="w-full min-h-screen px-20 py-16 md:py-24">
        <header className="flex flex-col justify-center items-center mx-auto max-w-6xl px-6 pb-10">
          <h1 className="text-center font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="text-center mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
            {subtitle}
          </p>
        </header>

        <section className="flex flex-col items-center justify-start pb-24 w-full px-6 md:px-0 max-w-md mx-auto relative z-10">
          <div className="w-full rounded-4xl border border-primary/10 bg-background text-primary shadow-xl shadow-primary/2 p-8 md:p-12">
            {children}
          </div>
        </section>
      </div>
    </main >
  );
}