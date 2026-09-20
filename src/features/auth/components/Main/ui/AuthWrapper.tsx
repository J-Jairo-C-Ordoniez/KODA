"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 2.2,
      defaults: { ease: "power4.out" }
    });

    tl.fromTo(".auth-title", 
        { autoAlpha: 0, y: 50, rotateX: -15 }, 
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.2 }
      )
      .fromTo(".auth-subtitle", 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, duration: 1 }, 
        "-=0.8"
      )
      .fromTo(".auth-form-container", 
        { autoAlpha: 0, y: 80, scale: 0.95 }, 
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, clearProps: "transform" }, 
        "-=0.8"
      );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen" ref={containerRef}>
      <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-10 md:py-20" style={{ perspective: "1000px" }}>
        <header className="flex flex-col justify-center items-center mx-auto max-w-6xl pb-8 md:pb-12">
          <h1 className="auth-title invisible text-center font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl" style={{ transformOrigin: "bottom center" }}>
            {title}
          </h1>
          <p className="auth-subtitle invisible text-center mt-4 sm:mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/75 sm:text-lg md:text-xl px-2">
            {subtitle}
          </p>
        </header>

        <section className="auth-form-container invisible flex flex-col items-center justify-start pb-16 md:pb-24 w-full max-w-md mx-auto relative z-10">
          <div className="w-full rounded-3xl md:rounded-4xl border border-primary/10 bg-background text-primary shadow-xl shadow-primary/2 p-6 sm:p-8 md:p-10">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}