import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "./Container";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <div className="min-h-screen bg-background bg-grid flex flex-col relative overflow-hidden">
      {/* Radial Gradient for Grid Mask */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center justify-center grow py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-foreground/40 hover:text-navy transition-colors duration-300"
            >
              <ArrowLeft size={14} /> Volver al Inicio
            </Link>
            
            <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
              {title}
            </h1>
            <p className="text-secondary font-medium">
              {subtitle}
            </p>
          </div>

          <div className="bg-background/40 backdrop-blur-xl border border-foreground/5 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-navy/5">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
