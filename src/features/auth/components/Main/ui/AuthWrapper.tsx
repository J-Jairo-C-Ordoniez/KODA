interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-10 md:py-20">
        <header className="flex flex-col justify-center items-center mx-auto max-w-6xl pb-8 md:pb-12">
          <h1 className="text-center font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-center mt-4 sm:mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/75 sm:text-lg md:text-xl px-2">
            {subtitle}
          </p>
        </header>

        <section className="flex flex-col items-center justify-start pb-16 md:pb-24 w-full max-w-md mx-auto relative z-10">
          <div className="w-full rounded-3xl md:rounded-4xl border border-primary/10 bg-background text-primary shadow-xl shadow-primary/2 p-6 sm:p-8 md:p-10">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}