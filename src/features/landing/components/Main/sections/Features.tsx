"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import FeatureCard, { FEATURES_DATA } from "@/features/landing/components/Main/ui/FeatureCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set(
        [
          ".features-title-phrase",
          ".features-desc-stage",
          ".card-title",
          ".card-desc",
          ".card-visual",
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: introStageRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    introTl
      .fromTo(
        ".features-title-phrase",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.22,
          ease: "power2.out",
        },
        0
      )
      .to({}, { duration: 0.16 }, 0.22)
      .to(
        ".features-title-stage",
        {
          opacity: 0,
          y: -45,
          scale: 0.97,
          duration: 0.12,
          ease: "power2.in",
        },
        0.38
      )
      .fromTo(
        ".features-desc-stage",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        0.50
      )
      .to({}, { duration: 0.18 }, 0.70)
      .to(
        ".features-desc-stage",
        {
          opacity: 0,
          y: -35,
          duration: 0.12,
          ease: "power2.in",
        },
        0.88
      );

    const cardFrames = gsap.utils.toArray<HTMLElement>(".feature-card-frame");

    cardFrames.forEach((frame) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      cardTl
        .fromTo(
          frame.querySelector(".card-title"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0
        )
        .fromTo(
          frame.querySelector(".card-desc"),
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0.2
        )
        .fromTo(
          frame.querySelector(".card-visual"),
          { opacity: 0, y: 35, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
          0.4
        )
        .to({}, { duration: 0.35 }, 0.65)
        .to(
          [
            frame.querySelector(".card-title"),
            frame.querySelector(".card-desc"),
            frame.querySelector(".card-visual")
          ],
          { opacity: 0, y: -45, scale: 0.96, duration: 0.22, ease: "power2.in" },
          1.0
        );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative bg-background"
      aria-labelledby="features-heading"
    >
      <header
        ref={introStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <div className="features-title-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none">
          <hgroup className="text-center space-y-2 sm:space-y-3 max-w-4xl">
            <h2
              id="features-heading"
              className="features-title-phrase font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground"
            >
              Todo a la mano.
            </h2>
            <p className="features-title-phrase block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground/50">
              Cero enredos.
            </p>
          </hgroup>
        </div>
        <div className="features-desc-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none opacity-0">
          <div className="max-w-3xl text-center space-y-4 sm:space-y-6">
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight text-foreground">
              Diseñamos un sistema que se siente natural.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-foreground/45 leading-[1.2] tracking-tight">
              Sin menús complicados ni manuales larguísimos. Abres tu caja y estás listo para vender.
            </p>
          </div>
        </div>
      </header>

      <div className="features-cards-wrapper relative w-full">
        {FEATURES_DATA.map((item, i) => (
          <FeatureCard
            key={item.id}
            item={item}
            index={i}
            total={FEATURES_DATA.length}
          />
        ))}
      </div>
    </section>
  );
}