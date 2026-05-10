import Container from "@/components/ui/Container";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="grow">
      <header className="relative pt-24 pb-12 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-contrast/6 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-contrast" />
            <p className="text-xs uppercase font-bold tracking-widest text-foreground-muted">KODA — Acceso</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter mb-5">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </Container>
      </header>

      {/* Form card */}
      <Container className="flex flex-col items-center justify-center pb-24 w-full max-w-2xl">
        <div className="w-full bg-background-elevated border border-foreground/8 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/30">
          {children}
        </div>
      </Container>
    </main>
  );
}