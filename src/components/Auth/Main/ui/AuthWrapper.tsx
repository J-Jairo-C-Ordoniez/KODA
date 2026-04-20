import Container from "@/components/ui/Container";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="grow">
      <header className="relative pt-40 pb-4 overflow-hidden bg-background bg-grid">
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-6">
          <h1 className="text-3xl lg:text-4xl font-black text-primary leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-secondary max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </Container>
      </header>

      <Container className="flex flex-col items-center justify-center grow py-12 w-full max-w-2xl space-y-8">
        <div className="w-1/2 bg-background/60 backdrop-blur-xl border border-foreground/5 rounded-2xl p-8 md:p-10 shadow-2xl shadow-navy/5">
          {children}
        </div>
      </Container>
    </main>
  );
}